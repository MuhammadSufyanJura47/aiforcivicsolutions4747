
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Handshake,
  Medal,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import GlassCard from "@/components/ui/glass-card";
import { sponsorTiers } from "@/lib/site";

const icons = [Medal, Handshake, Building2, Users];

export default function SponsorsSection() {
  return (
    <section className="section surface-blue" id="sponsors">
      <div className="container">
        <SectionHeading
          eyebrow="Partner with purpose"
          title="Help Make Civic Innovation Possible"
          description="We welcome organizations interested in supporting civic technology, practical learning, and emerging innovators."
        />

        <div className="sponsors-grid">
          {sponsorTiers.map((sponsor, index) => {
            const Icon = icons[index];

            return (
              <GlassCard
                key={sponsor.tier}
                className="sponsor-card"
              >
                <span className="icon-tile">
                  <Icon size={25} />
                </span>

                <p className="sponsor-tier-label">
                  {sponsor.tier.toUpperCase()}
                </p>

                <h3>{sponsor.title}</h3>
                <p>{sponsor.description}</p>

                <Link href="/sponsors" className="card-link">
                  Partnership details <ArrowRight size={16} />
                </Link>
              </GlassCard>
            );
          })}
        </div>

        <p className="sponsor-note">
          Sponsorship opportunities are subject to review and confirmation.
        </p>

        <div className="section-action">
          <Link href="/sponsors" className="btn btn-primary">
            Become a Partner <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
