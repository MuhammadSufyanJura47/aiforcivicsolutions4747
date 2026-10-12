
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";

const milestones = [
  {
    date: "To be announced",
    title: "Registration",
    description: "Applications are submitted and reviewed by the organizing team.",
    status: "Schedule pending",
  },
  {
    date: "To be announced",
    title: "Orientation",
    description: "Participants receive an introduction to the event and its participation process.",
    status: "Schedule pending",
  },
  {
    date: "To be announced",
    title: "Learning workshops",
    description: "Planned sessions help participants explore relevant tools and project skills.",
    status: "Schedule pending",
  },
  {
    date: "To be announced",
    title: "Ideation and team preparation",
    description: "Participants refine their problem statements, ideas, and project plans.",
    status: "Schedule pending",
  },
  {
    date: "To be announced",
    title: "Build and submission",
    description: "Teams develop their prototypes and submit the required project materials.",
    status: "Schedule pending",
  },
  {
    date: "To be announced",
    title: "Judging and project showcase",
    description: "Eligible submissions are evaluated and selected projects may be invited to present.",
    status: "Schedule pending",
  },
  {
    date: "To be announced",
    title: "Results and closing",
    description: "The organizing team communicates final results and closing information.",
    status: "Schedule pending",
  },
];

export default function TimelinePage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Plan your journey"
        title="Hackathon Timeline"
        description="Follow the planned journey from registration through learning, project development, submission, and showcase."
      />

      <section className="page-content">
        <div className="container">
          <div className="timeline-list">
            {milestones.map((item, index) => (
              <article className="timeline-item" key={item.title}>
                <div className="timeline-date">{item.date}</div>
                <div>
                  <h2>{index + 1}. {item.title}</h2>
                  <p>{item.description}</p>
                  <span className="status-label">{item.status}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="page-callout">
            <h3>Dates have not been confirmed on this page</h3>
            <p>
              The milestones above describe the proposed sequence, not
              confirmed dates or currently active event statuses. Please
              check official announcements for changes.
            </p>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
