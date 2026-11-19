/*
 * Navigation content: everything the owner can change.
 * Layout, spacing, colours and motion live in Navigation.tsx and tokens.css.
 */
import type { LogoContent } from "@/components/Logo/Logo";

export type NavigationContent = {
  logo: LogoContent;
  /** Big links in the open menu. */
  links: { label: string; href: string }[];
  /** The white button in the open menu. Empty href = placeholder that goes nowhere. */
  action: { label: string; href: string; newTab: boolean };
  /** Contact line at the bottom of the open menu. */
  contact: { label: string; email: string };
  /** Small links at the bottom right of the open menu. */
  legal: { label: string; href: string }[];
};

export const navigationContent: NavigationContent = {
  logo: { name: "Sensoria", href: "/" },
  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
  // Placeholder: put the address of your main action here (a page or a link).
  action: { label: "Get template", href: "", newTab: true },
  contact: { label: "Need Support?", email: "hello@sensoria.com" },
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Service", href: "/legal/terms-of-service" },
  ],
};
