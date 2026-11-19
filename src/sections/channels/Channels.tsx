/*
 * Channels: tag column + "Direct contact" (words rise in), a line
 * with the thin plus, then contact cards that rise in together.
 * - Desktop: cards side by side; tablet & phone: stacked.
 * - Card: accent icon square, title + text (max contact-text), an underlined link (type-h6)
 *   that turns accent on hover (--motion-link-fast).
 */
import { Icon } from "@/components/Icon/Icon";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import { WordReveal } from "@/components/WordReveal/WordReveal";
import type { ChannelsContent } from "./content";
import styles from "./Channels.module.css";

export function Channels({ content, id }: { content: ChannelsContent; id?: string }) {
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
          <div className="flex flex-col items-start gap-stack-sm md:flex-row md:items-center">
            <Icon name="plus" strokeWidth={1.5} className="size-icon-lg shrink-0 opacity-30" />
            <p className="max-w-intro-lg type-body-lg-bold">
              {content.note.text}
              <span className="text-text-secondary">{content.note.muted}</span>
            </p>
          </div>
          <Reveal kind="cards">
            <div className="flex flex-col gap-grid-gap lg:flex-row lg:items-start">
              {content.items.map((item) => (
                <article key={item.title} className="flex flex-1 flex-col items-start gap-card-pad rounded-card p-stack-sm inset-ring inset-ring-border">
                  <span className="flex size-icon-box items-center justify-center rounded-icon-box bg-accent text-text-dark">
                    <Icon name={item.icon} strokeWidth={1.8} className="size-icon-md" />
                  </span>
                  <div className="flex w-full flex-col gap-text-gap">
                    <h3 className="max-w-contact-text type-h6">{item.title}</h3>
                    <p className="max-w-contact-text type-body-lg-bold opacity-80">{item.text}</p>
                  </div>
                  <a href={item.link.href} className={`${styles.link} type-h6 underline`}>
                    {item.link.label}
                  </a>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
