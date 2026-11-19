/*
 * About page (/about): the team behind Sensoria, sections in page order.
 * Each section's texts and pictures live in its own content.ts.
 */
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import { AboutIntro } from "@/sections/about-intro/AboutIntro";
import { aboutIntroContent } from "@/sections/about-intro/content";
import { Awards } from "@/sections/awards/Awards";
import { awardsContent } from "@/sections/awards/content";
import { footerContent } from "@/sections/footer/content";
import { Footer } from "@/sections/footer/Footer";
import { getStartedContent } from "@/sections/get-started/content";
import { GetStarted } from "@/sections/get-started/GetStarted";
import { Navigation } from "@/sections/navigation/Navigation";
import { navigationContent } from "@/sections/navigation/content";
import { Principles } from "@/sections/principles/Principles";
import { principlesContent } from "@/sections/principles/content";
import { Team } from "@/sections/team/Team";
import { teamContent } from "@/sections/team/content";
import { Vision } from "@/sections/vision/Vision";
import { visionContent } from "@/sections/vision/content";

const title = "Sensoria — Our Mission";
const description =
  "Discover the technology behind Sensoria. Learn how our team of researchers and engineers is democratizing clinical-grade dermatology through AI.";

export const metadata: Metadata = pageMetadata(title, description);

export default function AboutPage() {
  return (
    <>
      <Navigation content={navigationContent} />
      <main>
        <AboutIntro content={aboutIntroContent} />
        <Team content={teamContent} id="team" />
        <Awards content={awardsContent} id="awards" />
        <Principles content={principlesContent} id="principles" />
        <Vision content={visionContent} id="vision" />
        <GetStarted content={getStartedContent} id="get-started" />
      </main>
      <Footer content={footerContent} />
    </>
  );
}
