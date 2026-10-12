
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  UserRound,
} from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import GlassCard from "@/components/ui/glass-card";
import { featuredWorkshops } from "@/lib/site";

export default function WorkshopsSection() {
  return (
    <section className="section surface-mint" id="workshops">
      <div className="container">
        <SectionHeading
          eyebrow="Learn before you build"
          title="Workshops That Help You Build"
          description="Explore practical learning sessions designed to help participants develop ideas and prepare for the hackathon."
        />

        <div className="workshops-grid">
          {featuredWorkshops.map((workshop) => (
            <GlassCard className="workshop-card" key={workshop.title}>
              <div className="workshop-image">
                <Image
                  src={workshop.image}
                  alt={workshop.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="workshop-img"
                />
                <span className="workshop-badge">
                  Free for registered participants
                </span>
              </div>

              <div className="workshop-content">
                <div className="workshop-meta">
                  <span>
                    <CalendarDays size={15} /> {workshop.date}
                  </span>
                  <span>
                    <Clock3 size={15} /> {workshop.time}
                  </span>
                </div>

                <h3>{workshop.title}</h3>
                <p>{workshop.description}</p>

                <div className="workshop-speaker">
                  <UserRound size={17} />
                  <span>{workshop.speaker}</span>
                </div>

                <Link href="/workshops" className="card-link">
                  Workshop details <ArrowRight size={16} />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="workshops-free-tag">
          All workshops are free to attend for registered participants
        </div>

        <div className="section-action">
          <Link href="/workshops" className="btn btn-secondary">
            All Workshops <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
