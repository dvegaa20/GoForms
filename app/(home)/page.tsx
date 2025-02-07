import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Cta from "@/components/landing/Cta";
import Footer from "@/components/landing/Footer";
import Features from "@/components/landing/Features";
import { AuroraBackground } from "@/components/ui/aurora-background";
import AccessDenied from "@/components/AccessDenied";

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex flex-col">
      {error ? (
        <AccessDenied />
      ) : (
        <>
          <Header />
          <main className="flex-1 flex flex-col items-center">
            <AuroraBackground>
              <Hero />
              <Features />
              <Cta />
            </AuroraBackground>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
