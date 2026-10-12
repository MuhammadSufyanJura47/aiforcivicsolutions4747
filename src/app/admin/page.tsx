
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("codelogixsolutions@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to sign in.");
        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-content">
      <div className="container" style={{ maxWidth: 480, paddingTop: 45 }}>
        <form className="page-form" onSubmit={handleSubmit}>
          <span className="section-eyebrow">CODELOGIX Solutions</span>
          <h1 style={{ color: "var(--navy)", fontSize: "2rem" }}>
            Admin Portal
          </h1>
          <p className="page-form-description">
            Sign in to manage AI for Civic Solutions 2026.
          </p>

          <div className="form-field">
            <label htmlFor="email">Admin email *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              maxLength={200}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {error && (
            <p className="form-note" role="alert">{error}</p>
          )}

          <p className="form-note">
            Authorized organizers only. If you cannot sign in, contact
            the system administrator.
          </p>
        </form>
      </div>
    </main>
  );
}
