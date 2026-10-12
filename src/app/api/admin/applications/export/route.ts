import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { buildApplicationWhere } from "@/lib/admin-applications";

function csvCell(value: unknown) {
  let text = String(value ?? "").replace(/[\r\n]+/g, " ");
  // Prevent values from being interpreted as spreadsheet formulas.
  if (/^[\s]*[=+\-@\t]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const applications = await prisma.registration.findMany({
      where: buildApplicationWhere(request.nextUrl.searchParams),
      orderBy: { createdAt: "desc" },
      include: {
        members: true,
        paymentProof: { select: { status: true } },
      },
      take: 10000,
    });

    const headers = [
      "Roll Number",
      "Leader Name",
      "Leader Email",
      "Leader Phone",
      "City",
      "Institution",
      "Participation Type",
      "Team Size",
      "Track",
      "Project Idea",
      "Application Status",
      "Payment Status",
      "Team Members",
      "Submitted At",
    ];

    const rows = applications.map((app) => [
      app.rollNumber,
      app.leaderName,
      app.leaderEmail,
      app.leaderPhone,
      app.city,
      app.institution,
      app.participationType,
      app.teamSize,
      app.trackName,
      app.projectIdea,
      app.status,
      app.paymentProof?.status ?? "MISSING",
      app.members.map((member) => member.fullName).join("; "),
      app.createdAt.toISOString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(csvCell).join(","))
      .join("\r\n");

    return new NextResponse(`\uFEFF${csv}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="civic-solutions-applications.csv"',
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("CSV export failed:", error);
    return NextResponse.json({ error: "Could not export applications." }, { status: 500 });
  }
}