"use client";

/*
 * ScrollEntry: tracks how far this block has entered the screen from the bottom and writes it
 * to the CSS variable --entry on the block: 0 when its top edge touches the bottom of the screen,
 * 1 once it is fully inside.
 * Children read it, e.g. scale: var(--entry). Put transforms on a child, never on this block
 * (it is the one being measured). "Reduce motion": --entry stays 1.
 */
import { useEffect, useRef, type ReactNode } from "react";

export function ScrollEntry({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--entry", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / Math.max(1, rect.height);
      el.style.setProperty("--entry", String(Math.min(1, Math.max(0, progress))));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ "--entry": 0 } as React.CSSProperties}>
      {children}
    </div>
  );
}
