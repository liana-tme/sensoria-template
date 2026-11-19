/*
 * FAQ content (Home): everything the owner can change.
 * Layout, spacing, colours and motion live in Faq.tsx, FaqList.tsx and tokens.css.
 */
export type FaqContent = {
  tag: string;
  /** Heading (shown in capitals); its words rise in. */
  heading: string;
  /** The small card beside the questions. */
  contact: { title: string; text: string; action: { label: string; href: string } };
  /** Questions and answers. The first one starts open; only one is open at a time. */
  items: { question: string; answer: string }[];
};

export const faqContent: FaqContent = {
  tag: "[FAQ]",
  heading: "Frequently Asked Questions",
  contact: {
    title: "Talk to us",
    text: "Our team is here to help you personally with any questions.",
    action: { label: "Contact Us", href: "mailto:contact@sensoria.com" },
  },
  items: [
    { question: "How accurate is the neural scan?", answer: "It maps over 100,000 dermal points with 98% precision to ensure your ritual is perfectly synced with your current skin biology." },
    { question: "Can I use my current products?", answer: "Yes. Sensoria analyzes your existing routine and suggests how to optimize it with AI-driven timing and specific application methods." },
    { question: "Is it suitable for sensitive skin?", answer: "Absolutely. The system detects sensitivity markers and automatically prioritizes barrier repair and calming ingredients in your daily ritual." },
    { question: "How often should I scan my skin?", answer: "We recommend a deep scan once a week. This allows the AI to track subtle changes and adjust your formula based on stress and climate." },
    { question: "What if my local climate changes?", answer: "The app automatically updates your routine in real-time based on local UV levels, humidity, and pollution markers in your area." },
  ],
};
