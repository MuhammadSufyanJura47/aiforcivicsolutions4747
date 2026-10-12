
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  HeartHandshake,
  Lightbulb,
} from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

const focusAreas = [
  "Identify a meaningful civic or community challenge.",
  "Explore how AI and software could help address it.",
  "Develop and demonstrate a practical project prototype.",
];

export default function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-visual">
          <div className="about-art-card">
            <div className="about-art-top">
              <span className="about-art-icon">
                <Compass size={26} />
              </span>
              <span className="about-art-label">OUR MISSION</span>
            </div>

            <p className="about-art-title">
              Technology should solve problems that matter.
            </p>

            <div className="about-art-divider" />

            <div className="about-art-bottom">
              <span>
                <Lightbulb size={17} /> Ideas
              </span>
              <ArrowRight size={18} />
              <span>
                <HeartHandshake size={17} /> Impact
              </span>
            </div>
          </div>

          <div className="about-floating-note">
            <CheckCircle2 size={20} />
            <span>
              <strong>Purpose-driven building</strong>
              <small>Innovation with civic value</small>
            </span>
          </div>
        </div>

        <div className="about-copy">
          <SectionHeading
            eyebrow="About the initiative"
            title="Innovation Beyond the Screen"
            align="left"
          />

          <p>
            AI for Civic Solutions 2026 is a civic innovation initiative by
            CODELOGIX Solutions. It invites participants to explore how
            artificial intelligence, software development, and creative
            problem-solving can contribute to better outcomes for people
            and communities.
          </p>

          <p>
            The journey is designed around identifying real challenges,
            learning relevant skills, developing project ideas, and working
            towards prototypes. Participants can explore areas such as
            public services, education, healthcare, smart cities, and the
            environment.
          </p>

          <ul className="about-checklist">
            {focusAreas.map((item) => (
              <li key={item}>
                <CheckCircle2 size={19} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link href="/about" className="text-link">
            Learn more about the initiative <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
