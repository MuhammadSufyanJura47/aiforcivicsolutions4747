
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import PartnerReviewManager from "@/components/admin/partner-review-manager";

export const metadata: Metadata = {
  title: "Speaker Applications | Admin",
  robots: { index: false, follow: false },
};

async function AdminSpeakersPageContent() {
  await connection();

  if (!(await requireAdmin())) redirect("/admin");

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <p className="section-eyebrow">ADMINISTRATION</p>
      <h1 className="page-title">Speaker Applications</h1>
      <p className="page-description">
        Review speaker proposals and publish profiles only after approval.
      </p>
      <PartnerReviewManager type="speaker" />
    </main>
  );
}

export default function AdminSpeakersPage() {
  return (
    <Suspense fallback={<main className="container" style={{ paddingTop: 40, paddingBottom: 64 }} />}>
      <AdminSpeakersPageContent />
    </Suspense>
  );
}
