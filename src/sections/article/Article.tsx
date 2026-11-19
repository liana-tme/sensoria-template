/*
 * Article: heading, author + intro, a parallax banner,
 * then tag column + the article text (Markdown -> styles in src/lib/journal.ts).
 * - Desktop & tablet: author (photo, name, role) in column 1 at the bottom of the intro row,
 *   intro in columns 2–4. Phone: author above the intro.
 */
import Image from "next/image";
import { ParallaxImage } from "@/components/ParallaxImage/ParallaxImage";
import { Tag } from "@/components/Tag/Tag";
import { renderBody, type JournalPost } from "@/lib/journal";
import type { ArticleContent } from "./content";

export function Article({ post, content }: { post: JournalPost; content: ArticleContent }) {
  return (
    <section className="mx-auto max-w-section px-section-x pt-page-top pb-section-y">
      <article className="flex flex-col gap-section-gap">
        <h1 className="max-w-article-title type-h2">{post.title}</h1>
        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <div className="flex flex-col justify-end gap-md">
            <Image src={post.authorImage} alt={post.author} width={96} height={96} className="size-avatar-author rounded-full object-cover" />
            <div className="flex flex-col gap-name-gap">
              <p className="max-w-author-text type-body-lg-bold">{post.author}</p>
              <p className="max-w-author-text type-body-bold opacity-80">{post.authorRole}</p>
            </div>
          </div>
          <p className="max-w-heading type-h5 md:col-span-3">{post.intro}</p>
        </div>
        <ParallaxImage src={post.banner} alt={post.bannerAlt} sizes="(width >= 1320px) 1240px, 100vw" priority className="aspect-landscape w-full rounded-card" />
        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <div>
            <Tag label={content.tag} />
          </div>
          <div className="max-w-article-body md:col-span-3" dangerouslySetInnerHTML={{ __html: renderBody(post) }} />
        </div>
      </article>
    </section>
  );
}
