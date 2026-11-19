/*
 * Journal CMS: one Markdown file per article in src/content/journal/<slug>.md.
 * The file name is the article address (/journal/<slug>). Fields sit between the two
 * "---" lines at the top (same fields as the Journal collection); the article
 * text follows in Markdown. Read at build time only (static site). Newest first by `date`.
 */
import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import { parseFile } from "./markdown";
import { noOrphanHtml } from "./text";

export type JournalPost = {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  banner: string;
  bannerAlt: string;
  intro: string;
  author: string;
  authorRole: string;
  authorImage: string;
  /** Article text as Markdown. */
  body: string;
};

const folder = path.join(process.cwd(), "src/content/journal");
const fields = ["title", "date", "banner", "bannerAlt", "intro", "author", "authorRole", "authorImage"] as const;

function read(file: string): JournalPost {
  const raw = fs.readFileSync(path.join(folder, file), "utf8");
  const { meta, body } = parseFile(raw, fields, `Journal: ${file}`);
  return { slug: file.replace(/\.md$/, ""), ...meta, body };
}

/** All articles, newest first. */
export function getPosts(): JournalPost[] {
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".md") && file !== "README.md")
    .map(read)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): JournalPost | undefined {
  return getPosts().find((post) => post.slug === slug);
}

/*
 * Article text -> HTML with Sensoria text styles (same look as the original article):
 * ## section heading (H5 style), paragraphs (Lead), bullet / numbered lists, > quote with an accent bar.
 * Paragraphs, list items and quotes never end with a lone word (noOrphanHtml).
 */
const article = new Marked({
  renderer: {
    heading({ tokens }) {
      return `<h2 class="type-h5 mt-article-heading first:mt-0">${this.parser.parseInline(tokens)}</h2>`;
    },
    paragraph({ tokens }) {
      return `<p class="type-lead mt-article-p first:mt-0">${noOrphanHtml(this.parser.parseInline(tokens))}</p>`;
    },
    list(token) {
      const tag = token.ordered ? "ol" : "ul";
      const items = token.items
        .map((item) => {
          const inline = this.parser.parseInline(item.tokens.flatMap((t) => ("tokens" in t && t.tokens ? t.tokens : [t])));
          return `<li class="relative type-lead pl-list-indent">${noOrphanHtml(inline)}</li>`;
        })
        .join("");
      return `<${tag} class="article-list mt-article-list">${items}</${tag}>`;
    },
    link({ href, tokens }) {
      return `<a href="${href}" class="text-link">${this.parser.parseInline(tokens)}</a>`;
    },
    blockquote({ tokens }) {
      const lines = tokens
        .filter((t) => t.type === "paragraph")
        .map((t) => `<p class="type-quote">${noOrphanHtml(this.parser.parseInline("tokens" in t && t.tokens ? t.tokens : []))}</p>`)
        .join("");
      return `<blockquote class="article-quote relative mt-article-p pl-quote-indent">${lines}</blockquote>`;
    },
  },
});

/** Article text turned into styled HTML. */
export function renderBody(post: JournalPost): string {
  return renderArticle(post.body);
}

/** Any Markdown text in the article look (journal articles and legal documents). */
export function renderArticle(markdown: string): string {
  return article.parse(markdown, { async: false });
}
