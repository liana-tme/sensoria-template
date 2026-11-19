/*
 * Home: the Sensoria landing, sections in page order.
 * Each section's texts and pictures live in its own content.ts.
 */
import { About } from "@/sections/about/About";
import { aboutContent } from "@/sections/about/content";
import { Analysis } from "@/sections/analysis/Analysis";
import { analysisContent } from "@/sections/analysis/content";
import { Concept } from "@/sections/concept/Concept";
import { conceptContent } from "@/sections/concept/content";
import { Faq } from "@/sections/faq/Faq";
import { footerContent } from "@/sections/footer/content";
import { Footer } from "@/sections/footer/Footer";
import { getStartedContent } from "@/sections/get-started/content";
import { GetStarted } from "@/sections/get-started/GetStarted";
import { faqContent } from "@/sections/faq/content";
import { Hero } from "@/sections/hero/Hero";
import { HowItWorks } from "@/sections/how-it-works/HowItWorks";
import { howItWorksContent } from "@/sections/how-it-works/content";
import { heroContent } from "@/sections/hero/content";
import { Navigation } from "@/sections/navigation/Navigation";
import { navigationContent } from "@/sections/navigation/content";
import { Pricing } from "@/sections/pricing/Pricing";
import { pricingContent } from "@/sections/pricing/content";
import { Results } from "@/sections/results/Results";
import { resultsContent } from "@/sections/results/content";
import { Preloader } from "@/sections/preloader/Preloader";
import { preloaderContent } from "@/sections/preloader/content";

export default function Home() {
  return (
    <>
      <Preloader content={preloaderContent} />
      <Navigation content={navigationContent} />
      <main>
        <Hero content={heroContent} />
        <About content={aboutContent} id="about" />
        <Analysis content={analysisContent} id="analysis" />
        <Concept content={conceptContent} id="concept" />
        <HowItWorks content={howItWorksContent} id="how-it-works" />
        <Results content={resultsContent} id="results" />
        <Pricing content={pricingContent} id="pricing" />
        <Faq content={faqContent} id="faq" />
        <GetStarted content={getStartedContent} id="get-started" />
      </main>
      <Footer content={footerContent} />
    </>
  );
}
