/*
 * Concept (Home page).
 * - An accent panel the size of the screen sticks to the top while the page scrolls over it:
 *   grain, white tag, huge title, button, two thin plus marks in the bottom corners.
 *   Its title block grows from nothing as it enters the screen (ScrollEntry: scale + opacity).
 * - A 3×3 grid of square photos (X pattern, empty cells show the panel) scrolls up over the panel,
 *   leaning back --motion-concept-tilt and straightening as it enters. Phone: 2 columns.
 * - An empty run (--spacing-concept-tail) keeps the panel on screen a little longer.
 */
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { ScrollEntry } from "@/components/ScrollEntry/ScrollEntry";
import { Tag } from "@/components/Tag/Tag";
import type { ConceptContent } from "./content";
import styles from "./Concept.module.css";

/* Grid cells, column by column: photo index or null (empty). */
const COLUMNS: (number | null)[][] = [
  [0, null, 1],
  [null, 2, null],
  [3, null, 4],
];

export function Concept({ content, id }: { content: ConceptContent; id?: string }) {
  return (
    <section id={id} className="bg-page py-section-y">
      <div className="sticky top-0 z-1 flex h-screen items-center justify-center bg-accent px-section-x py-section-y">
        <span className={`${styles.grain} pointer-events-none absolute inset-0`} aria-hidden="true" />
        <ScrollEntry className="relative z-5 w-full">
          <div className={`${styles.grow} flex flex-col items-center gap-concept-stack`}>
            <div className="flex flex-col items-center gap-md">
              <Tag label={content.tag} tone="white" />
              <h2 className="max-w-hero-title text-center type-h2-lg">{content.title}</h2>
            </div>
            <Button href={content.action.href} label={content.action.label} />
          </div>
        </ScrollEntry>
        <Icon name="plus" strokeWidth={1.5} className="absolute bottom-concept-corner left-concept-corner size-icon-lg text-white opacity-70" />
        <Icon name="plus" strokeWidth={1.5} className="absolute right-concept-corner bottom-concept-corner size-icon-lg text-white opacity-70" />
      </div>

      <ScrollEntry className="relative z-1 mx-auto max-w-content">
        <div className={`${styles.tilt} flex gap-section-gap p-concept-pad`}>
          {COLUMNS.map((column, c) => (
            <div key={c} className={`flex flex-1 flex-col gap-concept-row ${c === 2 ? "max-md:hidden" : ""}`}>
              {column.map((index, r) => {
                const image = index === null ? null : content.images[index];
                return (
                  <div key={r} className="max-md:px-xs max-md:pt-xs max-md:pb-sm">
                    <div className="relative aspect-square overflow-hidden rounded-card">
                      {image && (
                        <Image src={image.src} alt={image.alt} fill sizes="(width >= 810px) 33vw, 50vw" className="object-cover" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </ScrollEntry>

      <div className="h-concept-tail" aria-hidden="true" />
    </section>
  );
}
