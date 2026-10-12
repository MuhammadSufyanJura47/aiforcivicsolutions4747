import "server-only";
import { Prisma } from "@/generated/prisma/client";

export function buildApplicationWhere(params: URLSearchParams) {
  const search = params.get("search")?.trim();
  const status = params.get("status");
  const paymentStatus = params.get("paymentStatus");
  const track = params.get("track")?.trim();
  const city = params.get("city")?.trim();
  const teamSizeValue = Number(params.get("teamSize"));

  const where: Prisma.RegistrationWhereInput = {};

  if (search) {
    where.OR = [
      { rollNumber: { contains: search } },
      { leaderName: { contains: search } },
      { leaderEmail: { contains: search } },
      { leaderPhone: { contains: search } },
      { institution: { contains: search } },
      { city: { contains: search } },
      { trackName: { contains: search } },
    ];
  }

  if (["PENDING", "VERIFIED", "REJECTED"].includes(status ?? "")) {
    where.status = status as "PENDING" | "VERIFIED" | "REJECTED";
  }

  if (["PENDING", "VERIFIED", "REJECTED"].includes(paymentStatus ?? "")) {
    where.paymentProof = {
      is: {
        status: paymentStatus as "PENDING" | "VERIFIED" | "REJECTED",
      },
    };
  }

  if (track) where.trackName = track;
  if (city) where.city = { contains: city };

  if (Number.isInteger(teamSizeValue) && teamSizeValue >= 1 && teamSizeValue <= 5) {
    where.teamSize = teamSizeValue;
  }

  return where;
}