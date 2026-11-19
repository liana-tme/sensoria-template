"use client";

/*
 * Preloader (Home only).
 * A page-coloured curtain with a fine grain covers the screen. The word rises letter by letter
 * (accent serif italic, from below, blurred -> sharp). After --motion-preloader-hold the curtain
 * slides up off the screen and blurs (1s), then it is removed.
 * The motion is pure CSS (starts with the first paint, cannot get stuck); JS only removes the
 * finished curtain from the page.
 */
import { useState } from "react";
import type { PreloaderContent } from "./content";
import styles from "./Preloader.module.css";

export function Preloader({ content }: { content: PreloaderContent }) {
  const [done, setDone] = useState(false);
  if (done) return null;

  return (
    <div className={`${styles.root} fixed inset-0 overflow-hidden`} aria-hidden="true">
      <div
        className={`${styles.curtain} absolute inset-0 flex items-center justify-center bg-page`}
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget) setDone(true);
        }}
      >
        <div className={`${styles.grain} pointer-events-none absolute inset-0`} />
        <p className="relative flex type-serif-m">
          {[...content.word].map((letter, i) => (
            <span key={i} className={styles.letter} style={{ "--i": i } as React.CSSProperties}>
              {letter === " " ? " " : letter}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
