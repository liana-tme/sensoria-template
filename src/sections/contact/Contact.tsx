/*
 * Contact: page heading, then tag column + the contact form
 * (columns 2–4; phone: stacked). No appear effects, as in the original design.
 * Reused on another page: `headingLevel="h2"` (same look) (it then takes normal section spacing).
 */
import { Tag } from "@/components/Tag/Tag";
import type { ContactContent } from "./content";
import { ContactForm } from "./ContactForm";

export function Contact({
  content,
  headingLevel = "h1",
}: {
  content: ContactContent;
  /** "h1" on the Contact page; "h2" when the form is reused lower on another page (one h1 per page). */
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  return (
    <section className={`mx-auto max-w-section px-section-x pb-section-y ${headingLevel === "h1" ? "pt-page-top" : "pt-section-y"}`}>
      <div className="flex flex-col gap-section-gap">
        <Heading className="max-w-heading type-h2">
          {content.heading.text}
          <span className="text-text-secondary">{content.heading.muted}</span>
        </Heading>
        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <div>
            <Tag label={content.tag} />
          </div>
          <div className="md:col-span-3">
            <ContactForm form={content.form} />
          </div>
        </div>
      </div>
    </section>
  );
}
