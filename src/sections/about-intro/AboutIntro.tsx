/*
 * About page intro: page heading, a wide parallax photo, then
 * tag column + statement, a short line with the thin plus and two photos.
 * - Desktop & tablet: tag in column 1, the rest in columns 2–4. Phone: one column.
 * - The two photos fade in one after the other (0.1s / 0.2s).
 */
import Image from "next/image";
import { Icon } from "@/components/Icon/Icon";
import { ParallaxImage } from "@/components/ParallaxImage/ParallaxImage";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import type { AboutIntroContent } from "./content";
import styles from "./AboutIntro.module.css";

export function AboutIntro({ content }: { content: AboutIntroContent }) {
  return (
    <section className="mx-auto max-w-section px-section-x pt-page-top pb-section-y">
      <div className="flex flex-col gap-section-gap">
        <h1 className="max-w-heading type-h2">
          {content.heading.text}
          <span className="text-text-secondary">{content.heading.muted}</span>
        </h1>
        <ParallaxImage
          src={content.image.src}
          alt={content.image.alt}
          sizes="(width >= 1320px) 1240px, 100vw"
          priority
          className="aspect-landscape w-full rounded-card"
        />
        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <div>
            <Tag label={content.tag} />
          </div>
          <div className="flex flex-col gap-section-gap md:col-span-3">
            <p className="max-w-heading type-h5">
              {content.statement.map((part, i) => (
                <span key={i} className={part.muted ? "text-text-secondary" : undefined}>
                  {part.text}
                </span>
              ))}
            </p>
            <div className="flex flex-col items-start gap-stack-sm md:flex-row md:items-center">
              <Icon name="plus" strokeWidth={1.5} className="size-icon-lg shrink-0 opacity-30" />
              <p className="max-w-intro-lg type-body-lg-bold">
                {content.note.text}
                <span className="text-text-secondary">{content.note.muted}</span>
              </p>
            </div>
            <div className="flex flex-col gap-grid-gap md:flex-row">
              {content.photos.map((photo, i) => (
                <Reveal key={photo.src} kind="fade" className={`${i === 0 ? styles.first : styles.second} md:flex-1`}>
                  <div className="relative aspect-photo overflow-hidden rounded-card">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(width >= 810px) 40vw, 100vw" className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
