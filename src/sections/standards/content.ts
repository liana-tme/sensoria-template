/*
 * Standards content (Careers page and every job page): the same cards as Principles.
 * Layout, spacing and motion: src/sections/principles/Principles.tsx.
 */
import type { PrinciplesContent } from "@/sections/principles/content";

export const standardsContent: PrinciplesContent = {
  tag: "[Values]",
  heading: "Standards",
  items: [
    { icon: "target", title: "Precision", text: "We ensure high accuracy by testing every neural model against clinical data." },
    { icon: "life-buoy", title: "Support", text: "Technical assistance is available to help you integrate our smart systems." },
    { icon: "zap", title: "Velocity", text: "Our infrastructure allows for rapid processing of dermal markers in seconds." },
    { icon: "shield-check", title: "Ethics", text: "Our infrastructure allows for rapid processing of complex dermal markers in seconds." },
    { icon: "trend-up", title: "Growth", text: "The system constantly learns to improve individual routine results." },
    { icon: "layers", title: "Clarity", text: "Complex scientific reports are simplified into easy to understand visuals." },
  ],
};
