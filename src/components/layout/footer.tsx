
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { navigationLinks, siteConfig } from "@/lib/site";

function LinkedInIcon({
  size = 18,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-6a2 2 0 0 0-4 0v6h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({
  size = 18,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand-column">
            <Link href="/" className="brand footer-brand">
              <Image
                className="brand-mark"
                src="/images/logo.svg"
                alt="AI for Civic Solutions"
                width={43}
                height={43}
              />

              <span className="brand-copy">
                <strong>AI for Civic Solutions</strong>
                <small>2026 · By CODELOGIX Solutions</small>
              </span>
            </Link>

            <p className="footer-description">
              Bringing people and technology together to explore practical
              AI-powered solutions for civic challenges.
            </p>

            <div className="footer-socials">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="CODELOGIX Solutions on LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>

              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="CODELOGIX Solutions on Instagram"
              >
                <InstagramIcon size={18} />
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email the organizing team"
              >
                <Mail size={18} />
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                aria-label={`Call ${siteConfig.phone}`}
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div className="footer-links-column">
            <h3>Explore</h3>
            {navigationLinks.slice(0, 5).map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="footer-links-column">
            <h3>Information</h3>
            {navigationLinks.slice(5).map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/check-status">Check Status</Link>
          </div>

          <div className="footer-status-column">
            <h3>Applications</h3>

            <span className="application-status">
              <span />
              Applications Open
            </span>

            <p>
              Check the official timeline and application page for current
              instructions and confirmed deadlines.
            </p>

            <Link href="/apply" className="footer-apply-link">
              Start your application <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 {siteConfig.organizer}. All rights
            reserved.
          </p>

          <a href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
