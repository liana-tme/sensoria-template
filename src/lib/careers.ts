/*
 * Careers CMS: one Markdown file per job in src/content/careers/<slug>.md.
 * The file name is the job address (/careers/<slug>). Fields sit between the two "---" lines
 * (same fields as the Careers collection); the full job text follows in Markdown.
 * Read at build time only (static site). Jobs are listed by `order`.
 */
import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import { parseFile } from "./markdown";
import { noOrphanHtml } from "./text";

export type Job = {
  slug: string;
  title: string;
  /** Position in the list (1 = first). */
  order: string;
  type: string;
  salary: string;
  location: string;
  /** Short "About the role" text (job card and the top of the job page). */
  about: string;
  /** Full job text as Markdown. */
  body: string;
};

const folder = path.join(process.cwd(), "src/content/careers");
const fields = ["title", "order", "type", "salary", "location", "about"] as const;

function read(file: string): Job {
  const raw = fs.readFileSync(path.join(folder, file), "utf8");
  const { meta, body } = parseFile(raw, fields, `Careers: ${file}`);
  return { slug: file.replace(/\.md$/, ""), ...meta, body };
}

/** All jobs in list order. */
export function getJobs(): Job[] {
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".md") && file !== "README.md")
    .map(read)
    .sort((a, b) => Number(a.order) - Number(b.order));
}

export function getJob(slug: string): Job | undefined {
  return getJobs().find((job) => job.slug === slug);
}

/*
 * Job text -> HTML with Sensoria text styles (same look as the original job page):
 * ### section heading (H6 style), paragraphs (Body Large), bullet / numbered lists.
 */
const job = new Marked({
  renderer: {
    heading({ tokens }) {
      return `<h3 class="type-h6 mt-article-heading first:mt-0">${this.parser.parseInline(tokens)}</h3>`;
    },
    paragraph({ tokens }) {
      return `<p class="type-body-lg mt-article-p first:mt-0">${noOrphanHtml(this.parser.parseInline(tokens))}</p>`;
    },
    list(token) {
      const tag = token.ordered ? "ol" : "ul";
      const items = token.items
        .map((item) => {
          const inline = this.parser.parseInline(item.tokens.flatMap((t) => ("tokens" in t && t.tokens ? t.tokens : [t])));
          return `<li class="relative type-body-lg pl-list-indent">${noOrphanHtml(inline)}</li>`;
        })
        .join("");
      return `<${tag} class="article-list mt-article-list">${items}</${tag}>`;
    },
  },
});

/** Job text turned into styled HTML. */
export function renderJob(item: Job): string {
  return job.parse(item.body, { async: false });
}
