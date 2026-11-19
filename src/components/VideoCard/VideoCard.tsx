"use client";

/*
 * VideoCard: a rounded card with a poster photo and a round play button
 * with a pulsing ring. Click: the video plays (muted, looping) and the button fades out;
 * click again: pause, the button comes back. Hover (not while playing): the picture grows to 110% and blurs.
 * No video file (or it can't load): the poster stays, without a play button, and nothing is clickable.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon/Icon";
import styles from "./VideoCard.module.css";

export function VideoCard({
  video,
  poster,
  label,
}: {
  /** Path to the video file in public/ (e.g. /videos/my-video.mp4). Empty = poster only. */
  video: string;
  poster: { src: string; alt: string };
  /** What the video shows, for screen readers ("Play: …"). */
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(!video);

  // The template ships without sample videos: if the file isn't there, show the poster only.
  useEffect(() => {
    if (!video) return;
    let alive = true;
    fetch(video, { method: "HEAD" })
      .then((r) => alive && !r.ok && setFailed(true))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [video]);

  const toggle = () => {
    const v = ref.current;
    if (!v || failed) return;
    if (v.paused) {
      v.play().then(
        () => {
          setPlaying(true);
          setStarted(true);
        },
        () => setFailed(true),
      );
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const inner = (
    <>
      <span className={`${styles.media} absolute inset-0`}>
        <Image src={poster.src} alt={poster.alt} fill sizes="(width >= 1200px) 1240px, 100vw" className="object-cover" />
        {!failed && (
          <video
            ref={ref}
            src={video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onError={() => setFailed(true)}
            className={`absolute inset-0 size-full object-cover ${started ? "" : "opacity-0"}`}
          />
        )}
      </span>
      <span className={`${styles.grain} pointer-events-none absolute inset-0`} aria-hidden="true" />
      {!failed && (
        <span
          className={`${styles.play} ${playing ? styles.hidden : ""} absolute inset-0 m-auto flex size-play items-center justify-center`}
          aria-hidden="true"
        >
          <span className={`${styles.pulse} absolute rounded-full bg-white`} />
          <span className="absolute inset-0 rounded-full bg-white" />
          <Icon name="play" className="relative size-play-icon text-accent" />
        </span>
      )}
    </>
  );

  const frame = `${styles.card} ${playing ? styles.playing : ""} relative block h-video-h w-full overflow-hidden rounded-video bg-page`;
  if (failed) return <div className={frame}>{inner}</div>;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`${playing ? "Pause" : "Play"}: ${label}`}
      aria-pressed={playing}
      className={frame}
    >
      {inner}
    </button>
  );
}
