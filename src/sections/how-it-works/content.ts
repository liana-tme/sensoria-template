/*
 * How it Works content (Home): everything the owner can change.
 * Layout, spacing and colours live in HowItWorks.tsx and tokens.css.
 */
export type HowItWorksContent = {
  /** Eyebrow label left of the heading. */
  tag: string;
  /** Heading: the first part is white, the second part softer. Shown in capitals. */
  heading: { text: string; muted: string };
  /** Photo beside (desktop) or above (tablet, phone) the steps. */
  image: { src: string; alt: string };
  /** Four steps: number, title, one sentence. */
  steps: { number: string; title: string; text: string }[];
  /** The white button under the steps. */
  action: { label: string; href: string };
};

export const howItWorksContent: HowItWorksContent = {
  tag: "[How it Works]",
  heading: { text: "Simple Steps", muted: "Smart Results" },
  image: {
    src: "/images/how-it-works/serum-dropper.png",
    alt: "Close-up of a woman applying a drop of golden serum with a pipette.",
  },
  steps: [
    { number: "01", title: "Neural Scan", text: "Our AI analyzes 100,000 dermal points to map your unique skin markers." },
    { number: "02", title: "Data Decode", text: "We process environmental factors like humidity, UV, and stress levels in real-time." },
    { number: "03", title: "Custom Ritual", text: "Receive a tailored skincare routine designed specifically for your biology." },
    { number: "04", title: "Live Sync", text: "The system continuously monitors changes and updates your daily formula." },
  ],
  action: { label: "Try Sensoria", href: "/#pricing" },
};
