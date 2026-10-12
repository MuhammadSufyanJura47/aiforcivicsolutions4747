
"use client";

import { useCallback, useEffect, useState } from "react";

type PartnerType = "sponsor" | "speaker";

type PartnerApplication = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  status: "PENDING_REVIEW" | "APPROVED" | "REJECTED";
  isPublished: boolean;
  createdAt: string;
  designation?: string;
  website?: string | null;
  preferredTier?: string;
  contributionTypes?: unknown;
  estimatedValue?: string | number | null;
  message?: string | null;
  whatsapp?: string;
  linkedin?: string | null;
  jobTitle?: string;
  expertise?: string;
  yearsExperience?: number;
  sessionTitle?: string;
  sessionDescription?: string;
};

export default function PartnerReviewManager({
  type,
}: {
  type: PartnerType;
}) {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/partner-applications?type=${type}`,
        { cache: "no-store" }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not load applications.");
      }

      setApplications(data.applications);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  async function performAction(
    application: PartnerApplication,
    action: "approve" | "reject" | "publish" | "unpublish"
  ) {
    const labels = {
      approve: "approve",
      reject: "reject",
      publish: "publish publicly",
      unpublish: "remove from the public website",
    };

    if (!window.confirm(
      `Are you sure you want to ${labels[action]} this ${type} application from ${application.organization}?`
    )) {
      return;
    }

    setWorkingId(application.id);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/partner-applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          id: application.id,
          action,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not update application.");
      }

      setNotice(`Application ${action} action completed.`);
      await loadApplications();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setWorkingId("");
    }
  }

  const visibleApplications = applications.filter((application) => {
    if (filter === "ALL") return true;
    if (filter === "PUBLISHED") return application.isPublished;
    if (filter === "UNPUBLISHED") return !application.isPublished;
    return application.status === filter;
  });

  return (
    <section className="partner-admin">
      <div className="partner-admin-toolbar">
        <label>
          <span>Filter applications</span>
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="ALL">All applications</option>
            <option value="PENDING_REVIEW">Pending review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="PUBLISHED">Published</option>
            <option value="UNPUBLISHED">Not published</option>
          </select>
        </label>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => void loadApplications()}
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      <p className="partner-admin-count">
        {loading ? "Loading..." : `${visibleApplications.length} application(s)`}
      </p>

      {error && <p role="alert" className="admin-message admin-error">{error}</p>}
      {notice && <p role="status" className="admin-message">{notice}</p>}

      {loading ? (
        <div className="glass-card" style={{ padding: 24 }}>Loading applications...</div>
      ) : visibleApplications.length === 0 ? (
        <div className="glass-card" style={{ padding: 24 }}>
          No applications found for this filter.
        </div>
      ) : (
        <div className="partner-admin-grid">
          {visibleApplications.map((application) => (
            <article className="glass-card partner-admin-card" key={application.id}>
              <div className="partner-admin-card-heading">
                <div>
                  <p className="section-eyebrow">
                    {type === "sponsor" ? "SPONSOR APPLICATION" : "SPEAKER APPLICATION"}
                  </p>
                  <h2>{application.fullName}</h2>
                  <p>{application.organization}</p>
                </div>
                <span className={`partner-status partner-status-${application.status.toLowerCase()}`}>
                  {application.status.replace("_", " ")}
                </span>
              </div>

              <div className="partner-admin-details">
                <p><strong>Email:</strong> {application.email}</p>
                <p><strong>Phone:</strong> {application.phone}</p>

                {type === "sponsor" ? (
                  <>
                    <p><strong>Designation:</strong> {application.designation || "Not provided"}</p>
                    <p><strong>Preferred tier:</strong> {application.preferredTier || "Not specified"}</p>
                    <p>
                      <strong>Contributions:</strong>{" "}
                      {Array.isArray(application.contributionTypes)
                        ? application.contributionTypes.map(String).join(", ")
                        : "Not specified"}
                    </p>
                    {application.estimatedValue != null && (
                      <p><strong>Estimated value:</strong> {String(application.estimatedValue)}</p>
                    )}
                    {application.website && (
                      <p>
                        <strong>Website:</strong>{" "}
                        <a href={application.website} target="_blank" rel="noreferrer">
                          {application.website}
                        </a>
                      </p>
                    )}
                    {application.message && (
                      <p><strong>Message:</strong> {application.message}</p>
                    )}
                  </>
                ) : (
                  <>
                    <p><strong>Job title:</strong> {application.jobTitle}</p>
                    <p><strong>Expertise:</strong> {application.expertise}</p>
                    <p><strong>Experience:</strong> {application.yearsExperience} year(s)</p>
                    <p><strong>Proposed session:</strong> {application.sessionTitle}</p>
                    <p><strong>Session description:</strong> {application.sessionDescription}</p>
                    <p><strong>WhatsApp:</strong> {application.whatsapp}</p>
                    {application.linkedin && (
                      <p>
                        <strong>LinkedIn:</strong>{" "}
                        <a href={application.linkedin} target="_blank" rel="noreferrer">
                          View profile
                        </a>
                      </p>
                    )}
                  </>
                )}
              </div>

              <p className="partner-admin-date">
                Submitted {new Date(application.createdAt).toLocaleString()}
              </p>

              <div className="partner-admin-actions">
                {application.status !== "APPROVED" && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={workingId === application.id}
                    onClick={() => void performAction(application, "approve")}
                  >
                    Approve
                  </button>
                )}

                {application.status !== "REJECTED" && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={workingId === application.id}
                    onClick={() => void performAction(application, "reject")}
                  >
                    Reject
                  </button>
                )}

                {application.status === "APPROVED" && !application.isPublished && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={workingId === application.id}
                    onClick={() => void performAction(application, "publish")}
                  >
                    Publish on Website
                  </button>
                )}

                {application.isPublished && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={workingId === application.id}
                    onClick={() => void performAction(application, "unpublish")}
                  >
                    Unpublish
                  </button>
                )}
              </div>

              {workingId === application.id && <p>Saving changes...</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
