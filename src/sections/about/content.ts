/*
 * About Us content (Home): everything the owner can change.
 * Layout, spacing, colours and motion live in About.tsx and tokens.css.
 */
import type { IconName } from "@/components/Icon/Icon";

type Card = { icon: IconName; title: string; text: string };

export type AboutContent = {
  /** Eyebrow label left of the heading. */
  tag: string;
  /** Heading: the first part is white, the second part softer. Shown in capitals. */
  heading: { text: string; muted: string };
  /** Short line under the heading: bright parts are white, the rest softer. */
  intro: { text: string; bright?: boolean }[];
  /** Card 1: a strip of photos that drifts left. */
  analysis: Card & { images: { src: string; alt: string }[] };
  /** Card 2: a small chat on a phone screen. */
  rituals: Card & {
    assistant: { name: string; avatar: string };
    message: string;
    placeholder: string;
  };
  /** Card 3: a counting number and a bar chart. Bar height = share of the tallest bar (0–1). */
  tracking: Card & {
    metric: { from: number; to: number; suffix: string; badge: string; label: string };
    bars: { month: string; value: string; height: number; highlight?: boolean }[];
  };
};

export const aboutContent: AboutContent = {
  tag: "[About Us]",
  heading: { text: "Smart analysis", muted: "That adapts" },
  intro: [
    { text: "Stop guessing. ", bright: true },
    { text: "Sensoria uses neural mapping to understand what your skin needs in real-time." },
    { text: " No fluff, just results.", bright: true },
  ],
  analysis: {
    icon: "scan-heart",
    title: "Smart Analysis",
    text: "High-precision neural mapping that detects subtle skin changes.",
    images: [
      { src: "/images/about/portrait-lilies.png", alt: "Woman among orange lilies and palm leaves." },
      { src: "/images/about/portrait-wildflowers.png", alt: "Woman behind soft yellow and pink wildflowers." },
      { src: "/images/about/profile-sunlight.png", alt: "Profile of a woman in warm dappled sunlight." },
      { src: "/images/about/portrait-daisies.png", alt: "Woman surrounded by daisies on a pink background." },
    ],
  },
  rituals: {
    icon: "sparkle",
    title: "Adaptive Rituals",
    text: "Dynamic routines that automatically adjust to your environment.",
    assistant: { name: "Sensoria AI", avatar: "/images/about/assistant-avatar.png" },
    message: "I’ve adjusted your routine to protect your skin from today’s high humidity.",
    placeholder: "Analyze my glow...",
  },
  tracking: {
    icon: "trend-up",
    title: "Glow Tracking",
    text: "Smart metrics to track your radiance progress in real-time.",
    metric: { from: 80, to: 89, suffix: "+", badge: "+14% Glow", label: "Vitality index" },
    bars: [
      { month: "Jan", value: "+2.1", height: 0.475 },
      { month: "Feb", value: "+4.8", height: 0.766 },
      { month: "Mar", value: "+3.8", height: 0.69 },
      { month: "Apr", value: "+3.2", height: 0.595 },
      { month: "May", value: "+6.2", height: 0.823 },
      { month: "Jun", value: "+8.9", height: 1, highlight: true },
    ],
  },
};
