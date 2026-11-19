/*
 * Analysis content (Home): everything the owner can change.
 * Layout, spacing, colours and motion live in Analysis.tsx and tokens.css.
 */
export type AnalysisContent = {
  /** Eyebrow label left of the heading. */
  tag: string;
  /** Section heading (shown in capitals). */
  heading: string;
  /** The video card. `video` is a file in public/videos/; empty = poster only, no play button. */
  video: { src: string; poster: string; alt: string; label: string };
  /** Three big numbers that count up from `from` to `to` after the page loads. */
  stats: { from: number; to: number; suffix: string; label: string }[];
  /** Paragraph next to the numbers: bright parts are white, the rest softer. */
  text: { text: string; bright?: boolean }[];
};

export const analysisContent: AnalysisContent = {
  tag: "[Analysis]",
  heading: "Intelligence",
  video: {
    src: "/videos/skin-analysis.mp4",
    poster: "/images/analysis/portrait-motion-blur.png",
    alt: "Portrait of a woman with healthy glowing skin, framed by colourful motion blur.",
    label: "how Sensoria analyses your skin",
  },
  stats: [
    { from: 94, to: 98, suffix: "%", label: "Scan accuracy" },
    { from: 20, to: 24, suffix: "h", label: "Live monitoring" },
    { from: 0, to: 2, suffix: "s", label: "Sync speed" },
  ],
  text: [
    { text: "Our advanced neural engine ", bright: true },
    { text: "processes thousands of data points per scan," },
    { text: " ensuring your skincare rituals are always optimized ", bright: true },
    { text: "for current climate and stress levels." },
  ],
};
