import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Cta from "@/components/landing/Cta";
import Footer from "@/components/landing/Footer";
import Features from "@/components/landing/Features";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default async function LandingPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center">
        <AuroraBackground>
          <Hero />
          <Features />
          <Cta />
        </AuroraBackground>
      </main>
      <Footer />
    </div>
  );
}
