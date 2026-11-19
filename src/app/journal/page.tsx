/*
 * /journal — the article list. Articles are Markdown files in src/content/journal/.
 */
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import { getPosts } from "@/lib/journal";
import { Footer } from "@/sections/footer/Footer";
import { footerContent } from "@/sections/footer/content";
import { GetStarted } from "@/sections/get-started/GetStarted";
import { getStartedContent } from "@/sections/get-started/content";
import { JournalList } from "@/sections/journal-list/JournalList";
import { journalListContent } from "@/sections/journal-list/content";
import { Navigation } from "@/sections/navigation/Navigation";
import { navigationContent } from "@/sections/navigation/content";

const { title, description } = journalListContent.meta;

export const metadata: Metadata = pageMetadata(title, description);

export default function JournalPage() {
  return (
    <>
      <Navigation content={navigationContent} />
      <main>
        <JournalList content={journalListContent} posts={getPosts()} />
        <GetStarted content={getStartedContent} id="get-started" />
      </main>
      <Footer content={footerContent} />
    </>
  );
}
