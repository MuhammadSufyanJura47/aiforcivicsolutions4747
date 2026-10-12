
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Building,
  FolderCode,
  HeartHandshake,
  MessagesSquare,
  Trophy,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
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

export default function BenefitsSection() {
  return (
    <section className="section" id="benefits">
      <div className="container">
        <SectionHeading
          eyebrow="Why participate?"
          title="More Than a Hackathon"
          description="Learn by doing, collaborate with others, and focus your technical creativity on challenges that matter."
        />

        <div className="benefits-grid">
          {benefits.map((benefit, index) => {
            const Icon = icons[index];

            return (
              <GlassCard key={benefit.title} className="benefit-card">
                <span className="icon-tile mint-tile">
                  <Icon size={24} />
                </span>

                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </GlassCard>
            );
          })}
        </div>

        <div className="section-action">
          <Link href="/benefits" className="text-link">
            Explore all benefits <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
