/*
 * Principles: tag column + heading (words rise in), then cards
 * Card: accent square with a dark icon, title and one sentence.
 * - Desktop: 3 in a row. Tablet: 2 columns, rows of equal height. Phone: one column.
 * - The cards rise in together (Reveal "cards": 40px, 0.5s).
 */
import { Icon } from "@/components/Icon/Icon";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import { WordReveal } from "@/components/WordReveal/WordReveal";
import type { PrinciplesContent } from "./content";

export function Principles({
  content,
  id,
  equalRows = true,
}: {
  content: PrinciplesContent;
  id?: string;
  /** Tablet: all rows as tall as the tallest card (About, job pages); false = each row fits its cards (Careers). */
  equalRows?: boolean;
}) {
  return (
    <section id={id} className="mx-auto max-w-section px-section-x py-section-y">
      <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
        <div>
          <Tag label={content.tag} />
        </div>
        <div className="flex flex-col gap-section-gap md:col-span-3">
          <h2 className="max-w-heading type-h2">
            <WordReveal parts={[{ text: content.heading }]} />
          </h2>
          <Reveal kind="cards">
            <div className={`grid gap-grid-gap md:grid-cols-2 lg:grid-cols-3 lg:items-start ${equalRows ? "md:auto-rows-fr" : ""}`}>
              {content.items.map((item) => (
                <article key={item.title} className="flex flex-col items-start gap-card-pad rounded-card p-stack-sm inset-ring inset-ring-border">
                  <span className="flex size-icon-box items-center justify-center rounded-icon-box bg-accent text-text-dark">
                    <Icon name={item.icon} strokeWidth={1.8} className="size-icon-md" />
                  </span>
                  <div className="flex w-feature-text flex-col gap-text-gap">
                    <h3 className="type-h6">{item.title}</h3>
                    <p className="max-w-feature-desc type-body-lg-bold opacity-80">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
