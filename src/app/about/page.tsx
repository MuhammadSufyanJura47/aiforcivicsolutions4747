
import Link from "next/link";
import { CheckCircle2, HeartHandshake, Lightbulb, Target } from "lucide-react";
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";
import GlassCard from "@/components/ui/glass-card";

const principles = [
  {
    icon: Target,
    title: "Start with real problems",
    description:
      "Understand a civic or community challenge before choosing the technology.",
  },
  {
    icon: Lightbulb,
    title: "Build with purpose",
    description:
      "Explore practical uses of AI and software rather than adding technology without a clear need.",
  },
  {
    icon: HeartHandshake,
    title: "Consider people first",
    description:
      "Think about accessibility, privacy, fairness, and the needs of the people affected by a solution.",
  },
];

export default function AboutPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="About the initiative"
        title="Technology with a Civic Purpose"
        description="AI for Civic Solutions 2026 brings civic challenges and technology together through learning, collaboration, and project development."
      />

      <section className="page-content">
        <div className="container">
          <div className="content-block">
            <h2>Our mission</h2>
            <p>
              AI for Civic Solutions 2026 is an initiative by CODELOGIX
              Solutions that encourages participants to explore how
              artificial intelligence and software can help address public
              and community challenges.
            </p>
            <p>
              Participants are encouraged to investigate a meaningful
              problem, develop a clear solution concept, and work towards
              a prototype that communicates its purpose and potential
              impact.
            </p>
          </div>

          <div className="page-grid">
            {principles.map(({ icon: Icon, title, description }) => (
              <GlassCard className="page-card" key={title}>
                <span className="icon-tile"><Icon size={24} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </GlassCard>
            ))}
          </div>

          <div className="content-block" style={{ marginTop: 45 }}>
            <h2>What the journey looks like</h2>
            <ul>
              <li>Apply as a solo participant or a team.</li>
              <li>Learn through hackathon-related workshops.</li>
              <li>Identify a civic problem and plan a suitable approach.</li>
              <li>Build and document a prototype.</li>
              <li>Submit your project according to the official instructions.</li>
            </ul>
          </div>

          <div className="page-callout">
            <h3>Ready to get involved?</h3>
            <p>
              Review the participation details and official timeline before
              submitting your application.
            </p>
            <div className="section-action">
              <Link href="/apply" className="btn btn-primary">Apply Now</Link>
              <Link href="/timeline" className="btn btn-secondary">View Timeline</Link>
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
