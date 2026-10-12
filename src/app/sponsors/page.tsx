
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";
import GlassCard from "@/components/ui/glass-card";
import InquiryForm from "@/components/forms/inquiry-forms";
import { sponsorTiers } from "@/lib/site";

export default function SponsorsPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Partnership opportunities"
        title="Support the Next Generation of Civic Innovators"
        description="Connect your organization with an initiative exploring AI, software development, and solutions for community challenges."
      />

      <section className="page-content">
        <div className="container">
          <div className="page-grid">
            {sponsorTiers.map((tier) => (
              <GlassCard className="page-card" key={tier.tier}>
                <span className="tier-label">{tier.tier}</span>
                <h3>{tier.title}</h3>
                <p>{tier.description}</p>
              </GlassCard>
            ))}
          </div>

          <div className="page-callout" style={{ marginBottom: 38 }}>
            <h3>Potential ways to contribute</h3>
            <p>
              Organizations may propose financial support, learning
              resources, software credits, mentorship, equipment,
              internships, or other relevant contributions. Each proposal
              is subject to review and agreement; submitting an inquiry
              does not guarantee partnership.
            </p>
          </div>

          <div style={{ maxWidth: 850, marginInline: "auto" }}>
            <InquiryForm kind="sponsor" />
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
