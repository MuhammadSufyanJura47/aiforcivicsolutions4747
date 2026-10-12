
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Leaf,
  MonitorCog,
} from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import GlassCard from "@/components/ui/glass-card";
import { tracks } from "@/lib/site";

const icons = [
  Landmark,
  Building2,
  MonitorCog,
  GraduationCap,
  HeartPulse,
  Leaf,
];

export default function TracksSection() {
  return (
    <section className="section surface-blue" id="tracks">
      <div className="container">
        <SectionHeading
          eyebrow="Explore the challenge areas"
          title="Choose a Problem Worth Solving"
          description="Explore civic challenge areas and identify where your skills, ideas, and curiosity can make a meaningful difference."
        />

        <div className="tracks-grid">
          {tracks.map((track, index) => {
            const Icon = icons[index];

            return (
              <GlassCard key={track.title} className="track-card">
                <div className="track-card-top">
                  <span className="icon-tile">
                    <Icon size={25} strokeWidth={1.8} />
                  </span>
                  <span className="track-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3>{track.title}</h3>
                <p>{track.description}</p>

                <Link
                  href="/tracks"
                  className="card-link"
                  aria-label={`Explore ${track.title}`}
                >
                  Explore track <ArrowRight size={16} />
                </Link>
              </GlassCard>
            );
          })}
        </div>

        <div className="section-action">
          <Link href="/tracks" className="btn btn-secondary">
            View All Tracks <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
