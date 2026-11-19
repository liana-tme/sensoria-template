/*
 * 404: tag column + a huge "404" (type-display), one line and a button
 * home, gap notfound-gap. Phone: tag above. No appear effects, as in the original design.
 */
import { Button } from "@/components/Button/Button";
import { Tag } from "@/components/Tag/Tag";
import type { NotFoundContent } from "./content";

export function NotFound({ content }: { content: NotFoundContent }) {
  return (
    <section className="mx-auto max-w-section px-section-x pt-page-top pb-section-y">
      <div className="flex flex-col gap-md md:grid md:grid-cols-4 md:gap-grid-gap">
        <div>
          <Tag label={content.tag} />
        </div>
        <div className="flex flex-col items-start gap-notfound-gap md:col-span-3">
          <h1 className="max-w-heading type-display">{content.number}</h1>
          <p className="max-w-notfound-text type-h6">{content.text}</p>
          <Button href={content.action.href} label={content.action.label} />
        </div>
      </div>
    </section>
  );
}
