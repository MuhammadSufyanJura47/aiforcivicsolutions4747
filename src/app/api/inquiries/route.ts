import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const inquirySchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("sponsor"),
    fullName: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().min(7).max(30),
    designation: z.string().trim().min(2).max(120),
    organization: z.string().trim().min(2).max(180),
    website: z.union([z.string().trim().url().max(500), z.literal("")]).optional(),
    tier: z.string().trim().min(1).max(80),
    contribution: z.string().trim().min(1).max(120),
    message: z.string().trim().max(3000).optional().default(""),
  }),
  z.object({
    kind: z.literal("speaker"),
    fullName: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().min(7).max(30),
    whatsapp: z.string().trim().min(7).max(30),
    organization: z.string().trim().min(2).max(180),
    jobTitle: z.string().trim().min(2).max(120),
    linkedin: z.union([z.string().trim().url().max(500), z.literal("")]).optional(),
    expertise: z.string().trim().min(1).max(120),
    experience: z.coerce.number().int().min(0).max(80),
    sessionTitle: z.string().trim().min(5).max(180),
    sessionDescription: z.string().trim().min(20).max(4000),
  }),
  z.object({
    kind: z.literal("contact"),
    fullName: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    subject: z.string().trim().min(2).max(120),
    message: z.string().trim().min(10).max(3000),
  }),
]);

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please complete all required fields correctly.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.kind === "sponsor") {
      await prisma.sponsorApplication.create({
        data: {
          fullName: data.fullName,
          email: data.email.toLowerCase(),
          phone: data.phone,
          designation: data.designation,
          organization: data.organization,
          website: data.website || null,
          preferredTier: data.tier,
          contributionTypes: [data.contribution],
          message: data.message || null,
        },
      });
    } else if (data.kind === "speaker") {
      await prisma.speakerApplication.create({
        data: {
          fullName: data.fullName,
          email: data.email.toLowerCase(),
          phone: data.phone,
          whatsapp: data.whatsapp,
          organization: data.organization,
          jobTitle: data.jobTitle,
          linkedin: data.linkedin || null,
          expertise: data.expertise,
          yearsExperience: data.experience,
          sessionTitle: data.sessionTitle,
          sessionDescription: data.sessionDescription,
        },
      });
    } else {
      await prisma.contactInquiry.create({
        data: {
          fullName: data.fullName,
          email: data.email.toLowerCase(),
          subject: data.subject,
          message: data.message,
        },
      });
    }

    return NextResponse.json(
      { message: "Your submission was received successfully." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Inquiry submission failed:", error);
    return NextResponse.json(
      { error: "We could not save your submission. Please try again." },
      { status: 500 },
    );
  }
}
