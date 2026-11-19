/*
 * No orphan words: the last two words of a text are kept on one line
 * (they can't be split, not even at a hyphen), so a text never ends
 * with a single lonely word or word part.
 */
const lastTwo = /(\S+ \S+)(\s*)$/;

/**
 * For HTML strings (article and legal text). Only text between tags is touched:
 *  - if the last text piece ends with two words, they go into a no-wrap span;
 *  - if the last words are split by tags (bold, link), the space before the
 *    last word becomes a no-break space.
 */
export function noOrphanHtml(html: string): string {
  const parts = html.split(/(<[^>]*>)/); // even indexes: text, odd: tags
  for (let i = parts.length - 1; i >= 0; i -= 1) {
    if (i % 2 === 1 || !parts[i].includes(" ")) continue;
    const text = parts[i];
    // The last word sits in a tag (bold, link): keep it on the line of the word before.
    if (i < parts.length - 1 && /\S $/.test(text)) {
      parts[i] = `${text.slice(0, -1)}\u00a0`;
      return parts.join("");
    }
    const pair = text.match(lastTwo);
    if (pair && pair.index !== undefined) {
      parts[i] = `${text.slice(0, pair.index)}<span class="whitespace-nowrap">${pair[1]}</span>${pair[2]}`;
    } else {
      const space = text.lastIndexOf(" ", text.trimEnd().length === text.length ? undefined : text.trimEnd().length);
      parts[i] = `${text.slice(0, space)}\u00a0${text.slice(space + 1)}`;
    }
    return parts.join("");
  }
  return html;
}

/** For plain text: [everything before, the last two words]. */
export function splitLastTwo(text: string): [string, string] {
  const words = text.trim().split(" ");
  if (words.length < 3) return ["", text];
  return [`${words.slice(0, -2).join(" ")} `, words.slice(-2).join(" ")];
}
