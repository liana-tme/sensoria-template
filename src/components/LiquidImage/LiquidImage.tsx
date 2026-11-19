"use client";

/*
 * LiquidImage: a full-bleed photo. On desktop (lg) the photo "flows" like liquid where the
 * cursor moves. Tablet, phone, touch-only screens and "reduce motion":
 * the plain photo. Settings: --liquid-* in tokens.css.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { startFluid } from "./fluid";

export function LiquidImage({ src, alt }: { src: string; alt: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const num = (name: string) => Number.parseFloat(root.getPropertyValue(name));
    const desktop = window.matchMedia(`(width >= ${root.getPropertyValue("--breakpoint-lg").trim()}) and (hover: hover)`);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop: (() => void) | null = null;

    const run = () => {
      stop?.();
      stop = null;
      setReady(false);
      if (!desktop.matches || reduce.matches || !frame.current || !canvas.current) return;
      stop = startFluid(
        canvas.current,
        frame.current,
        src,
        {
          resolution: num("--liquid-resolution"),
          cursorSize: num("--liquid-cursor-size"),
          cursorPower: num("--liquid-cursor-power"),
          distortion: num("--liquid-distortion"),
          overscan: num("--liquid-overscan"),
        },
        () => setReady(true),
        // A title marked data-liquid-blend in the same section is drawn by the effect (see fluid.ts).
        frame.current.closest("section")?.querySelector<HTMLElement>("[data-liquid-blend]") ?? null,
      );
    };
    run();
    desktop.addEventListener("change", run);
    reduce.addEventListener("change", run);
    return () => {
      stop?.();
      desktop.removeEventListener("change", run);
      reduce.removeEventListener("change", run);
    };
  }, [src]);

  return (
    <div ref={frame} className="absolute inset-0">
      {/* A wide photo shown on a tall screen is cropped to its middle, so phones and tablets need a much
          wider file than the screen (otherwise it looks blurry); desktop shows it whole. */}
      <Image src={src} alt={alt} fill priority sizes="(width < 1200px) 300vw, 100vw" quality={90} className="object-cover" />
      <canvas
        ref={canvas}
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-1/10 size-6/5 ${ready ? "visible" : "invisible"}`}
      />
    </div>
  );
}
