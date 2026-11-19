/*
 * Results: tag + heading whose words rise in, then a row of
 * a highlight card (+ button), a review (two stacked cards) and a before/after comparison.
 * - The row has a fixed height (--spacing-results-h) and its rows share it equally:
 *   desktop 4 columns (comparison spans 2), tablet 2 (comparison full width below), phone 1.
 * - The review column is 1% taller than its row (as in the original).
 * - Heading: the accent part starts a new line on phone and desktop, stays on the same line on tablet.
 * - Motion: highlight and review fade in (0.1s / 0.2s), the comparison slides in from the left.
 */
import Image from "next/image";
import { BeforeAfter } from "@/components/BeforeAfter/BeforeAfter";
import { Button } from "@/components/Button/Button";
import { Logo } from "@/components/Logo/Logo";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import { WordReveal } from "@/components/WordReveal/WordReveal";
import { navigationContent } from "@/sections/navigation/content";
import type { ResultsContent } from "./content";
import styles from "./Results.module.css";

export function Results({ content, id }: { content: ResultsContent; id?: string }) {
  const { highlight, review, compare } = content;
  const card = "rounded-card p-card-pad inset-ring inset-ring-border";
  return (
    <section id={id} className="mx-auto max-w-section bg-page px-section-x py-section-y">
      <div className="flex flex-col gap-section-gap">
        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <div>
            <Tag label={content.tag} />
          </div>
          <h2 className="max-w-heading type-h2 md:col-span-3">
            <WordReveal parts={[{ text: content.heading.text }, { text: ` ${content.heading.accent}`, className: "block text-accent md:inline lg:block" }]} />
          </h2>
        </div>

        <div className="grid h-results-h auto-rows-fr gap-grid-gap md:grid-cols-2 lg:grid-cols-4">
          <Reveal kind="fade" className={`${styles.first} flex h-full flex-col gap-grid-gap`}>
            <div className={`${card} flex flex-1 flex-col justify-between gap-step-gap overflow-hidden`}>
              <div className="flex flex-col gap-stack-sm">
                <Logo logo={navigationContent.logo} />
                <h3 className="max-w-step-text type-h4">{highlight.title}</h3>
              </div>
              <p className="max-w-quote type-body-bold opacity-80">{highlight.quote}</p>
            </div>
            <Button href={highlight.action.href} label={highlight.action.label} wide />
          </Reveal>

          <Reveal kind="fade" className={`${styles.second} flex h-results-overhang flex-col gap-grid-gap`}>
            <div className={`${card} flex items-center gap-sm`}>
              <span className="relative size-avatar-md shrink-0 overflow-hidden rounded-full">
                <Image src={review.avatar} alt="" fill sizes="42px" className="object-cover" />
              </span>
              <div className="flex flex-col gap-3xs">
                <p className="type-body-lg-bold">{review.name}</p>
                <p className="type-body-sm-bold opacity-70">{review.role}</p>
              </div>
            </div>
            <div className={`${card} flex flex-1 flex-col justify-between gap-3xs`}>
              <p className="type-h6 text-text-secondary">
                {review.text.map((part, i) => (
                  <span key={i} className={part.bright ? "text-text-primary" : undefined}>
                    {part.text}
                  </span>
                ))}
              </p>
              <div className="flex flex-col gap-xs">
                <p className="type-body-sm-bold opacity-70">{review.metric.label}</p>
                <p className="type-h5">{review.metric.value}</p>
              </div>
            </div>
          </Reveal>

          <Reveal kind="slide" className="h-full md:col-span-2">
            <BeforeAfter before={compare.before} after={compare.after} labels={compare.labels} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
