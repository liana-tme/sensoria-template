/*
 * Awards content (About page): everything the owner can change.
 * Layout, spacing, colours and motion live in Awards.tsx and tokens.css.
 */
export type AwardsContent = {
  tag: string;
  /** Heading: white part + softer part. Shown in capitals. */
  heading: { text: string; muted: string };
  /** Short line with the thin plus: white part + softer part. */
  note: { text: string; muted: string };
  /** Rows: who gave it, the award, when. */
  items: { source: string; title: string; date: string }[];
};

export const awardsContent: AwardsContent = {
  tag: "[Awards]",
  heading: { text: "Industry notes ", muted: "Project highlights" },
  note: { text: "A record of our research validation and system benchmarks within ", muted: "the modern skincare ecosystem today." },
  items: [
    { source: "Beauty Tech Forum", title: "Innovation of the Year", date: "June 2025" },
    { source: "Dermatology Review Board", title: "Best clinical integration for AI systems", date: "March 2025" },
    { source: "The Wellness Collective", title: "Most accurate skin mapping tool of the year", date: "October 2024" },
    { source: "Vogue Beauty Tech Awards", title: "Next generation personalized skincare award", date: "February 2024" },
    { source: "Interactive Science Forum", title: "Excellence in human-centered data design", date: "August 2024" },
  ],
};
