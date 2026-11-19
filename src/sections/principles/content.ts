/*
 * Principles content (About page): everything the owner can change.
 * Layout, spacing, colours and motion live in Principles.tsx and tokens.css.
 */
import type { IconName } from "@/components/Icon/Icon";

export type PrinciplesContent = {
  tag: string;
  heading: string;
  /** Cards: icon (from src/components/Icon), title, one sentence. */
  items: { icon: IconName; title: string; text: string }[];
};

export const principlesContent: PrinciplesContent = {
  tag: "[Essence]",
  heading: "Principles",
  items: [
    { icon: "microscope", title: "Evidence", text: "We validate every neural algorithm through extensive and scientific research." },
    { icon: "zap", title: "Velocity", text: "Our technical team ships weekly updates to maintain high diagnostic accuracy." },
    { icon: "hand-heart", title: "Honesty", text: "Clear data reports and honest product without any marketing bias." },
  ],
};
