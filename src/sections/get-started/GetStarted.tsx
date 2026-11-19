/*
 * Get Started, above the footer on every page.
 * - An accent strip of words drifting left (Ticker, --motion-ticker-speed).
 * - A dark block with grain: heading, then a portrait video (column 1) beside an intro line
 *   and the form (columns 2–4). Tablet: same columns; phone: one column.
 * - The intro line and the form rise into view. The form column ends with 8px of empty space on tablet & desktop (md:pb-xs).
 */
import { Fragment } from "react";
import { Icon } from "@/components/Icon/Icon";
import { Reveal } from "@/components/Reveal/Reveal";
import { Ticker } from "@/components/Ticker/Ticker";
import type { GetStartedContent } from "./content";
import { CtaForm } from "./CtaForm";
import { LoopVideo } from "./LoopVideo";
import styles from "./GetStarted.module.css";

export function GetStarted({ content, id }: { content: GetStartedContent; id?: string }) {
  return (
    <section id={id} className="relative z-1">
      <div className="flex h-strip-h items-center overflow-hidden bg-accent">
        <Ticker label={content.strip.join(", ")} gap="strip">
          {content.strip.map((word) => (
            <Fragment key={word}>
              <span className="flex items-center type-body-bold whitespace-nowrap text-text-dark">{word}</span>
              <span className="my-auto size-dot shrink-0 rounded-full bg-black" aria-hidden="true" />
            </Fragment>
          ))}
        </Ticker>
      </div>

      <div className="relative overflow-hidden bg-page px-section-x py-section-y">
        <span className={`${styles.grain} pointer-events-none absolute inset-0`} aria-hidden="true" />
        <div className="relative mx-auto flex max-w-content flex-col gap-section-gap">
          <h2 className="max-w-cta-heading type-h2 md:max-w-heading">
            {content.heading.text}
            <span className="text-text-secondary">{content.heading.muted}</span>
          </h2>
          <div className="flex flex-col gap-section-gap md:grid md:grid-cols-4 md:gap-grid-gap">
            <div className="md:pr-video-col">
              <LoopVideo src={content.video.src} poster={content.video.poster} alt={content.video.alt} />
            </div>
            <div className="flex flex-col gap-section-gap md:col-span-3 md:pb-xs lg:gap-form-gap">
              <Reveal kind="rise" className={styles.near}>
                <div className="flex flex-col items-start gap-stack-sm md:flex-row md:items-center">
                  <Icon name="plus" strokeWidth={1.5} className="size-icon-lg shrink-0 opacity-30" />
                  <p className="max-w-intro-lg type-body-lg-bold text-text-secondary">
                    {content.intro.map((part, i) => (
                      <span key={i} className={part.bright ? "text-text-primary" : undefined}>
                        {part.text}
                      </span>
                    ))}
                  </p>
                </div>
              </Reveal>
              <Reveal kind="rise" className={styles.nearest}>
                <CtaForm form={content.form} />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
