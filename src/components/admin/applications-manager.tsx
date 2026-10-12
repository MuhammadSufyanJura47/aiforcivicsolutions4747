"use client";

import { useCallback, useEffect, useState } from "react";

type PaymentProof = {
  id: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  createdAt: string;
} | null;

type Member = {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | null;
};

type Application = {
  id: string;
  rollNumber: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  city: string;
  institution: string;
  participationType: string;
  teamSize: number;
  trackName: string;
  projectIdea: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  rejectionReason: string | null;
  createdAt: string;
  members: Member[];
  paymentProof: PaymentProof;
};

type ApiResult = {
  applications: Application[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  error?: string;
};

const statusOptions = [
  { value: "", label: "All application statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "VERIFIED", label: "Verified" },
  { value: "REJECTED", label: "Rejected" },
];

export default function ApplicationsManager() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [track, setTrack] = useState("");
  const [city, setCity] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [appliedFilters, setAppliedFilters] = useState("");

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const query = new URLSearchParams(appliedFilters);
      query.set("page", String(page));

      const response = await fetch(`/api/admin/applications?${query.toString()}`, {
        cache: "no-store",
      });

      const data: ApiResult = await response.json();

      if (!response.ok) throw new Error(data.error || "Could not load applications.");

      setApplications(data.applications);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [appliedFilters, page]);

  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  function applyFilters(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (status) params.set("status", status);
    if (paymentStatus) params.set("paymentStatus", paymentStatus);
    if (track.trim()) params.set("track", track.trim());
    if (city.trim()) params.set("city", city.trim());
    if (teamSize) params.set("teamSize", teamSize);

    setPage(1);
    setAppliedFilters(params.toString());
  }

  async function review(
    application: Application,
    action:
      | "verify-payment"
      | "reject-payment"
      | "verify-application"
      | "reject-application"
  ) {
    let reason: string | undefined;

    if (action === "reject-application") {
      reason = window.prompt("Enter the reason for rejecting this application:")?.trim();

      if (!reason) {
        setNotice("Rejection cancelled. A reason is required.");
        return;
      }

      if (reason.length < 5 || reason.length > 1000) {
        setNotice("Please enter a rejection reason between 5 and 1,000 characters.");
        return;
      }
    }

    const labels: Record<typeof action, string> = {
      "verify-payment": "verify this payment proof",
      "reject-payment": "reject this payment proof",
      "verify-application": "verify this application",
      "reject-application": "reject this application",
    };

    if (!window.confirm(`Are you sure you want to ${labels[action]} for ${application.rollNumber}?`)) {
      return;
    }

    setWorkingId(application.id);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: application.id,
          action,
          ...(reason ? { reason } : {}),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Review action failed.");

      setNotice("Review action completed.");
      await loadApplications();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setWorkingId("");
    }
  }

  async function deleteApplication(application: Application) {
    const confirmed = window.confirm(
      `Permanently delete ${application.rollNumber} and its database records? This cannot be undone.`
    );

    if (!confirmed) return;

    setWorkingId(application.id);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/applications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: application.id }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Deletion failed.");

      setNotice("Application deleted.");
      await loadApplications();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setWorkingId("");
    }
  }

  const exportUrl = `/api/admin/applications/export${
    appliedFilters ? `?${appliedFilters}` : ""
  }`;

  return (
    <section style={{ marginTop: 28 }}>
      <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
        <form onSubmit={applyFilters}>
          <div className="admin-filter-grid">
            <div className="form-field">
              <label htmlFor="app-search">Search applicants</label>
              <input
                id="app-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Roll number, name, email, phone..."
              />
            </div>

            <div className="form-field">
              <label htmlFor="app-status">Application status</label>
              <select id="app-status" value={status} onChange={(event) => setStatus(event.target.value)}>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="payment-status">Payment status</label>
              <select id="payment-status" value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value)}>
                <option value="">All payment statuses</option>
                <option value="PENDING">Pending</option>
                <option value="VERIFIED">Verified</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="app-track">Track</label>
              <input
                id="app-track"
                value={track}
                onChange={(event) => setTrack(event.target.value)}
                placeholder="Exact track name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="app-city">City</label>
              <input id="app-city" value={city} onChange={(event) => setCity(event.target.value)} placeholder="City" />
            </div>

            <div className="form-field">
              <label htmlFor="app-team-size">Team size</label>
              <select id="app-team-size" value={teamSize} onChange={(event) => setTeamSize(event.target.value)}>
                <option value="">All sizes</option>
                {[1, 2, 3, 4, 5].map((size) => (
                  <option key={size} value={size}>{size === 1 ? "Solo" : `${size} members`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-toolbar">
            <button className="btn btn-primary" type="submit">Apply Filters</button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                setSearch("");
                setStatus("");
                setPaymentStatus("");
                setTrack("");
                setCity("");
                setTeamSize("");
                setPage(1);
                setAppliedFilters("");
              }}
            >
              Clear Filters
            </button>
            <a className="btn btn-secondary" href={exportUrl}>Export CSV</a>
          </div>
        </form>
      </div>

      {error && <p role="alert" className="admin-message admin-error">{error}</p>}
      {notice && <p role="status" className="admin-message">{notice}</p>}

      <div className="admin-list-heading">
        <strong>{loading ? "Loading applications..." : `${total} application(s)`}</strong>
        <span>Page {page} of {totalPages}</span>
      </div>

      {loading ? (
        <div className="glass-card" style={{ padding: 24 }}>Loading records...</div>
      ) : applications.length === 0 ? (
        <div className="glass-card" style={{ padding: 24 }}>No applications match these filters.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Team / Track</th>
                <th>Payment proof</th>
                <th>Application</th>
                <th>Review actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>
                    <strong>{app.rollNumber}</strong>
                    <p>{app.leaderName}</p>
                    <p>{app.leaderEmail}</p>
                    <p>{app.leaderPhone}</p>
                    <p>{app.city} · {app.institution}</p>
                    <small>{new Date(app.createdAt).toLocaleString()}</small>
                  </td>

                  <td>
                    <strong>{app.teamSize === 1 ? "Solo" : `${app.teamSize} members`}</strong>
                    <p>{app.trackName}</p>
                    <details>
                      <summary>Project and team</summary>
                      <p>{app.projectIdea}</p>
                      {app.members.map((member) => (
                        <p key={member.id}>
                          {member.fullName}
                          {member.email ? ` · ${member.email}` : ""}
                          {member.phone ? ` · ${member.phone}` : ""}
                        </p>
                      ))}
                    </details>
                  </td>

                  <td>
                    {app.paymentProof ? (
                      <>
                        <p><strong>{app.paymentProof.status}</strong></p>
                        <p>{(app.paymentProof.fileSize / 1024).toFixed(0)} KB</p>
                        <a
                          href={`/api/admin/payment-proof/${app.paymentProof.id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View screenshot
                        </a>
                        <div className="admin-action-stack">
                          <button
                            className="btn btn-secondary"
                            disabled={workingId === app.id || app.paymentProof.status === "VERIFIED"}
                            onClick={() => void review(app, "verify-payment")}
                          >
                            Verify Payment
                          </button>
                          <button
                            className="btn btn-secondary"
                            disabled={workingId === app.id || app.paymentProof.status === "REJECTED"}
                            onClick={() => void review(app, "reject-payment")}
                          >
                            Reject Payment
                          </button>
                        </div>
                      </>
                    ) : (
                      <span>Missing</span>
                    )}
                  </td>

                  <td>
                    <strong>{app.status}</strong>
                    {app.rejectionReason && <p>{app.rejectionReason}</p>}
                  </td>

                  <td>
                    <div className="admin-action-stack">
                      <button
                        className="btn btn-primary"
                        disabled={
                          workingId === app.id ||
                          app.status === "VERIFIED" ||
                          app.paymentProof?.status !== "VERIFIED"
                        }
                        title={app.paymentProof?.status !== "VERIFIED" ? "Verify payment first" : ""}
                        onClick={() => void review(app, "verify-application")}
                      >
                        Verify Application
                      </button>
                      <button
                        className="btn btn-secondary"
                        disabled={workingId === app.id || app.status === "REJECTED"}
                        onClick={() => void review(app, "reject-application")}
                      >
                        Reject Application
                      </button>
                      <button
                        className="btn btn-secondary"
                        disabled={workingId === app.id}
                        onClick={() => void deleteApplication(app)}
                      >
                        Delete
                      </button>
                    </div>
                    {workingId === app.id && <small>Processing...</small>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="admin-toolbar" style={{ justifyContent: "flex-end", marginTop: 20 }}>
        <button className="btn btn-secondary" disabled={page <= 1 || loading} onClick={() => setPage((value) => value - 1)}>
          Previous
        </button>
        <button className="btn btn-secondary" disabled={page >= totalPages || loading} onClick={() => setPage((value) => value + 1)}>
          Next
        </button>
      </div>
    </section>
  );
}