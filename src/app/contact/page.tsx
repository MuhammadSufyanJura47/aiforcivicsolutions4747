
import { Mail, Phone } from "lucide-react";
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";
import InquiryForm from "@/components/forms/inquiry-forms";
import { siteConfig } from "@/lib/site";

function SocialIcon({
  type,
  size = 21,
}: {
  type: "instagram" | "linkedin";
  size?: number;
}) {
  return type === "instagram" ? (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-6a2 2 0 0 0-4 0v6h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Get in touch"
        title="Let's Talk Civic Innovation"
        description="Contact the organizing team about registration, workshops, sponsorships, speaker applications, or general event questions."
      />

      <section className="page-content">
        <div className="container contact-grid">
          <div>
            <div className="contact-information">
              <div className="contact-item">
                <span className="icon-tile"><Mail size={21} /></span>
                <div>
                  <h3>Email the organizing team</h3>
                  <a href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <span className="icon-tile"><SocialIcon type="linkedin" /></span>
                <div>
                  <h3>LinkedIn</h3>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
                    CODELOGIX Solutions
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <span className="icon-tile"><SocialIcon type="instagram" /></span>
                <div>
                  <h3>Instagram</h3>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
                    @codelogixsolutions
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <span className="icon-tile"><Phone size={21} /></span>
                <div>
                  <h3>Contact number</h3>
                  <a href={`tel:${siteConfig.phone}`}>
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="page-callout">
              <h3>Application support</h3>
              <p>
                For roll-number recovery, email the organizing team with
                the subject “Forgotten Hackathon Roll Number.” Do not
                include passwords, payment PINs, or other sensitive
                credentials in your message.
              </p>
            </div>
          </div>

          <InquiryForm kind="contact" />
        </div>
      </section>
    </PublicPage>
  );
}
