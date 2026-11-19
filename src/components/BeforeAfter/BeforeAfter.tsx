"use client";

/*
 * BeforeAfter: two photos on top of each other; the "after" photo shows
 * right of a divider. Drag or click anywhere to move the divider (an invisible range input covers
 * the photo, so it also works with the keyboard). Clicking the "Before" / "After" labels slides
 * the divider all the way (--motion-compare-jump) to show that photo whole.
 */
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./BeforeAfter.module.css";

type Photo = { src: string; alt: string };

export function BeforeAfter({
  before,
  after,
  labels,
  start = 50,
}: {
  before: Photo;
  after: Photo;
  labels: { before: string; after: string };
  /** Where the divider starts, 0–100 (% from the left). */
  start?: number;
}) {
  const [position, setPosition] = useState(start);
  const [jumping, setJumping] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const jump = (to: number) => {
    setJumping(true);
    setPosition(to);
    window.clearTimeout(timer.current);
    const ms = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--motion-compare-jump")) * 1000;
    timer.current = window.setTimeout(() => setJumping(false), ms || 300);
  };

  const label = "rounded-full bg-page px-label-x py-label-y type-body-sm-bold inset-ring inset-ring-border";

  return (
    <div
      className={`${styles.root} ${jumping ? styles.jumping : ""} relative size-full overflow-hidden rounded-card bg-page`}
      style={{ "--split": `${position}%` } as React.CSSProperties}
    >
      <Image src={before.src} alt={before.alt} fill sizes="(width >= 1200px) 50vw, 100vw" className="object-cover" />
      <div className={`${styles.after} absolute inset-0 z-1`}>
        <Image src={after.src} alt={after.alt} fill sizes="(width >= 1200px) 50vw, 100vw" className="object-cover" />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`${labels.before} / ${labels.after}`}
        className={`${styles.range} absolute inset-0 z-2 size-full cursor-pointer`}
      />

      <div className={`${styles.divider} pointer-events-none absolute inset-y-0 z-2 flex items-center justify-center`} aria-hidden="true">
        <span className={`${styles.handle} relative size-handle shrink-0 rounded-full text-white`} />
      </div>

      <button type="button" onClick={() => jump(0)} className={`${label} absolute top-stack-sm left-stack-sm z-3`}>
        {labels.before}
      </button>
      <button type="button" onClick={() => jump(100)} className={`${label} absolute top-stack-sm right-stack-sm z-3`}>
        {labels.after}
      </button>
    </div>
  );
}
