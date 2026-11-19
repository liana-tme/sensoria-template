"use client";

/*
 * Counter: counts up from `from` to `to`, one number per step, once.
 * - start "view": when it scrolls into view (About Us metric); "load": right after the page loads (Analysis stats).
 * - pace "fast" = --motion-counter-step, "slow" = --motion-counter-step-slow.
 * Shows `to` without motion for "reduce motion". Screen readers get the final number.
 * Gap between number and suffix: pass a gap class in `suffixGap` (e.g. "gap-3xs").
 */
import { useEffect, useRef, useState } from "react";

export function Counter({
  from,
  to,
  suffix = "",
  start = "view",
  pace = "fast",
  suffixGap = "",
  className = "",
}: {
  from: number;
  to: number;
  suffix?: string;
  start?: "view" | "load";
  pace?: "fast" | "slow";
  suffixGap?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const token = pace === "slow" ? "--motion-counter-step-slow" : "--motion-counter-step";
    const step = Number.parseFloat(getComputedStyle(el).getPropertyValue(token)) || 60;
    let timer: number | undefined;
    const run = () => {
      let n = from;
      timer = window.setInterval(() => {
        n += 1;
        setValue(n);
        if (n >= to) window.clearInterval(timer);
      }, step);
    };
    if (start === "load") {
      run();
      return () => window.clearInterval(timer);
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      run();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [from, to, start, pace]);

  return (
    <span ref={ref} className={className} aria-label={`${to}${suffix}`}>
      <span aria-hidden="true" className={`inline-flex ${suffixGap}`}>
        <span>{value}</span>
        {suffix && <span>{suffix}</span>}
      </span>
    </span>
  );
}
