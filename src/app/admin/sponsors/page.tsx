
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import PartnerReviewManager from "@/components/admin/partner-review-manager";

export const metadata: Metadata = {
  title: "Sponsor Applications | Admin",
  robots: { index: false, follow: false },
};

async function AdminSponsorsPageContent() {
  await connection();

  if (!(await requireAdmin())) redirect("/admin");

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <p className="section-eyebrow">ADMINISTRATION</p>
      <h1 className="page-title">Sponsor Applications</h1>
      <p className="page-description">
        Review sponsorship offers and control which approved sponsors are published.
      </p>
      <PartnerReviewManager type="sponsor" />
    </main>
  );
}

export default function AdminSponsorsPage() {
  return (
    <Suspense fallback={<main className="container" style={{ paddingTop: 40, paddingBottom: 64 }} />}>
      <AdminSponsorsPageContent />
    </Suspense>
  );
}
