
import Link from "next/link";
import {
  Accessibility, Building2, GraduationCap, HeartPulse, Landmark,
  Leaf, MonitorCog, ShieldCheck, Sprout, Lightbulb,
} from "lucide-react";
import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";
import GlassCard from "@/components/ui/glass-card";
import { allTrackNames, tracks } from "@/lib/site";

const descriptions: Record<string, string> = {
  "AI for Civic Innovation": "Develop AI-enabled approaches to public challenges and community needs.",
  "Smart Cities": "Explore urban mobility, infrastructure, and connected public services.",
  GovTech: "Improve access to public services through thoughtful digital tools.",
  Education: "Support learning access, student services, and educational inclusion.",
  Healthcare: "Explore health awareness, service navigation, and responsible health technology.",
  Environment: "Address pollution, waste, conservation, and environmental awareness.",
  Accessibility: "Design inclusive experiences for people with diverse needs and abilities.",
  Agriculture: "Explore practical technology for farmers, agricultural information, and food systems.",
  "Public Safety": "Consider responsible tools for safety awareness, preparedness, and public information.",
  "Open Innovation": "Propose an original civic solution that does not fit another track.",
};

const icons = [
  Landmark, Building2, MonitorCog, GraduationCap, HeartPulse,
  Leaf, Accessibility, Sprout, ShieldCheck, Lightbulb,
];

export default function TracksPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Explore the challenge areas"
        title="Find Your Civic Challenge"
        description="Choose a problem area that interests you, research its real needs, and develop a responsible technology-based solution."
      />

      <section className="page-content">
        <div className="container">
          <div className="page-grid">
            {allTrackNames.map((name, index) => {
              const Icon = icons[index];
              const featured = tracks.some((track) => track.title === name);

              return (
                <GlassCard className="page-card" key={name}>
                  <span className="icon-tile"><Icon size={24} /></span>
                  {featured && <span className="tier-label">Featured track</span>}
                  <h3>{name}</h3>
                  <p>{descriptions[name]}</p>
                  <div className="page-card-footer">
                    <Link href="/apply" className="card-link">Choose this track →</Link>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <div className="page-callout">
            <h3>Choose a problem, not just a technology</h3>
            <p>
              Your application should explain the problem you want to solve,
              who experiences it, and how your proposed solution could help.
              Track availability and final eligibility remain subject to
              the official event rules.
            </p>
            <div className="section-action">
              <Link href="/apply" className="btn btn-primary">Start Application</Link>
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
