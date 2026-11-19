"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/*
 * Smooth wheel scrolling, the same feel as the original site.
 * Mouse wheel only; touch scrolling stays native. Turned off for "reduce motion".
 * Strength: --motion-scroll-lerp in src/styles/tokens.css.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lerp = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--motion-scroll-lerp"),
    );
    const lenis = new Lenis({ lerp: Number.isFinite(lerp) ? lerp : undefined, autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
