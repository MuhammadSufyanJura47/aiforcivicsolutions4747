import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import ApplicationsManager from "@/components/admin/applications-manager";

export const metadata: Metadata = {
  title: "Applications | Admin",
  robots: { index: false, follow: false },
};

async function ApplicationsPageContent() {
  await connection();

  const admin = await requireAdmin();

  if (!admin) redirect("/admin");

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <p className="section-eyebrow">ADMINISTRATION</p>
      <h1 className="page-title">Applications</h1>
      <p className="page-description">
        Search registrations, review payment proofs, and manage applicant decisions.
      </p>
      <ApplicationsManager />
    </main>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<main className="container" style={{ paddingTop: 40, paddingBottom: 64 }} />}>
      <ApplicationsPageContent />
    </Suspense>
  );
}