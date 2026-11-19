/*
 * /careers — open positions. Jobs are Markdown files in src/content/careers/.
 */
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import { getJobs } from "@/lib/careers";
import { CareersList } from "@/sections/careers-list/CareersList";
import { careersListContent } from "@/sections/careers-list/content";
import { Footer } from "@/sections/footer/Footer";
import { footerContent } from "@/sections/footer/content";
import { GetStarted } from "@/sections/get-started/GetStarted";
import { getStartedContent } from "@/sections/get-started/content";
import { Navigation } from "@/sections/navigation/Navigation";
import { navigationContent } from "@/sections/navigation/content";
import { Principles } from "@/sections/principles/Principles";
import { standardsContent } from "@/sections/standards/content";

const { title, description } = careersListContent.meta;

export const metadata: Metadata = pageMetadata(title, description);

export default function CareersPage() {
  return (
    <>
      <Navigation content={navigationContent} />
      <main>
        <CareersList content={careersListContent} jobs={getJobs()} />
        <Principles content={standardsContent} id="values" equalRows={false} />
        <GetStarted content={getStartedContent} id="get-started" />
      </main>
      <Footer content={footerContent} />
    </>
  );
}
