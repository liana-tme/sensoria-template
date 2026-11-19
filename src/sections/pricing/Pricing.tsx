/*
 * Pricing: tag + heading (words rise in), the plans (PricingTable),
 * and a founder's quote under them.
 * - Like Analysis, the section is max --container-section wide incl. its padding.
 * - Bottom: label in column 1, quote + founder in columns 2–4 (tablet up); phone stacked.
 */
import Image from "next/image";
import { Icon } from "@/components/Icon/Icon";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import { WordReveal } from "@/components/WordReveal/WordReveal";
import type { PricingContent } from "./content";
import { PricingTable } from "./PricingTable";

export function Pricing({ content, id }: { content: PricingContent; id?: string }) {
  const { founder } = content;
  return (
    <section id={id} className="mx-auto max-w-section bg-page px-section-x py-section-y">
      <div className="flex flex-col gap-section-gap">
        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <div>
            <Tag label={content.tag} />
          </div>
          <h2 className="max-w-heading type-h2 md:col-span-3">
            <WordReveal parts={[{ text: `${content.heading.text} ` }, { text: content.heading.muted, className: "text-text-secondary" }]} />
          </h2>
        </div>

        <PricingTable content={content} />

        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <p className="max-w-step-text type-body-bold opacity-70">{founder.label}</p>
          <div className="flex flex-col gap-stack-md md:col-span-3">
            <Reveal kind="rise">
              <div className="flex flex-col items-start gap-stack-sm md:flex-row md:items-center">
                <Icon name="plus" strokeWidth={1.5} className="size-icon-lg shrink-0 opacity-30" />
                <p className="max-w-quote-lg type-h5 text-text-secondary">
                  {founder.quote.map((part, i) => (
                    <span key={i} className={part.bright ? "text-text-primary" : undefined}>
                      {part.text}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
            <Reveal kind="fade">
              <div className="flex items-center gap-md">
                <span className="relative size-avatar-md shrink-0 overflow-hidden rounded-full">
                  <Image src={founder.avatar} alt="" fill sizes="42px" className="object-cover" />
                </span>
                <div className="flex flex-col gap-stat-gap">
                  <p className="type-body-lg-bold">{founder.name}</p>
                  <p className="type-body opacity-70">{founder.role}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
