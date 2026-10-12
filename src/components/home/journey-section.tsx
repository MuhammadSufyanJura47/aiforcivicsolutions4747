
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Code2,
  Lightbulb,
  Rocket,
  Send,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { journeySteps } from "@/lib/site";

const icons = [
  ClipboardList,
  Users,
  Lightbulb,
  Code2,
  Send,
  Rocket,
];

export default function JourneySection() {
  return (
    <section className="section" id="journey">
      <div className="container">
        <SectionHeading
          eyebrow="Your innovation journey"
          title="From Registration to Showcase"
          description="A clear journey helps participants move from an initial idea towards a project they can demonstrate and explain."
        />

        <div className="journey-grid">
          {journeySteps.map((step, index) => {
            const Icon = icons[index];

            return (
              <article className="journey-step" key={step.number}>
                <div className="journey-icon">
                  <Icon size={24} />
                  <span>{step.number}</span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>

                {index < journeySteps.length - 1 && (
                  <ArrowRight
                    className="journey-arrow"
                    size={19}
                    aria-hidden="true"
                  />
                )}
              </article>
            );
          })}
        </div>

        <div className="journey-note">
          <CheckCircle2 size={19} />
          <p>
            Dates, submission instructions, and event milestones will be
            published on the official timeline once confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
