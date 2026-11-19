/*
 * Vision content (About page): everything the owner can change.
 * Layout, spacing, colours and motion live in Vision.tsx and tokens.css.
 */
export type VisionContent = {
  tag: string;
  quote: string;
  author: { name: string; role: string };
  /** Full-screen photo behind the quote (moves slowly while scrolling). */
  image: { src: string; alt: string };
};

export const visionContent: VisionContent = {
  tag: "Vision",
  quote: "“Sensoria uses neural mapping to replace generic beauty trends with a clear, data-driven roadmap for your skin health every single day.”",
  author: { name: "Alexandra Jensen", role: "Founder of Sensoria" },
  image: { src: "/images/vision/portrait-flowers-motion.png", alt: "Woman among flowers in soft motion blur." },
};
