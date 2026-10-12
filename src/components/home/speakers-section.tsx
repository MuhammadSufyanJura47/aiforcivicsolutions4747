
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Link2,
  Mail,
  Mic2,
} from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import GlassCard from "@/components/ui/glass-card";
import { featuredSpeakers } from "@/lib/site";

export default function SpeakersSection() {
  return (
    <section className="section" id="speakers">
      <div className="container">
        <SectionHeading
          eyebrow="Learn from experience"
          title="Meet the Voices Behind the Ideas"
          description="Guest speaker profiles and session information will be published after confirmation by the organizing team."
        />

        <div className="speakers-grid">
          {featuredSpeakers.map((speaker, index) => (
            <GlassCard className="speaker-card" key={index}>
              <div className="speaker-image">
                <Image
                  src={speaker.image}
                  alt={
                    speaker.name === "Speaker Announcement Pending"
                      ? "Speaker announcement pending"
                      : speaker.name
                  }
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="speaker-img"
                />
              </div>

              <div className="speaker-content">
                <span className="speaker-role">
                  <Mic2 size={14} /> {speaker.role}
                </span>

                <h3>{speaker.name}</h3>

                <p className="speaker-organization">
                  <BriefcaseBusiness size={15} />
                  {speaker.organization}
                </p>

                <p className="speaker-session">{speaker.session}</p>

                <div className="speaker-links">
                  {speaker.email ? (
                    <a
                      href={`mailto:${speaker.email}`}
                      aria-label={`Email ${speaker.name}`}
                    >
                      <Mail size={17} />
                    </a>
                  ) : (
                    <span className="speaker-link-disabled" title="Email to be announced">
                      <Mail size={17} />
                    </span>
                  )}

                  {speaker.linkedin ? (
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${speaker.name} on LinkedIn`}
                    >
                      <Link2 size={17} />
                    </a>
                  ) : (
                    <span className="speaker-link-disabled" title="LinkedIn to be announced">
                      <Link2 size={17} />
                    </span>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="section-action">
          <Link href="/speakers" className="btn btn-secondary">
            View All Speakers <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
