
"use client";

import { useState, type FormEvent } from "react";

type FormKind = "sponsor" | "speaker" | "contact";

function TextField({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}{required ? " *" : ""}</label>
      <input id={name} name={name} type={type} required={required} />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  required = true,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div className="form-field full-width">
      <label htmlFor={name}>{label}{required ? " *" : ""}</label>
      <textarea id={name} name={name} required={required} rows={4} />
    </div>
  );
}

export default function InquiryForm({ kind }: { kind: FormKind }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const titles = {
    sponsor: "Sponsor inquiry",
    speaker: "Speaker application",
    contact: "Send us a message",
  };

  const descriptions = {
    sponsor: "Tell us about your organization and how you may wish to contribute.",
    speaker: "Share your experience and propose a session for the hackathon community.",
    contact: "Send your question or inquiry to the organizing team.",
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData(form);
      const response =
        kind === "contact"
          ? await fetch("https://formspree.io/f/mzedajdl", {
              method: "POST",
              headers: { Accept: "application/json" },
              body: formData,
            })
          : await fetch("/api/inquiries", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...Object.fromEntries(formData.entries()),
                kind,
              }),
            });
      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        setMessage(data.error ?? "Unable to submit this form.");
        return;
      }

      form.reset();

      if (kind === "contact") {
        setSubmitted(true);
      } else {
        setMessage(data.message ?? "Your submission was received successfully.");
      }
    } catch {
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="page-form" onSubmit={handleSubmit}>
        <h2>{titles[kind]}</h2>
        <p className="page-form-description">{descriptions[kind]}</p>

        <div className="page-form-grid">
          {kind === "sponsor" && (
            <>
              <TextField label="Contact full name" name="fullName" />
              <TextField label="Work email" name="email" type="email" />
              <TextField label="Phone number" name="phone" type="tel" />
              <TextField label="Designation" name="designation" />
              <TextField label="Organization name" name="organization" />
              <TextField label="Organization website" name="website" type="url" required={false} />

              <div className="form-field">
                <label htmlFor="tier">Preferred partnership tier *</label>
                <select id="tier" name="tier" required defaultValue="">
                  <option value="" disabled>Select a tier</option>
                  <option>Platinum</option>
                  <option>Gold</option>
                  <option>Silver</option>
                  <option>Community Partner</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="contribution">Contribution type *</label>
                <select id="contribution" name="contribution" required defaultValue="">
                  <option value="" disabled>Select a contribution</option>
                  <option>Financial support</option>
                  <option>Internships or opportunities</option>
                  <option>Vouchers or credits</option>
                  <option>Swag or equipment</option>
                  <option>Mentorship</option>
                  <option>Venue or other resources</option>
                </select>
              </div>

              <TextAreaField label="Message or proposal" name="message" required={false} />
            </>
          )}

          {kind === "speaker" && (
            <>
              <TextField label="Full name" name="fullName" />
              <TextField label="Email" name="email" type="email" />
              <TextField label="Phone number" name="phone" type="tel" />
              <TextField label="WhatsApp number" name="whatsapp" type="tel" />
              <TextField label="Organization" name="organization" />
              <TextField label="Job title" name="jobTitle" />
              <TextField label="LinkedIn profile" name="linkedin" type="url" required={false} />

              <div className="form-field">
                <label htmlFor="expertise">Area of expertise *</label>
                <select id="expertise" name="expertise" required defaultValue="">
                  <option value="" disabled>Select an area</option>
                  <option>Artificial intelligence</option>
                  <option>Software development</option>
                  <option>Civic technology</option>
                  <option>Entrepreneurship</option>
                  <option>Design and user experience</option>
                  <option>Other</option>
                </select>
              </div>

              <TextField label="Years of experience" name="experience" type="number" />
              <TextField label="Proposed session title" name="sessionTitle" />
              <TextAreaField label="Session description and relevance" name="sessionDescription" />
            </>
          )}

          {kind === "contact" && (
            <>
              <TextField label="Full name" name="fullName" />
              <TextField label="Email address" name="email" type="email" />

              <div className="form-field full-width">
                <label htmlFor="subject">Subject *</label>
                <select id="subject" name="subject" required defaultValue="">
                  <option value="" disabled>Select a topic</option>
                  <option>Hackathon registration</option>
                  <option>Application status</option>
                  <option>Workshop inquiry</option>
                  <option>Sponsorship</option>
                  <option>Speaker application</option>
                  <option>Other</option>
                </select>
              </div>

              <TextAreaField label="Your message" name="message" />
            </>
          )}
        </div>

        <label className="checkbox-row">
          <input type="checkbox" name="consent" required />
          <span>
            I confirm that the information provided is accurate and may be
            used by the organizing team to respond to this inquiry.
          </span>
        </label>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading
            ? "Submitting..."
            : kind === "sponsor"
            ? "Submit Sponsor Inquiry"
            : kind === "speaker"
              ? "Submit Speaker Application"
              : "Send Message"}
        </button>

        {message && <p className="form-message" role="alert">{message}</p>}

        <p className="form-note">
          Your information is sent securely to the organizing team for review.
          Do not include passwords, payment PINs, or other sensitive credentials.
        </p>
      </form>

      {submitted && (
        <div className="form-success-overlay" role="presentation">
          <div
            className="form-success-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
          >
            <span className="form-success-icon" aria-hidden="true">✓</span>
            <h2 id="contact-success-title">Thank you for contacting us</h2>
            <p>
              Your message has been sent successfully. The CODELOGIX Solutions
              team will get back to you soon.
            </p>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setSubmitted(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
