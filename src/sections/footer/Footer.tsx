/*
 * Footer, on every page.
 * - Photo under a dark veil (--color-veil). Two columns: logo, rule, text and contact (column 1);
 *   newsletter and two menu columns (column 2). Desktop 2 : 1, tablet 1.5 : 1, phone stacked.
 *   The columns share what is left after their padding (flex-basis 0).
 * - Bottom bar on the page colour: copyright + credit, legal links; lined up with the columns above.
 * - Menu links: an accent underline grows on hover; e-mail, credit and legal links turn accent.
 */
import Image from "next/image";
import { Logo } from "@/components/Logo/Logo";
import type { FooterContent } from "./content";
import { Newsletter } from "./Newsletter";
import styles from "./Footer.module.css";

const external = (href: string) => /^https?:/.test(href);

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="relative z-1">
      <div className="relative overflow-hidden">
        <Image src={content.image} alt="" fill sizes="100vw" className="object-cover" />
        <span className="absolute inset-0 bg-veil" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-content flex-col md:flex-row md:items-center">
          <div className="flex flex-col gap-footer-stack px-section-x pt-footer-top pb-footer-bottom md:grow-3 md:basis-0 lg:grow-2 lg:pr-0">
            <Logo logo={content.logo} size="l" />
            <span className="h-hairline w-footer-line bg-white opacity-20" aria-hidden="true" />
            <div className="flex flex-col gap-footer-stack">
              <p className="max-w-footer-text whitespace-pre-wrap type-body-lg opacity-90 md:type-body lg:type-body-lg">{content.text}</p>
              <div className="flex flex-col gap-contact-gap">
                <p className="type-body-lg-bold opacity-70">{content.contact.label}</p>
                <a href={`mailto:${content.contact.email}`} className="w-fit type-h4 text-link">
                  {content.contact.email}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-footer-gap px-section-x pt-footer-bottom pb-footer-gap md:grow-2 md:basis-0 md:pt-footer-top lg:grow-1">
            <Newsletter newsletter={content.newsletter} />
            <span className="hidden h-hairline w-footer-line md:block" aria-hidden="true" />
            <nav aria-label="Footer" className="grid grid-cols-2 gap-footer-cols">
              {content.columns.map((column) => (
                <div key={column.label} className="flex flex-col gap-xs">
                  <p className="type-body-bold opacity-60">{column.label}</p>
                  <ul className="flex flex-col gap-xs">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(external(link.href) ? { target: "_blank", rel: "noopener" } : {})}
                          className={`${styles.link} flex h-link-h w-fit flex-col justify-center type-lead-bold`}
                        >
                          {link.label}
                          <span className={`${styles.line} h-hairline bg-accent`} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="relative bg-page py-bar-y">
        <div className="mx-auto flex max-w-content px-section-x flex-col gap-bar-stack md:gap-md lg:flex-row lg:justify-between lg:gap-footer-gap">
          <div className="flex flex-col gap-sm md:flex-row md:gap-md lg:gap-nav-stack">
            <p className="type-body">{content.copyright}</p>
            <p className="type-body text-text-secondary">
              {content.credit.text}
              <a href={content.credit.link.href} target="_blank" rel="noopener" className="type-body-bold text-link">
                {content.credit.link.label}
              </a>
            </p>
          </div>
          <ul className="flex gap-nav-stack md:gap-stack-sm lg:gap-nav-stack">
            {content.legal.map((link) => (
              <li key={link.href} className="flex">
                <a href={link.href} className="type-body-bold text-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
