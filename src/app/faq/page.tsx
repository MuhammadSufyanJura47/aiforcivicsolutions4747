
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";

const faqs = [
  {
    question: "Who can participate?",
    answer: "Eligibility conditions will be stated in the official event announcement. Review those requirements before applying.",
  },
  {
    question: "Can I participate alone?",
    answer: "The proposed registration options include solo participation and teams of two to five. Availability is subject to the final registration rules.",
  },
  {
    question: "What are the participation fees?",
    answer: "The proposed fees are PKR 300 for solo participation, PKR 500 for two members, PKR 700 for three, PKR 900 for four, and PKR 1,000 for five. Confirm the final fee schedule before paying.",
  },
  {
    question: "How do I pay the registration fee?",
    answer: "Follow the official application instructions and verify the payment recipient and amount before transferring any funds. The payment workflow will be documented on the application page.",
  },
  {
    question: "How do I check my application status?",
    answer: "Use the Check Status page with the roll number and leader email provided by the organizing team once the registration backend is available.",
  },
  {
    question: "What if I forget my roll number?",
    answer: "Email codelogixsolutions@gmail.com with the subject 'Forgotten Hackathon Roll Number' and ask the organizing team to help retrieve it.",
  },
  {
    question: "Can I change my team after registration?",
    answer: "Team changes should only be made through the process announced by the organizers. Do not submit duplicate applications unless instructed.",
  },
  {
    question: "Will workshops be available to registered participants?",
    answer: "The current plan is to offer hackathon-related workshops to registered participants. Dates, access conditions, and availability must be confirmed in official announcements.",
  },
  {
    question: "Do I need advanced AI knowledge?",
    answer: "You should choose a project appropriate to your skills and be willing to learn. The final eligibility requirements and workshop level will be announced by the organizers.",
  },
  {
    question: "Can I use AI tools to build my project?",
    answer: "AI assistance may be used where permitted by the official rules. You remain responsible for checking outputs, respecting licenses, protecting data, and explaining your contribution.",
  },
  {
    question: "What do I need to submit?",
    answer: "The final submission checklist may include a project description, source repository, demonstration, documentation, and presentation. Follow the published requirements and deadline.",
  },
  {
    question: "How can I apply to become a speaker?",
    answer: "Use the speaker application form on the Speakers page. Submissions are subject to review, and applying does not guarantee selection.",
  },
  {
    question: "How can my organization become a sponsor?",
    answer: "Complete the inquiry form on the Sponsors page with your organization details and proposed contribution. The organizing team will review your proposal.",
  },
  {
    question: "What happens if my application is rejected?",
    answer: "Check any message provided by the organizing team. If you need clarification, contact codelogixsolutions@gmail.com and include your roll number if one was issued.",
  },
  {
    question: "Where will official dates and announcements be published?",
    answer: "Check the official Timeline page and messages from CODELOGIX Solutions. Treat dates marked 'To be announced' as unconfirmed.",
  },
];

export default function FAQPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Need help?"
        title="Frequently Asked Questions"
        description="Find answers about participation, fees, workshops, applications, project submissions, and partnership opportunities."
      />

      <section className="page-content">
        <div className="container">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details className="faq-item" key={faq.question}>
                <summary>
                  {String(index + 1).padStart(2, "0")}. {faq.question}
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="page-callout">
            <h3>Still have a question?</h3>
            <p>
              Contact the organizing team if your question is not covered
              here. Final event policies and dates will be communicated
              through official channels.
            </p>
            <div className="section-action">
              <a className="btn btn-primary" href="/contact">Contact Us</a>
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
