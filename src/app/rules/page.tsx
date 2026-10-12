
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";

const rules = [
  {
    title: "Eligibility and registration",
    body: "Participants must provide accurate information and meet the eligibility conditions announced by the organizers. Team size, age requirements, fees, and deadlines must be confirmed in the official registration instructions.",
  },
  {
    title: "Solo and team participation",
    body: "Participants may apply using an available participation type. Team members should understand their responsibilities and obtain permission before sharing another person's personal information.",
  },
  {
    title: "Originality and intellectual property",
    body: "Projects should respect third-party intellectual property, licenses, and attribution requirements. Disclose reused code, datasets, templates, and other substantial existing work.",
  },
  {
    title: "Responsible use of AI",
    body: "AI tools may assist with development where permitted by the event instructions. Participants remain responsible for reviewing generated code, verifying claims, testing outputs, and disclosing material AI assistance when requested.",
  },
  {
    title: "Privacy and personal data",
    body: "Do not expose passwords, API keys, private records, personal contact information, or confidential datasets in repositories, presentations, or demonstrations. Use authorized data and minimize personal information.",
  },
  {
    title: "Security and ethical conduct",
    body: "Do not access systems or data without authorization, conduct harmful security testing, or build features intended to facilitate abuse, discrimination, or unlawful surveillance.",
  },
  {
    title: "Project submission",
    body: "Follow the published submission format, deadline, repository or demo requirements, and documentation instructions. A submission is not complete until all required materials have been received through the designated channel.",
  },
  {
    title: "Team conduct",
    body: "Treat other participants, speakers, organizers, and judges respectfully. Harassment, impersonation, fraudulent submissions, and deliberate disruption may lead to review or disqualification.",
  },
  {
    title: "Judging and evaluation",
    body: "Projects should explain the problem, intended users, innovation, implementation, user experience, potential civic impact, scalability, and presentation. Final criteria and weightings must be published by the organizers.",
  },
  {
    title: "Changes and disqualification",
    body: "The organizers may clarify requirements or address unforeseen circumstances. Any final changes to eligibility, deadlines, prizes, or disqualification procedures should be communicated through official channels.",
  },
];

const judgingCriteria = [
  { name: "Problem relevance", weight: "20%" },
  { name: "Innovation", weight: "20%" },
  { name: "Technical implementation", weight: "20%" },
  { name: "User experience", weight: "10%" },
  { name: "Civic and social impact", weight: "15%" },
  { name: "Scalability", weight: "10%" },
  { name: "Presentation", weight: "5%" },
];

export default function RulesPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Read before participating"
        title="Participation Rules and Judging"
        description="These draft guidelines outline responsible participation. Final eligibility requirements, deadlines, and judging policies must be confirmed by the organizers before launch."
      />

      <section className="page-content">
        <div className="container">
          {rules.map((rule, index) => (
            <article className="content-block" key={rule.title}>
              <span className="rule-number">{String(index + 1).padStart(2, "0")}</span>
              <h2 style={{ marginTop: 12 }}>{rule.title}</h2>
              <p>{rule.body}</p>
            </article>
          ))}

          <div className="content-block">
            <h2>Proposed judging criteria</h2>
            <p>
              The following weights total 100% and are a proposed starting
              point. They should not be treated as final until approved and
              published by the organizing team.
            </p>

            <div className="page-grid">
              {judgingCriteria.map((criterion) => (
                <div
                  key={criterion.name}
                  className="glass-card page-card"
                >
                  <h3>{criterion.name}</h3>
                  <p>{criterion.weight} proposed weighting</p>
                </div>
              ))}
            </div>
          </div>

          <div className="page-callout">
            <h3>Need clarification?</h3>
            <p>
              Contact the organizing team before submitting if you are
              unsure about eligibility, permitted tools, project ownership,
              or submission requirements.
            </p>
            <a className="btn btn-primary" href="/contact" style={{ marginTop: 18 }}>
              Contact Organizers
            </a>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
