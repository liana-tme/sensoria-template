/*
 * Results content (Home): everything the owner can change.
 * Layout, spacing, colours and motion live in Results.tsx and tokens.css.
 */
export type ResultsContent = {
  /** Eyebrow label left of the heading. */
  tag: string;
  /** Heading: a white first line and an accent second line. Shown in capitals. */
  heading: { text: string; accent: string };
  /** Left card: title, a short quote, and the button under the card. */
  highlight: { title: string; quote: string; action: { label: string; href: string } };
  /** Middle: a customer review. Bright part of the text is white, the rest softer. */
  review: {
    name: string;
    role: string;
    avatar: string;
    text: { text: string; bright?: boolean }[];
    metric: { label: string; value: string };
  };
  /** Right: before / after photos with a draggable divider. */
  compare: {
    before: { src: string; alt: string };
    after: { src: string; alt: string };
    labels: { before: string; after: string };
  };
};

export const resultsContent: ResultsContent = {
  tag: "[Results]",
  heading: { text: "Visible", accent: "[in 7 days]" },
  highlight: {
    title: "Visible Progress",
    quote: "“Thanks to the redesign, we've seen a steady 60% increase in leads.”",
    action: { label: "The Approach", href: "/about" },
  },
  review: {
    name: "Mira Rossi",
    role: "Verified User",
    avatar: "/images/about/portrait-lilies.png",
    text: [
      { text: "Just 7 days and my skin looks better than ever. ", bright: true },
      { text: "It's smooth, healthy, and has such a natural glow." },
    ],
    metric: { label: "Vitality index:", value: "82% → 96%" },
  },
  compare: {
    before: { src: "/images/results/skin-before.png", alt: "Before: portrait of a model with short curly hair and smooth, even-toned skin." },
    after: { src: "/images/results/skin-after.png", alt: "After: close-up of a smiling model's clear, radiant skin." },
    labels: { before: "Before", after: "After" },
  },
};
