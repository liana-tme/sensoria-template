/*
 * Legal documents: one Markdown file per document in src/content/legal/<slug>.md
 * (/legal/<slug>). Fields: title, date, intro; the text follows in Markdown and is shown
 * in the same look as journal articles. Read at build time only.
 */
import fs from "node:fs";
import path from "node:path";
import { parseFile } from "./markdown";

export type LegalDoc = { slug: string; title: string; date: string; intro: string; body: string };

const folder = path.join(process.cwd(), "src/content/legal");
const fields = ["title", "date", "intro"] as const;

export function getLegalDocs(): LegalDoc[] {
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".md") && file !== "README.md")
    .map((file) => {
      const { meta, body } = parseFile(fs.readFileSync(path.join(folder, file), "utf8"), fields, `Legal: ${file}`);
      return { slug: file.replace(/\.md$/, ""), ...meta, body };
    });
}

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return getLegalDocs().find((doc) => doc.slug === slug);
}
