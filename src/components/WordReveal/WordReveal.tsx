"use client";

/*
 * WordReveal (text effect, by word): when the text scrolls into view, its words fade in
 * and rise --motion-words-distance one after another (--motion-words-stagger apart), once.
 * `parts` lets a heading mix colours: each part gets its own class (e.g. "text-accent").
 * Screen readers get the plain text. "Reduce motion": shown at once.
 */
import { useEffect, useRef, useState } from "react";
import styles from "./WordReveal.module.css";

export function WordReveal({ parts }: { parts: { text: string; className?: string }[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShown(true);
      io.disconnect();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let index = 0;
  return (
    <span ref={ref} className={shown ? styles.shown : ""}>
      <span className="sr-only">{parts.map((p) => p.text).join("")}</span>
      <span aria-hidden="true">
        {parts.map((part, p) => (
          <span key={p} className={part.className}>
            {part.text.split(/(\s+)/).map((chunk, c) =>
              /^\s+$/.test(chunk) || chunk === "" ? (
                chunk
              ) : (
                <span key={c} className={styles.word} style={{ "--i": index++ } as React.CSSProperties}>
                  {chunk}
                </span>
              ),
            )}
          </span>
        ))}
      </span>
    </span>
  );
}
