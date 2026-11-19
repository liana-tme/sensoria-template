/*
 * Team content (About page): everything the owner can change.
 * Layout, spacing, colours and motion live in Team.tsx and tokens.css.
 */
import type { LogoContent } from "@/components/Logo/Logo";

export type TeamContent = {
  tag: string;
  heading: string;
  /** First card: an invitation (to join the team, or to get in touch), with a button (careers page, contact form…). */
  invite: { logo: LogoContent; title: string; text: string; action: { label: string; href: string } };
  /** Portrait cards: photo (portrait), name and role. */
  members: { name: string; role: string; image: { src: string; alt: string } }[];
};

export const teamContent: TeamContent = {
  tag: "[Experts]",
  heading: "Our team",
  invite: {
    logo: { name: "Sensoria", href: "/" },
    title: "Ready to grow together with us?",
    text: "Be part of the lab that’s changing how the world understands skin health.",
    action: { label: "View Careers", href: "/careers" },
  },
  members: [
    { name: "Marcus Thorne", role: "Head of AI Engineering", image: { src: "/images/team/marcus-thorne.png", alt: "Marcus Thorne, Head of AI Engineering." } },
    { name: "Elena Vance", role: "Chief Dermatologist", image: { src: "/images/team/elena-vance.png", alt: "Elena Vance, Chief Dermatologist." } },
    { name: "Sienna Grey", role: "Product Strategist", image: { src: "/images/team/sienna-grey.png", alt: "Sienna Grey, Product Strategist." } },
  ],
};
