/*
 * More Insights: tag column + heading (words rise in),
 * then other articles as small cards: 2 in a row on desktop, stacked on tablet and phone.
 * The cards rise in together (Reveal "cards").
 */
import { PostCard } from "@/components/PostCard/PostCard";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import { WordReveal } from "@/components/WordReveal/WordReveal";
import type { JournalPost } from "@/lib/journal";
import type { ArticleContent } from "./content";

export function MoreInsights({ content, posts }: { content: ArticleContent["more"]; posts: JournalPost[] }) {
  return (
    <section className="mx-auto max-w-section px-section-x py-section-y">
      <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
        <div>
          <Tag label={content.tag} />
        </div>
        <div className="flex flex-col gap-section-gap md:col-span-3">
          <h2 className="max-w-heading type-h2">
            <WordReveal parts={[{ text: content.heading }]} />
          </h2>
          <Reveal kind="cards">
            <div className="grid gap-grid-gap lg:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} sizes="(width >= 1200px) 35vw, (width >= 810px) 70vw, 100vw" />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
