/*
 * Shared reader for the Markdown "CMS" files (blog articles, legal documents):
 * fields between the two "---" lines at the top, then the text.
 * HTML comments in the text (notes for the buyer) are dropped.
 */
export function parseFile<F extends string>(
  raw: string,
  fields: readonly F[],
  label: string,
): { meta: Record<F, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`${label} must start with fields between two "---" lines`);
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const at = line.indexOf(":");
    if (at > 0) meta[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  for (const field of fields) {
    if (!meta[field]) throw new Error(`${label} is missing "${field}"`);
  }
  return { meta: meta as Record<F, string>, body: match[2].replace(/<!--[\s\S]*?-->/g, "").trim() };
}
