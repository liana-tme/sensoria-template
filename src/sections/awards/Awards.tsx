/*
 * Awards: tag column + heading, a line with the thin plus, then rows
 * with a rule under each.
 * - Row: source (small, 80%) above the award (type-h5); the date on the right.
 *   Phone: the date moves next to the source after a dot.
 * - The line rises in once half of it is visible; the list rises in.
 */
import { Fragment } from "react";
import { Icon } from "@/components/Icon/Icon";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import type { AwardsContent } from "./content";

export function Awards({ content, id }: { content: AwardsContent; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-section px-section-x py-section-y">
      <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
        <div>
          <Tag label={content.tag} />
        </div>
        <div className="flex flex-col gap-section-gap md:col-span-3">
          <h2 className="max-w-heading type-h2">
            {content.heading.text}
            <span className="text-text-secondary">{content.heading.muted}</span>
          </h2>
          <Reveal kind="rise" threshold={0.5}>
            <div className="flex flex-col items-start gap-stack-sm md:flex-row md:items-center">
              <Icon name="plus" strokeWidth={1.5} className="size-icon-lg shrink-0 opacity-30" />
              <p className="max-w-intro type-body-lg-bold">
                {content.note.text}
                <span className="text-text-secondary">{content.note.muted}</span>
              </p>
            </div>
          </Reveal>
          <Reveal kind="rise">
            <ul className="flex flex-col gap-stack-sm">
              {content.items.map((item) => (
                <Fragment key={item.title}>
                  <li className="flex items-center gap-stack-sm">
                    <div className="flex flex-1 flex-col gap-stat-gap">
                      <p className="flex items-center gap-xs type-body-bold opacity-80">
                        {item.source}
                        <span className="size-dot shrink-0 rounded-full bg-white md:hidden" aria-hidden="true" />
                        <span className="md:hidden">{item.date}</span>
                      </p>
                      <h3 className="type-h5">{item.title}</h3>
                    </div>
                    <p className="hidden type-body-bold opacity-80 md:block">{item.date}</p>
                  </li>
                  <li className="h-hairline bg-divider" aria-hidden="true" />
                </Fragment>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
