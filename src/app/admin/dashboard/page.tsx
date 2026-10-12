
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import LogoutButton from "@/components/admin/logout-button";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

async function AdminDashboardContent() {
  await connection();

  const session = await requireAdmin();

  if (!session) {
    redirect("/admin");
  }

  const [
    totalApplications,
    pendingApplications,
    verifiedApplications,
    rejectedApplications,
    pendingPayments,
    pendingSponsors,
    pendingSpeakers,
  ] = await Promise.all([
    prisma.registration.count(),
    prisma.registration.count({ where: { status: "PENDING" } }),
    prisma.registration.count({ where: { status: "VERIFIED" } }),
    prisma.registration.count({ where: { status: "REJECTED" } }),
    prisma.paymentProof.count({ where: { status: "PENDING" } }),
    prisma.sponsorApplication.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.speakerApplication.count({ where: { status: "PENDING_REVIEW" } }),
  ]);

  const stats = [
    { label: "Total applications", value: totalApplications },
    { label: "Pending applications", value: pendingApplications },
    { label: "Verified applications", value: verifiedApplications },
    { label: "Rejected applications", value: rejectedApplications },
    { label: "Payment proofs pending", value: pendingPayments },
    { label: "Sponsor inquiries pending", value: pendingSponsors },
    { label: "Speaker applications pending", value: pendingSpeakers },
  ];

  return (
    <main className="page-content">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 35,
          }}
        >
          <div>
            <p className="section-eyebrow">Organizer workspace</p>
            <h1 style={{ color: "var(--navy)", fontSize: "2.3rem" }}>
              Admin Dashboard
            </h1>
            <p className="page-intro-description" style={{ textAlign: "left", marginInline: 0 }}>
              Signed in as {session.email}
            </p>
          </div>

          <LogoutButton />
        </div>

        <div className="page-grid">
          {stats.map((stat) => (
            <article className="glass-card page-card" key={stat.label}>
              <p>{stat.label}</p>
              <h2 style={{ fontSize: "2rem", marginTop: 12 }}>
                {stat.value}
              </h2>
            </article>
          ))}
        </div>

        <section style={{ marginTop: 45 }}>
          <h2 style={{ color: "var(--navy)", marginBottom: 18 }}>
            Management
          </h2>

          <div className="page-grid">
            <Link href="/admin/applications" className="glass-card page-card">
              <h3>Applications</h3>
              <p>Review registrations and payment proofs.</p>
            </Link>

            <Link href="/admin/sponsors" className="glass-card page-card">
              <h3>Sponsors</h3>
              <p>Review organization partnership inquiries.</p>
            </Link>

            <Link href="/admin/speakers" className="glass-card page-card">
              <h3>Speakers</h3>
              <p>Review speaker submissions and publication.</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<main className="page-content" />}>
      <AdminDashboardContent />
    </Suspense>
  );
}
