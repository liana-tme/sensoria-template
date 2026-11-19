/*
 * /journal/<slug> — one article. Every article file becomes a page at build time
 * (generateStaticParams); an unknown address shows the 404 page.
 */
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/journal";
import { Article } from "@/sections/article/Article";
import { MoreInsights } from "@/sections/article/MoreInsights";
import { articleContent } from "@/sections/article/content";
import { Footer } from "@/sections/footer/Footer";
import { footerContent } from "@/sections/footer/content";
import { GetStarted } from "@/sections/get-started/GetStarted";
import { getStartedContent } from "@/sections/get-started/content";
import { Navigation } from "@/sections/navigation/Navigation";
import { navigationContent } from "@/sections/navigation/content";
import { journalListContent } from "@/sections/journal-list/content";

// Every article is prerendered from generateStaticParams, so the page may wait for its slug.
export const instant = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const title = `${post.title} - Sensoria`;
  const journalDescription = journalListContent.meta.description;
  return pageMetadata(title, journalDescription, post.banner);
}

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const others = getPosts()
    .filter((other) => other.slug !== post.slug)
    .slice(0, articleContent.more.count);

  return (
    <>
      <Navigation content={navigationContent} />
      <main>
        <Article post={post} content={articleContent} />
        <MoreInsights content={articleContent.more} posts={others} />
        <GetStarted content={getStartedContent} id="get-started" />
      </main>
      <Footer content={footerContent} />
    </>
  );
}
