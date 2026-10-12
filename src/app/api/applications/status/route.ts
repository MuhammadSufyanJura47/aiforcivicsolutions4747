import { NextResponse } from "next/server";
import { connection } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const statusQuery = z.object({
  rollNumber: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(254),
});

export async function GET(request: Request) {
  await connection();

  try {
    const url = new URL(request.url);
    const parsed = statusQuery.safeParse({
      rollNumber: url.searchParams.get("rollNumber"),
      email: url.searchParams.get("email"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Enter a valid roll number and leader email." },
        { status: 400 },
      );
    }

    const registration = await prisma.registration.findFirst({
      where: {
        rollNumber: parsed.data.rollNumber.toUpperCase(),
        leaderEmail: parsed.data.email.toLowerCase(),
      },
      select: {
        rollNumber: true,
        leaderName: true,
        teamSize: true,
        trackName: true,
        status: true,
        rejectionReason: true,
        createdAt: true,
        paymentProof: { select: { status: true } },
      },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "No application matched that roll number and email." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      application: {
        ...registration,
        paymentStatus: registration.paymentProof?.status ?? "PENDING",
      },
    }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Application status lookup failed:", error);
    return NextResponse.json(
      { error: "We could not check the application status. Please try again." },
      { status: 500 },
    );
  }
}
