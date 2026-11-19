/*
 * Legal document: title, then "Last updated" + date (column 1) beside the
 * intro (type-h4, columns 2–4), then the text in columns 2–4 (article look, max article-body).
 * Phone: stacked. No appear effects, as in the original design.
 */
import { formatDate } from "@/lib/date";
import { renderArticle } from "@/lib/journal";
import type { LegalDoc } from "@/lib/legal";
import type { LegalContent } from "./content";

export function Legal({ doc, content }: { doc: LegalDoc; content: LegalContent }) {
  return (
    <section className="mx-auto max-w-section px-section-x pt-page-top pb-section-y">
      <article className="flex flex-col gap-section-gap">
        <h1 className="max-w-heading type-h2">{doc.title}</h1>
        <div className="flex flex-col gap-legal-gap">
          <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
            <div className="flex max-w-legal-date flex-col gap-stat-gap">
              <p className="type-body-bold opacity-80">{content.updatedLabel}</p>
              <p className="type-body-lg-bold">
                <time dateTime={doc.date}>{formatDate(doc.date)}</time>
              </p>
            </div>
            <p className="max-w-heading type-h4 md:col-span-3">{doc.intro}</p>
          </div>
          <div className="md:grid md:grid-cols-4 md:gap-grid-gap">
            <div className="max-w-article-body md:col-span-3 md:col-start-2" dangerouslySetInnerHTML={{ __html: renderArticle(doc.body) }} />
          </div>
        </div>
      </article>
    </section>
  );
}
