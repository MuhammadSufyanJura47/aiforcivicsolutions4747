
import Image from "next/image";
import { CalendarDays, Clock3, UserRound } from "lucide-react";
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";
import GlassCard from "@/components/ui/glass-card";
import { featuredWorkshops } from "@/lib/site";

export default function WorkshopsPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Learn, practise, build"
        title="Hackathon Learning Workshops"
        description="Explore proposed learning sessions designed to help participants prepare for their civic technology projects."
      />

      <section className="page-content">
        <div className="container">
          <div className="page-grid">
            {featuredWorkshops.map((workshop) => (
              <GlassCard className="workshop-card" key={workshop.title}>
                <div className="workshop-image">
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 850px) 50vw, 33vw"
                    className="workshop-img"
                  />
                </div>

                <div className="workshop-content">
                  <span className="tier-label">Planned session</span>
                  <h3 style={{ marginTop: 12 }}>{workshop.title}</h3>
                  <p>{workshop.description}</p>

                  <div className="workshop-meta">
                    <span><CalendarDays size={15} /> {workshop.date}</span>
                    <span><Clock3 size={15} /> {workshop.time}</span>
                  </div>

                  <div className="workshop-speaker">
                    <UserRound size={17} />
                    <span>{workshop.speaker}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="workshops-free-tag">
            All workshops are free to attend for registered participants
          </div>

          <div className="page-callout">
            <h3>Workshop announcements</h3>
            <p>
              Session dates, joining instructions, speakers, and participant
              eligibility will be updated after confirmation. Do not treat
              the placeholder dates as a published schedule.
            </p>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
