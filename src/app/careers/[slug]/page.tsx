/*
 * /careers/<slug> — one job with the application form. Every job file becomes a page at build
 * time (generateStaticParams); an unknown address shows the 404 page.
 */
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import { notFound } from "next/navigation";
import { getJob, getJobs } from "@/lib/careers";
import { careersListContent } from "@/sections/careers-list/content";
import { Footer } from "@/sections/footer/Footer";
import { footerContent } from "@/sections/footer/content";
import { GetStarted } from "@/sections/get-started/GetStarted";
import { getStartedContent } from "@/sections/get-started/content";
import { JobApply } from "@/sections/job/JobApply";
import { JobPosition } from "@/sections/job/JobPosition";
import { jobContent } from "@/sections/job/content";
import { Navigation } from "@/sections/navigation/Navigation";
import { navigationContent } from "@/sections/navigation/content";
import { Principles } from "@/sections/principles/Principles";
import { standardsContent } from "@/sections/standards/content";

// Every job is prerendered from generateStaticParams, so the page may wait for its slug.
export const instant = false;

export function generateStaticParams() {
  return getJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const job = getJob((await params).slug);
  if (!job) return {};
  const title = `${job.title} - Sensoria`;
  const { description } = careersListContent.meta;
  return pageMetadata(title, description);
}

export default async function JobPage({ params }: PageProps<"/careers/[slug]">) {
  const job = getJob((await params).slug);
  if (!job) notFound();
  return (
    <>
      <Navigation content={navigationContent} />
      <main>
        <JobPosition job={job} content={jobContent} labels={careersListContent.labels} />
        <JobApply apply={jobContent.apply} position={job.title} />
        <Principles content={standardsContent} id="values" />
        <GetStarted content={getStartedContent} id="get-started" />
      </main>
      <Footer content={footerContent} />
    </>
  );
}
