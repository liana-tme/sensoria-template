/*
 * Article page content (/journal/<slug>): the parts that are the same on every article.
 * Each article's own texts and pictures are files in src/content/journal/.
 */
export type ArticleContent = {
  /** Tag beside the article text. */
  tag: string;
  /** "More insights" block under the article: tag, heading, how many other articles. */
  more: { tag: string; heading: string; count: number };
};

export const articleContent: ArticleContent = {
  tag: "[Journal]",
  more: { tag: "[Explore]", heading: "More Insights", count: 2 },
};
