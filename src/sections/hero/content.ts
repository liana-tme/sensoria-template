/*
 * Hero content: everything the owner can change.
 * Layout, spacing, colours and motion live in Hero.tsx and tokens.css.
 */
export type HeroContent = {
  /** Full-screen photo. Keep the subject in the centre: on a phone only the middle is visible. */
  image: { src: string; alt: string };
  /** Short paragraph above the title (its first line starts indented). */
  lead: string;
  /** Line right above the big title. */
  subtitle: string;
  /** The big title (shown in capitals). The page's main heading. */
  title: string;
  /** Vertical mark on the right edge: text before and after the small ruler. */
  mark: { before: string; after: string };
};

export const heroContent: HeroContent = {
  image: {
    src: "/images/hero/portrait-light.webp",
    alt: "Portrait of a woman with glowing skin, surrounded by colourful diffused light.",
  },
  lead: "No more skin guessing. No more random products. Just a smart AI tool that helps your natural beauty shine.",
  subtitle: "Intelligent neuro-beauty",
  title: "Sensoria",
  mark: { before: "© 2026", after: "18'" },
};
