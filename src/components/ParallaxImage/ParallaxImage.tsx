"use client";

/*
 * ParallaxImage: a photo in a frame that
 * moves slower than the page. The photo is 5% taller than its frame and shifts by
 * --motion-parallax × the frame's distance from the top of the screen (0 when the frame's
 * top touches the top edge). Frame shape and corners come from `className`.
 * Desktop only (--motion-parallax is 0 on phone & tablet). "Reduce motion": the photo stays still.
 */
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./ParallaxImage.module.css";

export function ParallaxImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = frame.current;
    const img = photo.current;
    if (!box || !img || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const factor = parseFloat(getComputedStyle(box).getPropertyValue("--motion-parallax")) || 0;
    if (!factor) return; // phone & tablet: the photo stays still
    let raf = 0;
    const update = () => {
      raf = 0;
      const top = box.getBoundingClientRect().top;
      img.style.translate = `0 ${-top * factor}px`;
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    return () => {
      removeEventListener("scroll", queue);
      removeEventListener("resize", queue);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <div ref={photo} className={`${styles.photo} absolute inset-x-0 top-0`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
