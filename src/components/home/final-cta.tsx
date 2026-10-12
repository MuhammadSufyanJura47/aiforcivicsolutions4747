
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Users,
} from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section final-cta-section">
      <div className="container">
        <div className="final-cta">
          <div className="final-cta-decoration" aria-hidden="true">
            <Lightbulb size={42} />
          </div>

          <span className="final-cta-eyebrow">
            YOUR NEXT IDEA STARTS HERE
          </span>

          <h2>Ready to Build Something That Matters?</h2>

          <p>
            Join hundreds of builders, designers, and innovators shaping
            the future of civic technology.
          </p>

          <div className="final-cta-actions">
            <Link href="/apply" className="btn btn-primary">
              Apply for the Hackathon <ArrowRight size={18} />
            </Link>

            <Link href="/contact" className="btn btn-secondary">
              Contact the Team
            </Link>
          </div>

          <div className="final-cta-points">
            <span>
              <CheckCircle2 size={16} /> Purpose-driven projects
            </span>
            <span>
              <Users size={16} /> Collaborative learning
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
