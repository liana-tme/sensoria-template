"use client";

/*
 * LoopVideo: a portrait video that plays on its own (muted, looping, inline), at the video's own
 * shape (--aspect-portrait-video), `rounded-card`. The template ships without sample videos:
 * if the file is missing, the poster photo stays.
 */
import Image from "next/image";
import { useEffect, useState } from "react";

export function LoopVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    if (!src) return;
    let alive = true;
    fetch(src, { method: "HEAD" })
      .then((r) => alive && setHasVideo(r.ok))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [src]);

  return (
    <div className="relative aspect-portrait-video w-full overflow-hidden rounded-card">
      <Image src={poster} alt={alt} fill sizes="(width >= 810px) 25vw, 100vw" className="object-cover" />
      {hasVideo && (
        <video src={src} autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 size-full object-cover" />
      )}
    </div>
  );
}
