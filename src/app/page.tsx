
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import Hero from "@/components/home/hero";
import Stats from "@/components/home/stats";
import AboutSection from "@/components/home/about-section";
import TracksSection from "@/components/home/tracks-section";
import JourneySection from "@/components/home/journey-section";
import WorkshopsSection from "@/components/home/workshops-section";
import BenefitsSection from "@/components/home/benefits-section";
import SponsorsSection from "@/components/home/sponsors-section";
import SpeakersSection from "@/components/home/speakers-section";
import FinalCTA from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <AboutSection />
        <TracksSection />
        <JourneySection />
        <WorkshopsSection />
        <BenefitsSection />
        <SponsorsSection />
        <SpeakersSection />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
