"use client";

import { useState, type FormEvent } from "react";
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";

type StatusResult = {
  error?: string;
  application?: {
    rollNumber: string;
    leaderName: string;
    teamSize: number;
    trackName: string;
    status: string;
    paymentStatus: string;
    rejectionReason: string | null;
    createdAt: string;
  };
};

export default function CheckStatusPage() {
  const [result, setResult] = useState<StatusResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setLoading(true);
    setResult(null);
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams({
      rollNumber: String(data.get("rollNumber") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
    });

    try {
      const response = await fetch(`/api/applications/status?${params}`);
      const body = (await response.json()) as StatusResult;
      setResult(body);
    } catch {
      setResult({ error: "Unable to connect to the server. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicPage>
      <PageIntro
        eyebrow="Application status"
        title="Check Your Registration"
        description="Use the roll number from your confirmation and the team leader email to view the latest review status."
      />
      <section className="page-content">
        <div className="container" style={{ maxWidth: 720 }}>
          <form className="page-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="rollNumber">Roll number *</label>
              <input id="rollNumber" name="rollNumber" placeholder="CLS-HT-2026-01" required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Team leader email *</label>
              <input id="email" name="email" type="email" required />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Checking..." : "Check Status"}
            </button>
            {result?.error && <p className="form-message" role="alert">{result.error}</p>}
          </form>

          {result?.application && (
            <div className="page-callout" style={{ marginTop: 28 }}>
              <h2>{result.application.rollNumber}</h2>
              <p>
                Applicant: {result.application.leaderName}<br />
                Team size: {result.application.teamSize}<br />
                Track: {result.application.trackName}<br />
                Application status: {result.application.status}<br />
                Payment status: {result.application.paymentStatus}
              </p>
              {result.application.rejectionReason && (
                <p style={{ marginTop: 12 }}>
                  Review note: {result.application.rejectionReason}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </PublicPage>
  );
}
