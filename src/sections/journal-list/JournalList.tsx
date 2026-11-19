/*
 * Journal list: page heading, then article cards in 2 columns
 * (phone: 1). Desktop cards are the large kind. `pageSize` cards show first; "Load More"
 * appears only when there are more and shows the next ones.
 */
import type { JournalPost } from "@/lib/journal";
import type { JournalListContent } from "./content";
import { JournalGrid } from "./JournalGrid";

export function JournalList({ content, posts }: { content: JournalListContent; posts: JournalPost[] }) {
  return (
    <section className="mx-auto max-w-section px-section-x pt-page-top pb-section-y">
      <div className="flex flex-col gap-section-gap">
        <h1 className="max-w-heading type-h2">
          {content.heading.text}
          <span className="text-text-secondary">{content.heading.muted}</span>
        </h1>
        <JournalGrid posts={posts} pageSize={content.pageSize} loadMore={content.loadMore} />
      </div>
    </section>
  );
}
