/*
 * Footer content (every page): everything the owner can change.
 * Layout, spacing, colours and motion live in Footer.tsx and tokens.css.
 */
import type { LogoContent } from "@/components/Logo/Logo";

type Link = { label: string; href: string };

export type FooterContent = {
  logo: LogoContent;
  /** Short paragraph under the logo. The spaces at the start make the first-line indent. */
  text: string;
  contact: { label: string; email: string };
  /** Photo behind the footer, under a dark veil (decorative). */
  image: string;
  newsletter: {
    text: string;
    placeholder: string;
    /**
     * Address from your form or newsletter service: it receives the e-mails.
     * Empty = the arrow opens the visitor's e-mail app with a message to `fallbackEmail`.
     */
    action: string;
    fallbackEmail: string;
    subject: string;
    /** Read aloud for the arrow button. */
    buttonLabel: string;
  };
  /** Menu columns: a small label and links (outside links open in a new tab). */
  columns: { label: string; links: Link[] }[];
  copyright: string;
  credit: { text: string; link: Link };
  legal: Link[];
};

export const footerContent: FooterContent = {
  logo: { name: "Sensoria", href: "/" },
  text: "           Sensoria combines advanced neural mapping with personalized science to create an intelligent daily ritual for your skin's health.",
  contact: { label: "Get in touch", email: "hello@sensoria.com" },
  image: "/images/hero/portrait-light.webp",
  newsletter: {
    text: "Sign in to newsletter and never miss any update.",
    placeholder: "Enter your email...",
    action: "",
    fallbackEmail: "hello@sensoria.com",
    subject: "Newsletter sign-up",
    buttonLabel: "Subscribe",
  },
  columns: [
    {
      label: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Journal", href: "/journal" },
      ],
    },
    {
      // The template author's profiles: replace with your own.
      label: "Social",
      links: [
        { label: "Threads", href: "https://www.threads.com/@liana.tudakova" },
        { label: "Instagram", href: "https://www.instagram.com/liana.tudakova/" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/liana-tme/" },
      ],
    },
  ],
  copyright: "© 2026 Sensoria. All rights reserved.",
  credit: { text: "Created by ", link: { label: "Liana Tudakova", href: "https://lunaui.co" } },
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Service", href: "/legal/terms-of-service" },
  ],
};
