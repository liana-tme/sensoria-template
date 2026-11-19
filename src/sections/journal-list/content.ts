/*
 * Journal list content (/journal): everything the owner can change.
 * The articles themselves are files in src/content/journal/ (see the README there).
 */
export type JournalListContent = {
  /** Page title and description for search engines and link previews (articles reuse the description). */
  meta: { title: string; description: string };
  /** Page heading: white part + softer part. Shown in capitals. */
  heading: { text: string; muted: string };
  /** How many articles show at first; the button shows this many more each time. */
  pageSize: number;
  /** Button under the cards, shown only when there are more articles. */
  loadMore: string;
};

export const journalListContent: JournalListContent = {
  meta: {
    title: "Sensoria — Research Journal",
    description:
      "Technical deep dives into neural accuracy benchmarks, climate-adaptive diagnostics, and the engineering of real-time dermal mapping systems.",
  },
  heading: { text: "Journal ", muted: "Research insights" },
  pageSize: 6,
  loadMore: "Load More",
};
