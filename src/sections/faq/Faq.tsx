/*
 * FAQ: tag + heading (words rise in), a "talk to us" card and the questions.
 * - Desktop: card in column 1, questions in columns 2–4. Tablet: card full width above.
 *   Phone: one column. The card and the list fade in (0.1s / 0.2s).
 * - Like Analysis, the section is max --container-section wide incl. its padding.
 */
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import { WordReveal } from "@/components/WordReveal/WordReveal";
import type { FaqContent } from "./content";
import { FaqList } from "./FaqList";
import styles from "./Faq.module.css";

export function Faq({ content, id }: { content: FaqContent; id?: string }) {
  const { contact } = content;
  return (
    <section id={id} className="mx-auto max-w-section bg-page px-section-x py-section-y">
      <div className="flex flex-col gap-section-gap">
        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <div>
            <Tag label={content.tag} />
          </div>
          <h2 className="max-w-heading type-h2 md:col-span-3">
            <WordReveal parts={[{ text: content.heading }]} />
          </h2>
        </div>

        <div className="flex flex-col gap-grid-gap lg:grid lg:grid-cols-4 lg:items-start">
          <Reveal kind="fade" className={styles.first}>
            <div className="flex flex-col gap-stack-sm rounded-card p-stack-sm inset-ring inset-ring-border">
              <Icon name="message-question" className="size-faq-icon text-white" />
              <div className="flex flex-col gap-sm">
                <h3 className="max-w-step-text type-h6">{contact.title}</h3>
                <p className="max-w-step-text text-balance type-body-bold opacity-70">{contact.text}</p>
              </div>
              <Button href={contact.action.href} label={contact.action.label} wide />
            </div>
          </Reveal>
          <Reveal kind="fade" className={`${styles.second} lg:col-span-3`}>
            <FaqList items={content.items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
