import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { buildApplicationWhere } from "@/lib/admin-applications";

async function writeAudit(
  email: string,
  action: string,
  entityId: string,
  details?: any
) {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!passwordHash) throw new Error("Admin password hash is not configured.");

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      name: "Hackathon Admin",
    },
  });

  await prisma.adminAuditLog.create({
    data: {
      adminId: admin.id,
      action,
      entity: "Registration",
      entityId,
      details: details ?? {},
    },
  });
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const page = Math.max(1, Number(params.get("page")) || 1);
  const pageSize = 20;
  const where = buildApplicationWhere(params);

  const [applications, total] = await prisma.$transaction([
    prisma.registration.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        members: true,
        paymentProof: {
          select: {
            id: true,
            originalName: true,
            fileSize: true,
            mimeType: true,
            status: true,
            createdAt: true,
          },
        },
      },
    }),
    prisma.registration.count({ where }),
  ]);

  return NextResponse.json({
    applications,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}

const actionSchema = z.discriminatedUnion("action", [
  z.object({
    id: z.string().min(1),
    action: z.literal("verify-payment"),
  }),
  z.object({
    id: z.string().min(1),
    action: z.literal("reject-payment"),
  }),
  z.object({
    id: z.string().min(1),
    action: z.literal("verify-application"),
  }),
  z.object({
    id: z.string().min(1),
    action: z.literal("reject-application"),
    reason: z.string().trim().min(5).max(1000),
  }),
]);

export async function PATCH(request: NextRequest) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = actionSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid review request." }, { status: 400 });
  }

  const input = parsed.data;

  try {
    const registration = await prisma.registration.findUnique({
      where: { id: input.id },
      include: { paymentProof: true },
    });

    if (!registration) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    if (input.action === "verify-payment" || input.action === "reject-payment") {
      if (!registration.paymentProof) {
        return NextResponse.json({ error: "Payment proof not found." }, { status: 404 });
      }

      const status = input.action === "verify-payment" ? "VERIFIED" : "REJECTED";

      await prisma.paymentProof.update({
        where: { registrationId: registration.id },
        data: { status, reviewedAt: new Date() },
      });

      await writeAudit(session.email, input.action, registration.id, { status });
    }

    if (input.action === "verify-application") {
      if (registration.status === "REJECTED") {
        return NextResponse.json({
          error: "A rejected application cannot be verified. Review it manually first.",
        }, { status: 409 });
      }

      if (registration.paymentProof?.status !== "VERIFIED") {
        return NextResponse.json({
          error: "Verify the payment proof before verifying this application.",
        }, { status: 409 });
      }

      await prisma.registration.update({
        where: { id: registration.id },
        data: { status: "VERIFIED", rejectionReason: null },
      });

      await writeAudit(session.email, input.action, registration.id);
    }

    if (input.action === "reject-application") {
      await prisma.registration.update({
        where: { id: registration.id },
        data: {
          status: "REJECTED",
          rejectionReason: input.reason,
        },
      });

      await writeAudit(session.email, input.action, registration.id, {
        reason: input.reason,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application review failed:", error);
    return NextResponse.json({ error: "Could not update the application." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const id = z.string().min(1).safeParse(body?.id);

  if (!id.success) {
    return NextResponse.json({ error: "Invalid application ID." }, { status: 400 });
  }

  try {
    const registration = await prisma.registration.findUnique({
      where: { id: id.data },
      include: { paymentProof: true },
    });

    if (!registration) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    await prisma.registration.delete({ where: { id: registration.id } });
    await writeAudit(session.email, "delete-application", registration.id, {
      rollNumber: registration.rollNumber,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application deletion failed:", error);
    return NextResponse.json({ error: "Could not delete the application." }, { status: 500 });
  }
}