import { CTA } from "@/components/landing/cta";
import { FAQ } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Features } from "@/components/landing/features";
import { MeetCortex } from "@/components/landing/meet-cortex";
import { HowBuildApp } from "@/components/landing/how-build-app";
import { DesignSystem } from "@/components/landing/design-system";

export default function Home() {
  return (
    <div>
      <main>
        <Navbar />
        <Hero />
        <MeetCortex />
        <HowBuildApp />
        <DesignSystem />
        <Features />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
