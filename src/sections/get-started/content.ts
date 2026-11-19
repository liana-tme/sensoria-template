/*
 * Get Started content (above the footer on every page): everything the owner can change.
 * Layout, spacing, colours and motion live in GetStarted.tsx and tokens.css.
 */
export type GetStartedContent = {
  /** Words in the accent strip that drifts across the screen. */
  strip: string[];
  /** Heading: white part + softer part. Shown in capitals. */
  heading: { text: string; muted: string };
  /** Portrait video beside the form (muted, looping). No file = the poster only. */
  video: { src: string; poster: string; alt: string };
  /** Line above the form: bright parts white, the rest softer. */
  intro: { text: string; bright?: boolean }[];
  form: {
    /**
     * Address from your form service (Formspree, Basin, Getform…): it receives the messages.
     * Empty = the button opens the visitor's e-mail app with a message to `fallbackEmail`.
     */
    action: string;
    fallbackEmail: string;
    subject: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    button: { idle: string; success: string; prepared: string; error: string };
    /** Small note under the button, with a link. */
    note: { text: string; link: { label: string; href: string } };
  };
};

export const getStartedContent: GetStartedContent = {
  strip: ["SENSORIA", "NEURAL MAPPING", "INTELLIGENT BEAUTY", "VITALITY INDEX", "BIOMETRIC SYNC", "7-DAY RESULTS", "DERMAL ANALYSIS", "CLIMATE ADAPTIVE"],
  heading: { text: "Start scanning ", muted: "your skin today" },
  video: {
    src: "/videos/routine-portrait.mp4",
    poster: "/images/get-started/portrait-blonde.webp",
    alt: "Front-view beauty portrait of a woman with soft blonde hair and glowing skin.",
  },
  intro: [
    { text: "Share your current skincare routine with us, and" },
    { text: " our AI-engine will send you a personalized optimization report ", bright: true },
    { text: "within 24 hours." },
  ],
  form: {
    action: "",
    fallbackEmail: "hello@sensoria.com",
    subject: "My skincare routine",
    fields: {
      name: { label: "Name *", placeholder: "Aria Belmont" },
      email: { label: "Email *", placeholder: "aria@gmail.com" },
      message: { label: "Your Routine", placeholder: "List the products you use daily..." },
    },
    button: { idle: "Get feedback", success: "Thanks!", prepared: "Opened in your email app", error: "Try again" },
    note: { text: "No spam. No data shared. → ", link: { label: "Privacy Policy", href: "/legal/privacy-policy" } },
  },
};
