
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

const querySchema = z.object({
  type: z.enum(["sponsor", "speaker"]),
});

export async function GET(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = querySchema.safeParse({
    type: request.nextUrl.searchParams.get("type"),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid application type." }, { status: 400 });
  }

  const { type } = parsed.data;

  if (type === "sponsor") {
    const applications = await prisma.sponsorApplication.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ applications }, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  const applications = await prisma.speakerApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ applications }, {
    headers: { "Cache-Control": "no-store" },
  });
}

const actionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("sponsor"),
    id: z.string().min(1),
    action: z.enum(["approve", "reject", "publish", "unpublish"]),
  }),
  z.object({
    type: z.literal("speaker"),
    id: z.string().min(1),
    action: z.enum(["approve", "reject", "publish", "unpublish"]),
  }),
]);

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = actionSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid review action." }, { status: 400 });
  }

  const { type, id, action } = parsed.data;

  try {
    let status: "APPROVED" | "REJECTED" | "PENDING_REVIEW";
    let isPublished: boolean;

    if (type === "sponsor") {
      const existing = await prisma.sponsorApplication.findUnique({ where: { id } });

      if (!existing) {
        return NextResponse.json({ error: "Sponsor application not found." }, { status: 404 });
      }

      status = existing.status;
      isPublished = existing.isPublished;

      if (action === "approve") {
        status = "APPROVED";
      } else if (action === "reject") {
        status = "REJECTED";
        isPublished = false;
      } else {
        if (existing.status !== "APPROVED") {
          return NextResponse.json({
            error: "Approve this application before publishing it.",
          }, { status: 409 });
        }

        isPublished = action === "publish";
      }

      await prisma.sponsorApplication.update({
        where: { id },
        data: { status, isPublished },
      });
    } else {
      const existing = await prisma.speakerApplication.findUnique({ where: { id } });

      if (!existing) {
        return NextResponse.json({ error: "Speaker application not found." }, { status: 404 });
      }

      status = existing.status;
      isPublished = existing.isPublished;

      if (action === "approve") {
        status = "APPROVED";
      } else if (action === "reject") {
        status = "REJECTED";
        isPublished = false;
      } else {
        if (existing.status !== "APPROVED") {
          return NextResponse.json({
            error: "Approve this application before publishing it.",
          }, { status: 409 });
        }

        isPublished = action === "publish";
      }

      await prisma.speakerApplication.update({
        where: { id },
        data: { status, isPublished },
      });
    }

    // Record the action against the configured admin account.
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    if (!passwordHash) throw new Error("Admin password hash is not configured.");

    const adminRecord = await prisma.admin.upsert({
      where: { email: admin.email },
      update: {},
      create: {
        email: admin.email,
        passwordHash,
        name: "Hackathon Admin",
      },
    });

    await prisma.adminAuditLog.create({
      data: {
        adminId: adminRecord.id,
        action: `${type}-${action}`,
        entity: type === "sponsor" ? "SponsorApplication" : "SpeakerApplication",
        entityId: id,
        details: { status, isPublished },
      },
    });

    return NextResponse.json({ success: true, status, isPublished });
  } catch (error) {
    console.error("Partner application review failed:", error);
    return NextResponse.json({
      error: "Could not update the application.",
    }, { status: 500 });
  }
}
