/*
 * Channels content (/contact "Direct contact"): everything the owner can change.
 * Layout, spacing and motion live in Channels.tsx and tokens.css.
 */
import type { IconName } from "@/components/Icon/Icon";

export type ChannelsContent = {
  tag: string;
  heading: string;
  /** Line with the thin plus: white part + softer part. */
  note: { text: string; muted: string };
  /** Cards: icon (from src/components/Icon), title, one sentence, and an underlined link. */
  items: { icon: IconName; title: string; text: string; link: { label: string; href: string } }[];
};

export const channelsContent: ChannelsContent = {
  tag: "[Channels]",
  heading: "Direct contact",
  note: { text: "Reach out to our team for direct laboratory inquiries ", muted: "or visit our research facility for partnership discussions." },
  items: [
    {
      icon: "mail",
      title: "Email desk",
      text: "Available for global technical support and research inquiries.",
      link: { label: "contact@sensoria.com", href: "mailto:contact@sensoria.com" },
    },
    {
      icon: "map-pin",
      title: "Physical lab",
      text: "Scientific visits and on-site meetings by appointment only.",
      link: { label: "82 Rothschild Blvd, Tel Aviv", href: "https://www.google.com/maps/search/?api=1&query=82+Rothschild+Blvd,+Tel+Aviv" },
    },
  ],
};
