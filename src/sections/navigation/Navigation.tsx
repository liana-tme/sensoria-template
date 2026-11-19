"use client";

/*
 * Navigation (on every page).
 * - Closed: transparent bar over the page: logo left, menu icon right (all screen sizes).
 * - Open: the bar grows into a dark panel (0.5s): big links, white button, a line,
 *   contact e-mail and legal links. Phone: everything in one column.
 * - Scrolling down hides the bar (up 40px, fade out); scrolling up brings it back.
 * - Phone: once the page is scrolled past --nav-scroll-offset, the closed bar blurs what is under it.
 */
import { useEffect, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Logo } from "@/components/Logo/Logo";
import type { NavigationContent } from "./content";
import styles from "./Navigation.module.css";

export function Navigation({ content }: { content: NavigationContent }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const offset = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-scroll-offset")) || 0;
    const update = () => {
      const y = window.scrollY;
      if (y !== lastY) setHidden(y > lastY && y > 0);
      setScrolled(y > offset);
      lastY = y;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`${styles.bar} ${hidden && !open ? styles.hidden : ""} fixed inset-x-0 top-0`}
    >
      <div
        className={`${styles.panel} ${open ? styles.open : ""} ${scrolled && !open ? "max-md:backdrop-blur-nav" : ""} flex flex-col px-nav-x pt-nav-y`}
      >
        <div className="flex items-center justify-between">
          <Logo logo={content.logo} onClick={close} />
          <button
            type="button"
            className={`${styles.menuIcon} ${open ? styles.menuIconOpen : ""} relative h-menu-icon-h w-menu-icon-w text-text-primary`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(!open)}
          >
            <span className={`${styles.line} ${styles.lineTop}`} />
            <span className={`${styles.line} ${styles.lineMiddle}`} />
            <span className={`${styles.line} ${styles.lineBottom}`} />
          </button>
        </div>

        <div className={styles.drawer} id="site-menu" inert={!open}>
          <div className="min-h-0 overflow-hidden">
            <nav aria-label="Main" className="flex flex-col gap-nav-stack pt-nav-stack">
              <div className="flex flex-col items-start gap-nav-stack-sm md:flex-row md:items-end md:justify-between">
                <ul className="flex flex-col items-start gap-nav-links">
                  {content.links.map((link) => (
                    <li key={link.href + link.label} className={styles.item}>
                      <a href={link.href} onClick={close} className={`${styles.link} flex flex-col items-start type-h4`}>
                        {link.label}
                        <span className={`${styles.linkLine} h-hairline bg-accent`} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
                <Button
                  href={content.action.href}
                  label={content.action.label}
                  newTab={content.action.newTab}
                  onClick={close}
                />
              </div>

              <div className="h-hairline bg-divider" aria-hidden="true" />

              <div className="flex flex-col items-start gap-nav-stack-sm md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-nav-contact">
                  <p className="type-body-bold text-text-secondary">{content.contact.label}</p>
                  <a href={`mailto:${content.contact.email}`} target="_blank" rel="noopener" className="type-h5 text-link">
                    {content.contact.email}
                  </a>
                </div>
                <ul className="flex items-center gap-nav-stack">
                  {content.legal.map((link) => (
                    <li key={link.href + link.label} className="flex">
                      <a href={link.href} onClick={close} className="type-body-lg-bold text-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
