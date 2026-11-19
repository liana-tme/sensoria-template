/*
 * Hero: a full-screen photo with the texts at the bottom left.
 * - Desktop: the photo flows like liquid under the cursor. Tablet & phone: still photo under a light veil.
 * - The big title uses "difference" blending: its white letters invert the photo under them.
 *   The section is its own blend group (isolate), so the title always blends with this photo.
 *   On desktop the liquid photo draws this inversion itself, from its first frame
 *   (data-liquid-blend), so it stays correct while the photo flows.
 *   (Only the title: the other texts stay plain white, as in the original.)
 * - On load (after the preloader): the photo comes down and settles from 150%,
 *   the texts drop in from above: subtitle + title, then the lead, then the year mark.
 * - Right edge: a vertical year mark with a small ruler.
 * - The whole hero scrolls at --motion-hero-speed (80%), so About slides over it.
 */
import { LiquidImage } from "@/components/LiquidImage/LiquidImage";
import { Reveal } from "@/components/Reveal/Reveal";
import { ScrollSpeed } from "@/components/ScrollSpeed/ScrollSpeed";
import type { HeroContent } from "./content";
import styles from "./Hero.module.css";

/* Ruler ticks, left to right: short ×4, medium, long, medium, short ×4 */
const TICKS = ["sm", "sm", "sm", "sm", "md", "lg", "md", "sm", "sm", "sm", "sm"] as const;
const tickHeight = { sm: "h-tick-sm", md: "h-tick-md", lg: "h-tick-lg" };

export function Hero({ content }: { content: HeroContent }) {
  return (
    <ScrollSpeed speed="--motion-hero-speed" className="relative z-1">
      <section className="relative isolate flex h-screen overflow-clip">
        <Reveal kind="settle" trigger="mount" className={`${styles.image} absolute inset-0`}>
          <LiquidImage src={content.image.src} alt={content.image.alt} />
        </Reveal>
        {/* Phone & tablet: a light veil so the texts read well on the cropped photo. */}
        <span className="pointer-events-none absolute inset-0 bg-veil-soft lg:hidden" aria-hidden="true" />

        <div className="relative flex flex-1 flex-col justify-end px-hero-x pb-hero-bottom">
          <Reveal trigger="mount" className={`${styles.mark} absolute inset-y-0 -right-hero-mark-out my-auto h-fit`}>
            <div className="flex -rotate-90 items-end gap-hero-mark-gap">
              <span className="type-body-bold">{content.mark.before}</span>
              <span className="flex items-end gap-ticks-gap pb-ticks-bottom opacity-50" aria-hidden="true">
                {TICKS.map((size, i) => (
                  <span key={i} className={`w-hairline bg-white ${tickHeight[size]}`} />
                ))}
              </span>
              <span className="type-body-bold">{content.mark.after}</span>
            </div>
          </Reveal>

          <div className="flex flex-col gap-hero-stack">
            <Reveal trigger="mount" className={`${styles.lead} max-w-hero-lead`}>
              <p className={`${styles.leadText} type-lead-bold`}>{content.lead}</p>
            </Reveal>
            <div className="flex flex-col gap-hero-title-gap">
              <Reveal trigger="mount" className={`${styles.title} max-w-hero-sub`}>
                <p className="type-h4 opacity-90">{content.subtitle}</p>
              </Reveal>
              <Reveal trigger="mount" className={`${styles.title} max-w-hero-title mix-blend-difference`}>
                <h1 className="type-h1" data-liquid-blend>{content.title}</h1>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </ScrollSpeed>
  );
}
