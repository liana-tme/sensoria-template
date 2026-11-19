"use client";

/*
 * Reveal: Sensoria's appear effects.
 *  - "drop":   opacity 0 -> 1, comes down from --motion-drop-distance above, --ease-spring-drop (hero texts)
 *  - "rise":   opacity 0 -> 1, comes up from --motion-rise-distance below, --ease-spring-firm (section blocks)
 *  - "fade":   opacity 0 -> 1 only, --motion-fade-duration, --ease-spring (cards)
 *  - "slide":  opacity 0 -> 1, comes in from --motion-slide-distance on the left, --ease-soft
 *  - "float":  opacity 0 -> 1, comes up from --motion-float-distance, --motion-float-duration, --ease-float (plan cards)
 *  - "cards":  opacity 0 -> 1, comes up from --motion-cards-distance, --motion-cards-duration, --ease-cards (principle cards)
 *  - "lift":   opacity 0 -> 1, comes up from --motion-lift-distance, --motion-lift-duration, --ease-soft (job page)
 *  - "settle": no fade; comes down from --motion-hero-image-distance and shrinks from
 *              --motion-hero-image-scale, --ease-hero-image (hero photo)
 * trigger: "mount" plays once on page load; "view" when it scrolls into view
 * (`threshold`: how much of it must be visible first, 0–1 as in the original design).
 * Delays: give the element a class that sets --reveal-delay (see Hero.module.css).
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Reveal.module.css";

export function Reveal({
  children,
  kind = "drop",
  trigger = "view",
  threshold = 0,
  className = "",
}: {
  children: ReactNode;
  kind?: "drop" | "rise" | "fade" | "slide" | "float" | "cards" | "lift" | "settle";
  trigger?: "mount" | "view";
  threshold?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (trigger === "mount") {
      // Wait one frame so the start state is painted and the transition runs.
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, trigger]);

  return (
    <div ref={ref} className={`${styles[kind]} ${shown ? styles.shown : ""} ${className}`}>
      {children}
    </div>
  );
}
