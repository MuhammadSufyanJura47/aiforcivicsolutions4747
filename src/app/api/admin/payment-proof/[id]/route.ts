import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const proof = await prisma.paymentProof.findUnique({
    where: { id },
    select: { mimeType: true, fileData: true },
  });

  if (!proof) {
    return NextResponse.json({ error: "Payment proof not found." }, { status: 404 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(proof.mimeType)) {
    return NextResponse.json({ error: "Invalid image type." }, { status: 400 });
  }

  return new NextResponse(new Uint8Array(proof.fileData), {
    headers: {
      "Content-Type": proof.mimeType,
      "Content-Disposition": "inline",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store, max-age=0",
    },
  });
}