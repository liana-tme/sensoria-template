"use client";

/*
 * Ticker: an endless row that drifts left at --motion-ticker-speed px/s (ticker effect).
 * The row is rendered twice so the loop has no seam. `gap` picks the space between items.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Ticker.module.css";

export function Ticker({
  children,
  label,
  gap = "xs",
}: {
  children: ReactNode;
  label: string;
  /** Space between items: "xs" (photo strip) or "strip" (word strip). */
  gap?: "xs" | "strip";
}) {
  const setRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState<string | null>(null);

  useEffect(() => {
    const set = setRef.current;
    if (!set) return;
    const measure = () => {
      const speed = Number.parseFloat(getComputedStyle(set).getPropertyValue("--motion-ticker-speed"));
      const gap = Number.parseFloat(getComputedStyle(set).columnGap) || 0;
      const distance = set.getBoundingClientRect().width + gap;
      if (speed > 0) setDuration(`${distance / speed}s`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(set);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full w-full overflow-hidden" aria-label={label} role="marquee">
      <div
        className={`${styles.track} ${gap === "strip" ? styles.strip : ""} flex h-full w-max`}
        style={duration ? { animationDuration: duration } : { animationPlayState: "paused" }}
      >
        <div ref={setRef} className={`${styles.set} flex h-full shrink-0`}>
          {children}
        </div>
        <div className={`${styles.set} flex h-full shrink-0`} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
