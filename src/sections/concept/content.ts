/*
 * Concept content (Home): everything the owner can change.
 * Layout, spacing, colours and motion live in Concept.tsx and tokens.css.
 */
export type ConceptContent = {
  /** Eyebrow label above the title (white on the accent panel). */
  tag: string;
  /** Big title in the accent panel (shown in capitals). */
  title: string;
  /** The white button under the title. */
  action: { label: string; href: string };
  /**
   * Five photos for the grid, placed like an X: top-left, bottom-left, centre, top-right, bottom-right.
   * On phones the right column is hidden (the first three show).
   */
  images: { src: string; alt: string }[];
};

export const conceptContent: ConceptContent = {
  tag: "[Concept]",
  title: "Intelligent Beauty",
  action: { label: "Get Started", href: "/#pricing" },
  images: [
    { src: "/images/concept/portrait-pastel-tulle.png", alt: "Woman with her hair up among soft pastel tulle." },
    { src: "/images/concept/portrait-golden-blur.png", alt: "Woman in yellow behind a blur of pink and golden light." },
    { src: "/images/concept/portrait-neon-light.png", alt: "Close-up of a face lit by pink and teal neon light." },
    { src: "/images/concept/portrait-soft-motion.png", alt: "Woman with glossy lips captured in soft motion blur." },
    { src: "/images/concept/portrait-violet-light.png", alt: "Young woman in a white dress against violet light." },
  ],
};
