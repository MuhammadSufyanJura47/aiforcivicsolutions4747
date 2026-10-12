
import Image from "next/image";
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";
import InquiryForm from "@/components/forms/inquiry-forms";
import GlassCard from "@/components/ui/glass-card";
import { featuredSpeakers } from "@/lib/site";
import {
  BriefcaseBusiness,
  Link2,
  Mail,
  Mic2,
} from "lucide-react";

export default function SpeakersPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Speaker community"
        title="Share What You Know"
        description="We welcome relevant experience, practical insights, and thoughtful sessions that can help participants explore civic technology."
      />

      <section className="page-content">
        <div className="container">
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
                      <span
                        className="speaker-link-disabled"
                        title="Email to be announced"
                      >
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
                      <span
                        className="speaker-link-disabled"
                        title="LinkedIn to be announced"
                      >
                        <Link2 size={17} />
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="page-callout" style={{ marginBottom: 38 }}>
            <h3>How speaker applications work</h3>
            <p>
              Submit your experience and proposed session below. Applications
              will need to be reviewed by the organizing team. A submission
              does not guarantee selection or publication.
            </p>
          </div>

          <div style={{ maxWidth: 850, marginInline: "auto" }}>
            <InquiryForm kind="speaker" />
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
