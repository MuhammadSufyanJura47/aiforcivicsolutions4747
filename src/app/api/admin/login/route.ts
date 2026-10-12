
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createAdminSession } from "@/lib/admin-auth";

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const expectedOrigin = new URL(request.url).origin;

    if (origin && origin !== expectedOrigin) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 },
      );
    }

    const body: unknown = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Enter a valid email and password." },
        { status: 400 },
      );
    }

    const configuredEmail = process.env.ADMIN_EMAIL;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!configuredEmail || !passwordHash) {
      console.error("Admin login environment variables are missing.");

      return NextResponse.json(
        { error: "Admin login is not configured." },
        { status: 500 },
      );
    }

    const emailMatches =
      parsed.data.email.toLowerCase() === configuredEmail.toLowerCase();

    const passwordMatches = await bcrypt.compare(
      parsed.data.password,
      passwordHash,
    );

    if (!emailMatches || !passwordMatches) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    await createAdminSession(configuredEmail);

    return NextResponse.json({ message: "Signed in successfully." });
  } catch (error) {
    console.error("Admin login failed:", error);

    return NextResponse.json(
      { error: "Unable to sign in right now." },
      { status: 500 },
    );
  }
}
