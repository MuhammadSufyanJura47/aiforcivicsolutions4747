
import Link from "next/link";
import {
  Award,
  BriefcaseBusiness,
  Building,
  FolderCode,
  HeartHandshake,
  MessagesSquare,
  Trophy,
  Users,
} from "lucide-react";
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";
import GlassCard from "@/components/ui/glass-card";
import { benefits } from "@/lib/site";

const icons = [
  FolderCode,
  MessagesSquare,
  Users,
  Award,
  Trophy,
  BriefcaseBusiness,
  FolderCode,
  Building,
  HeartHandshake,
  Users,
];

export default function BenefitsPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Why participate?"
        title="Build Skills Through Real Problems"
        description="The hackathon is designed to encourage practical learning, collaboration, and the exploration of civic technology."
      />

      <section className="page-content">
        <div className="container">
          <div className="page-grid">
            {benefits.map((benefit, index) => {
              const Icon = icons[index];

              return (
                <GlassCard className="page-card" key={benefit.title}>
                  <span className="icon-tile mint-tile">
                    <Icon size={24} />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </GlassCard>
              );
            })}
          </div>

          <div className="benefits-highlight-card">
            <div>
              <span className="section-eyebrow">Hackathon rewards</span>
              <h3>Prize Pool: TBD</h3>
              <p>
                Prize details will be announced by the organizers when they are
                confirmed.
              </p>
            </div>
            <div>
              <span className="section-eyebrow">Recognition</span>
              <h3>QR-verified certificates</h3>
              <p>
                Participants will receive certificates with QR verification for
                easy authenticity checks.
              </p>
            </div>
          </div>

          <div className="page-callout">
            <h3>What should you expect?</h3>
            <p>
              Expect a chance to learn, collaborate, and work on a project.
              Specific prizes, certificates, internships, mentorship
              commitments, or other rewards should only be considered
              confirmed if the organizers announce them officially.
            </p>
            <div className="section-action">
              <Link href="/apply" className="btn btn-primary">Apply Now</Link>
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
