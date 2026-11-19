/*
 * Careers page content (/careers): everything the owner can change.
 * The jobs themselves are files in src/content/careers/ (see the README there).
 */
export type CareersListContent = {
  /** Page title and description for search engines and link previews. */
  meta: { title: string; description: string };
  /** Page heading: white part + softer part. Shown in capitals. */
  heading: { text: string; muted: string };
  tag: string;
  /** Line beside the tag: softer part first, then white. */
  intro: { muted: string; text: string };
  /** Job card labels. */
  labels: { type: string; salary: string; location: string; about: string; apply: string; open: string };
};

export const careersListContent: CareersListContent = {
  meta: {
    title: "Sensoria — Careers",
    description:
      "Explore open positions at Sensoria. We are looking for systems architects and data scientists to build the future of autonomous biometric analysis.",
  },
  heading: { text: "We are hiring ", muted: "Creative people" },
  tag: "[Careers]",
  intro: { muted: "Sensoria is a remote-first lab ", text: "building the first neural engine for autonomous skin health." },
  labels: { type: "Type", salary: "Salary", location: "Location", about: "About the role", apply: "Apply Now", open: "Show details" },
};
