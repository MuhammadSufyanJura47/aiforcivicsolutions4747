
"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { allTrackNames } from "@/lib/site";
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";

type TeamMember = {
  fullName: string;
  email: string;
  phone: string;
};

type Result = {
  message?: string;
  error?: string;
  details?: unknown;
  feePKR?: number;
  nextStep?: string;
  application?: {
    rollNumber: string;
    leaderName: string;
    teamSize: number;
    trackName: string;
    status: string;
  };
};

const fees: Record<number, number> = {
  1: 300,
  2: 500,
  3: 700,
  4: 900,
  5: 1000,
};

const emptyMember = (): TeamMember => ({
  fullName: "",
  email: "",
  phone: "",
});

export default function ApplyPage() {
  const [teamSize, setTeamSize] = useState(1);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [trackName, setTrackName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const fee = useMemo(() => fees[teamSize], [teamSize]);

  function changeTeamSize(value: number) {
    setTeamSize(value);
    setMembers((current) =>
      Array.from(
        { length: value - 1 },
        (_, index) => current[index] ?? emptyMember(),
      ),
    );
  }

  function updateMember(
    index: number,
    field: keyof TeamMember,
    value: string,
  ) {
    setMembers((current) =>
      current.map((member, i) =>
        i === index ? { ...member, [field]: value } : member,
      ),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      leaderName: String(formData.get("leaderName") ?? ""),
      leaderEmail: String(formData.get("leaderEmail") ?? ""),
      leaderPhone: String(formData.get("leaderPhone") ?? ""),
      city: String(formData.get("city") ?? ""),
      institution: String(formData.get("institution") ?? ""),
      teamSize,
      trackName,
      projectIdea: String(formData.get("projectIdea") ?? ""),
      members,
      paymentConfirmation:
        formData.get("paymentConfirmation") === "on",
    };

    const paymentProof = formData.get("paymentProof");
    const requestData = new FormData();
    requestData.append("application", JSON.stringify(payload));

    if (paymentProof instanceof File && paymentProof.size > 0) {
      requestData.append("paymentProof", paymentProof);
    }

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        body: requestData,
      });

      const data: Result = await response.json();
      setResult(data);

      if (response.ok) {
        form.reset();
        setTeamSize(1);
        setMembers([]);
        setTrackName("");
      }
    } catch {
      setResult({
        error: "Unable to connect to the server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (result?.application) {
    return (
      <PublicPage>
        <PageIntro
          eyebrow="Application received"
          title="Your Registration Has Been Created"
          description="Save your roll number carefully. You will need it when checking your application status."
        />
        <section className="page-content">
          <div className="container" style={{ maxWidth: 720 }}>
            <div className="page-callout">
              <h2>{result.application.rollNumber}</h2>
              <p>
                Applicant: {result.application.leaderName}
                <br />
                Team size: {result.application.teamSize}
                <br />
                Track: {result.application.trackName}
                <br />
                Initial status: {result.application.status}
                <br />
                Registration fee: PKR {result.feePKR?.toLocaleString("en-PK")}
              </p>
              <p style={{ marginTop: 12 }}>
                Your application and payment screenshot have been submitted.
                Both are pending review. Uploading a screenshot does not mean
                your payment has been verified.
              </p>
              <div className="section-action">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() =>
                    window.print()
                  }
                >
                  Print / Save Confirmation
                </button>
                <Link href="/check-status" className="btn btn-secondary">
                  Check Status
                </Link>
              </div>
            </div>
            <p className="form-note" style={{ marginTop: 18 }}>
              Keep your roll number private. Do not share payment PINs or
              banking credentials with anyone.
            </p>
          </div>
        </section>
      </PublicPage>
    );
  }

  return (
    <PublicPage>
      <PageIntro
        eyebrow="Join the challenge"
        title="Apply for AI for Civic Solutions 2026"
        description="Complete the application carefully. The server validates your details and calculates the fee based on your selected team size."
      />

      <section className="page-content">
        <div className="container" style={{ maxWidth: 850 }}>
          <form className="page-form" onSubmit={handleSubmit}>
            <h2>1. Participation details</h2>
            <p className="page-form-description">
              Select your participation type and review the fee before
              proceeding.
            </p>

            <div className="page-form-grid">
              <div className="form-field full-width">
                <label htmlFor="teamSize">Participation type *</label>
                <select
                  id="teamSize"
                  value={teamSize}
                  onChange={(event) =>
                    changeTeamSize(Number(event.target.value))
                  }
                >
                  <option value={1}>Solo participant — PKR 300</option>
                  <option value={2}>Team of 2 — PKR 500</option>
                  <option value={3}>Team of 3 — PKR 700</option>
                  <option value={4}>Team of 4 — PKR 900</option>
                  <option value={5}>Team of 5 — PKR 1,000</option>
                </select>
              </div>
            </div>

            <div className="page-callout" style={{ marginTop: 0 }}>
              <h3>Registration fee: PKR {fee.toLocaleString("en-PK")}</h3>
            </div>

            <h2>2. Team leader details</h2>
            <div className="page-form-grid">
              <div className="form-field">
                <label htmlFor="leaderName">Full name *</label>
                <input id="leaderName" name="leaderName" required minLength={2} maxLength={100} />
              </div>
              <div className="form-field">
                <label htmlFor="leaderEmail">Email address *</label>
                <input id="leaderEmail" name="leaderEmail" type="email" required maxLength={254} />
              </div>
              <div className="form-field">
                <label htmlFor="leaderPhone">WhatsApp / phone *</label>
                <input id="leaderPhone" name="leaderPhone" type="tel" required minLength={7} maxLength={30} />
              </div>
              <div className="form-field">
                <label htmlFor="city">City *</label>
                <input id="city" name="city" required minLength={2} maxLength={100} />
              </div>
              <div className="form-field full-width">
                <label htmlFor="institution">University / institution *</label>
                <input id="institution" name="institution" required minLength={2} maxLength={180} />
              </div>
            </div>

            {teamSize > 1 && (
              <>
                <h2>3. Team member details</h2>
                <p className="page-form-description">
                  Enter the details of the other {teamSize - 1} participant(s).
                  The team leader is already included in the team size.
                </p>

                {members.map((member, index) => (
                  <div className="content-block" key={index}>
                    <h3>Member {index + 2}</h3>
                    <div className="page-form-grid">
                      <div className="form-field">
                        <label htmlFor={`member-name-${index}`}>Full name *</label>
                        <input
                          id={`member-name-${index}`}
                          value={member.fullName}
                          onChange={(event) =>
                            updateMember(index, "fullName", event.target.value)
                          }
                          required
                          minLength={2}
                          maxLength={100}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor={`member-email-${index}`}>Email (optional)</label>
                        <input
                          id={`member-email-${index}`}
                          type="email"
                          value={member.email}
                          onChange={(event) =>
                            updateMember(index, "email", event.target.value)
                          }
                          maxLength={254}
                        />
                      </div>
                      <div className="form-field full-width">
                        <label htmlFor={`member-phone-${index}`}>Phone (optional)</label>
                        <input
                          id={`member-phone-${index}`}
                          type="tel"
                          value={member.phone}
                          onChange={(event) =>
                            updateMember(index, "phone", event.target.value)
                          }
                          maxLength={30}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            <h2>{teamSize > 1 ? "4." : "3."} Challenge track and project</h2>
            <div className="page-form-grid">
              <div className="form-field full-width">
                <label htmlFor="trackName">Preferred challenge track *</label>
                <select
                  id="trackName"
                  value={trackName}
                  onChange={(event) => setTrackName(event.target.value)}
                  required
                >
                  <option value="">Select a track</option>
                  {allTrackNames.map((track) => (
                    <option key={track} value={track}>{track}</option>
                  ))}
                </select>
              </div>
              <div className="form-field full-width">
                <label htmlFor="projectIdea">Project idea / problem statement *</label>
                <textarea
                  id="projectIdea"
                  name="projectIdea"
                  rows={6}
                  required
                  minLength={20}
                  maxLength={3000}
                  placeholder="Describe the civic problem, who experiences it, and how your proposed solution could help."
                />
              </div>
            </div>

            <h2>Payment proof</h2>
            <p className="page-form-description">
              Upload a screenshot of your registration fee payment. Your
              application and payment proof will be submitted together.
            </p>
            <div className="page-callout" style={{ marginTop: 0 }}>
              <h3>Easypaisa payment details</h3>
              <p>
                Bank Name: Easypaisa
                <br />
                Account Title: Muhammad Sufyan Jura
                <br />
                Account Number: 03395858284
              </p>
            </div>
            <div className="page-form-grid">
              <div className="form-field full-width">
                <label htmlFor="paymentProof">Payment screenshot *</label>
                <input
                  id="paymentProof"
                  name="paymentProof"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  required
                />
                <p className="form-note">
                  Accepted formats: JPG, PNG, WebP. Maximum file size: 5 MB.
                </p>
              </div>
            </div>

            <label className="checkbox-row">
              <input type="checkbox" name="accuracy" required />
              <span>
                I confirm that the details provided are accurate and that
                all listed team members have agreed to be included.
              </span>
            </label>

            <label className="checkbox-row">
              <input type="checkbox" name="paymentConfirmation" required />
              <span>
                I confirm that the application information is accurate, all
                listed team members have agreed to participate, and the
                uploaded payment screenshot corresponds to this registration.
              </span>
            </label>

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading
                ? "Submitting application and payment proof..."
                : "Submit Application & Payment Proof"}
            </button>

            {result?.error && (
              <p className="form-message" role="alert">{result.error}</p>
            )}

            {result?.details !== undefined && (
              <p className="form-note">
                Please review the required fields and try again.
              </p>
            )}

            <p className="form-note">
              Your payment proof and application will remain pending review
              until the organizing team verifies them.
            </p>
          </form>
        </div>
      </section>
    </PublicPage>
  );
}
