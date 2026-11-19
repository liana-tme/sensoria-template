/*
 * Vision: a full-screen parallax photo with the founder's quote.
 * - A light veil (--color-veil-soft) darkens the photo so the quote reads well.
 * - Tag (white) and quote at the top, author at the bottom (space between), inset
 *   --spacing-vision-inset from the sides. Section padding --spacing-vision-y / -x.
 * - The quote floats in quickly (Reveal "float", --motion-quote-duration).
 */
import { ParallaxImage } from "@/components/ParallaxImage/ParallaxImage";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import type { VisionContent } from "./content";
import styles from "./Vision.module.css";

export function Vision({ content, id }: { content: VisionContent; id?: string }) {
  return (
    <section id={id} className="relative flex h-screen flex-col items-center justify-between overflow-hidden px-vision-x py-vision-y">
      <ParallaxImage src={content.image.src} alt={content.image.alt} sizes="100vw" className="absolute! inset-0" />
      <span className="absolute inset-0 bg-veil-soft" aria-hidden="true" />
      <div className="relative flex w-full max-w-content flex-col gap-vision-gap px-vision-inset">
        <Tag label={content.tag} tone="white" />
        <Reveal kind="float" className={styles.quote}>
          <blockquote className="max-w-quote type-h3">{content.quote}</blockquote>
        </Reveal>
      </div>
      <div className="relative flex w-full max-w-content flex-col gap-stat-gap px-vision-inset">
        <p className="max-w-author type-h6">{content.author.name}</p>
        <p className="max-w-author type-body-bold opacity-80">{content.author.role}</p>
      </div>
    </section>
  );
}
