
import { NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { allTrackNames } from "@/lib/site";

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

async function prepareImage(file: File) {
  if (file.size < 1 || file.size > 5 * 1024 * 1024) {
    throw new Error("FILE_SIZE_INVALID");
  }

  if (!allowedImageTypes.has(file.type)) {
    throw new Error("FILE_TYPE_INVALID");
  }

  const extension = file.type === "image/jpeg"
    ? "jpg"
    : file.type === "image/png"
      ? "png"
      : "webp";
  const storageKey = `${randomUUID()}.${extension}`;

  return {
    storageKey,
    originalName: file.name,
    mimeType: file.type,
    fileSize: file.size,
    fileData: Buffer.from(await file.arrayBuffer()),
  };
}

const memberSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.union([
    z.string().trim().email().max(254),
    z.literal(""),
  ]).optional().transform((value) => value || null),
  phone: z.string().trim().max(30).optional().default(""),
});

const applicationSchema = z.object({
  leaderName: z.string().trim().min(2).max(100),
  leaderEmail: z.string().trim().email().max(254),
  leaderPhone: z.string().trim().min(7).max(30),
  city: z.string().trim().min(2).max(100),
  institution: z.string().trim().min(2).max(180),
  ambassadorId: z.string().trim().min(1).max(64),
  teamSize: z.coerce.number().int().min(1).max(5),
  trackName: z.string().trim().min(1),
  projectIdea: z.string().trim().min(20).max(3000),
  members: z.array(memberSchema).max(4),
  paymentConfirmation: z.literal(true),
}).superRefine((data, context) => {
  if (data.members.length !== data.teamSize - 1) {
    context.addIssue({
      code: "custom",
      path: ["members"],
      message: "Provide details for every team member except the leader.",
    });
  }

  if (!allTrackNames.some((trackName) => trackName === data.trackName)) {
    context.addIssue({
      code: "custom",
      path: ["trackName"],
      message: "Select a valid challenge track.",
    });
  }
});

const fees: Record<number, number> = {
  1: 300,
  2: 500,
  3: 700,
  4: 900,
  5: 1000,
};

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const rawApplication = form.get("application");
    const file = form.get("paymentProof");

    if (typeof rawApplication !== "string") {
      return NextResponse.json(
        { error: "Application details are missing." },
        { status: 400 },
      );
    }

    let body: unknown;

    try {
      body = JSON.parse(rawApplication);
    } catch {
      return NextResponse.json(
        { error: "Application details are invalid." },
        { status: 400 },
      );
    }

    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please correct your application details.",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Payment proof is required to submit your application." },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Payment proof must be no larger than 5 MB." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const participationType =
      data.teamSize === 1 ? "Solo" : `Team of ${data.teamSize}`;

    // Keep the proof in the database so it survives stateless deployments.
    const saved = await prepareImage(file);

    const application = await prisma.$transaction(async (tx) => {
      const counter = await tx.rollNumberCounter.upsert({
        where: { id: "CLS-HT-2026" },
        create: {
          id: "CLS-HT-2026",
          lastNumber: 1,
        },
        update: {
          lastNumber: { increment: 1 },
        },
      });

      const rollNumber =
        `CLS-HT-2026-${String(counter.lastNumber).padStart(2, "0")}`;

      return tx.registration.create({
        data: {
          rollNumber,
          leaderName: data.leaderName,
          leaderEmail: data.leaderEmail.toLowerCase(),
          leaderPhone: data.leaderPhone,
          city: data.city,
          institution: data.institution,
          ambassadorId: data.ambassadorId,
          participationType,
          teamSize: data.teamSize,
          trackName: data.trackName,
          projectIdea: data.projectIdea,
          members: {
            create: data.members.map((member) => ({
              fullName: member.fullName,
              email: member.email?.toLowerCase() || null,
              phone: member.phone || null,
            })),
          },
          paymentProof: {
            create: {
              storageKey: saved.storageKey,
              originalName: saved.originalName,
              mimeType: saved.mimeType,
              fileSize: saved.fileSize,
              fileData: saved.fileData,
              status: "PENDING",
            },
          },
        },
        select: {
          rollNumber: true,
          leaderName: true,
          teamSize: true,
          trackName: true,
          status: true,
          paymentProof: {
            select: { status: true },
          },
        },
      });
    });

    return NextResponse.json(
      {
        message: "Application and payment proof submitted successfully.",
        application,
        feePKR: fees[data.teamSize],
        nextStep: "Save your roll number. Your application and payment proof are pending review.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Application submission failed:", error);

    if (error instanceof Error && error.message === "FILE_SIZE_INVALID") {
      return NextResponse.json(
        { error: "Payment proof must be between 1 byte and 5 MB." },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message === "FILE_TYPE_INVALID") {
      return NextResponse.json(
        { error: "Upload a valid JPG, PNG, or WebP image." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "We could not submit your application. Please try again." },
      { status: 500 },
    );
  }
}
