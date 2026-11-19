/*
 * Pricing content (Home): everything the owner can change.
 * Layout, spacing, colours and motion live in Pricing.tsx, PricingTable.tsx and tokens.css.
 */
import type { IconName } from "@/components/Icon/Icon";

export type Plan = {
  icon: IconName;
  title: string;
  /** Price text for each billing period, e.g. "$19". */
  price: { monthly: string; yearly: string };
  description: string;
  /** Up to 5 lines with a plus. */
  features: string[];
  /** Button under the plan. Empty href = placeholder that goes nowhere (add your checkout or sign-up link). */
  action: { label: string; href: string };
};

export type PricingContent = {
  tag: string;
  /** Heading: white part + softer part. Shown in capitals. */
  heading: { text: string; muted: string };
  /** The billing switch and the small text after the price. */
  billing: { monthly: string; yearly: string; perMonth: string; perYear: string };
  plans: Plan[];
  /** The photo card for custom deals. */
  custom: { tag: string; title: { text: string; muted: string }; email: string; image: { src: string; alt: string } };
  /** Under the plans: a label, a quote (bright parts white) and who said it. */
  founder: {
    label: string;
    quote: { text: string; bright?: boolean }[];
    name: string;
    role: string;
    avatar: string;
  };
};

export const pricingContent: PricingContent = {
  tag: "[Pricing]",
  heading: { text: "Select Plan", muted: "Scalable Beauty" },
  billing: { monthly: "Monthly", yearly: "Yearly (20%)", perMonth: "/month", perYear: "/year" },
  plans: [
    {
      icon: "scan-heart",
      title: "Personal",
      price: { monthly: "$19", yearly: "$159" },
      description: "Essential AI-driven insights for daily skin management, designed for those starting their neural skincare journey with precision.",
      features: [
        "1 Deep neural scan every month",
        "Real-time local climate synchronization",
        "Basic adaptive ritual guide for day & night",
        "Standard vitality tracking and history",
        "Essential community & email support",
      ],
      // Placeholder: put your checkout or sign-up link here.
      action: { label: "Try Sensoria", href: "" },
    },
    {
      icon: "scan-search",
      title: "Professional",
      price: { monthly: "$49", yearly: "$399" },
      description: "Complete bio-marker synchronization for total skin mastery, featuring real-time AI adjustments and professional-level analysis.",
      features: [
        "Unlimited high-fidelity neural scans",
        "Advanced bio-marker & stress sync",
        "Deep analysis & full skin history log",
        "Priority AI support and expert guidance",
        "Early access to all future beta features",
      ],
      // Placeholder: put your checkout or sign-up link here.
      action: { label: "Try Sensoria", href: "" },
    },
  ],
  custom: {
    tag: "Custom Scale",
    title: { text: "Bigger vision? ", muted: "We power it." },
    email: "hello@sensoria.com",
    image: { src: "/images/hero/portrait-light.webp", alt: "" },
  },
  founder: {
    label: "Sensoria Team",
    quote: [
      { text: "We believe that advanced" },
      { text: " skincare technology should be accessible to everyone. Sensoria was designed to bridge the gap between complex science and daily rituals.", bright: true },
    ],
    name: "Alexandra Jensen",
    role: "Founder & CEO",
    avatar: "/images/pricing/founder-portrait.jpg",
  },
};
