/*
 * /legal/<slug> — Privacy Policy, Terms of Service. Every file in src/content/legal/ becomes
 * a page at build time; an unknown address shows the 404 page.
 */
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import { notFound } from "next/navigation";
import { getLegalDoc, getLegalDocs } from "@/lib/legal";
import { Footer } from "@/sections/footer/Footer";
import { footerContent } from "@/sections/footer/content";
import { GetStarted } from "@/sections/get-started/GetStarted";
import { getStartedContent } from "@/sections/get-started/content";
import { Legal } from "@/sections/legal/Legal";
import { legalContent } from "@/sections/legal/content";
import { Navigation } from "@/sections/navigation/Navigation";
import { navigationContent } from "@/sections/navigation/content";

// Every document is prerendered from generateStaticParams, so the page may wait for its slug.
export const instant = false;

export function generateStaticParams() {
  return getLegalDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const doc = getLegalDoc((await params).slug);
  if (!doc) return {};
  const title = `${doc.title} - Sensoria`;
  const { description } = legalContent;
  return pageMetadata(title, description);
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const doc = getLegalDoc((await params).slug);
  if (!doc) notFound();
  return (
    <>
      <Navigation content={navigationContent} />
      <main>
        <Legal doc={doc} content={legalContent} />
        <GetStarted content={getStartedContent} id="get-started" />
      </main>
      <Footer content={footerContent} />
    </>
  );
}
