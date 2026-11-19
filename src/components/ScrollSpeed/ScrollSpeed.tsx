"use client";

/*
 * ScrollSpeed: the block scrolls slower than the page.
 * `speed` = a CSS variable holding the share of the page speed (0.8 = 80%): the block is pushed
 * down by (1 − speed) × the distance scrolled past its top. The next section (positioned, painted
 * later) slides over it. "Reduce motion": no effect.
 */
import { useEffect, useRef, type ReactNode } from "react";

export function ScrollSpeed({
  children,
  speed,
  className = "",
}: {
  children: ReactNode;
  /** Name of the CSS variable with the speed share, e.g. "--motion-hero-speed". */
  speed: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const share = Number.parseFloat(getComputedStyle(el).getPropertyValue(speed));
    if (!Number.isFinite(share) || share === 1) return; // 1 = normal speed (phones)
    const start = el.getBoundingClientRect().top + window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const past = Math.max(0, window.scrollY - start);
      el.style.translate = `0 ${(1 - share) * past}px`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
