/*
 * How it Works: tag + two-tone heading, a photo with four step
 * cards, and a button. Static (no motion), as in the original.
 * - Desktop: 4 columns — the photo fills column 1 (as tall as the steps), steps 2×2 in columns 2–4;
 *   the button lines up with the steps.
 * - Tablet: the photo full width on top (wide), steps 2×2 below, button on the left.
 * - Phone: photo, then the steps in one column, then the button.
 * - Like Analysis, the section is max --container-section wide incl. its padding.
 */
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { Tag } from "@/components/Tag/Tag";
import type { HowItWorksContent } from "./content";

export function HowItWorks({ content, id }: { content: HowItWorksContent; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-section bg-page px-section-x py-section-y">
      <div className="flex flex-col gap-section-gap">
        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <div>
            <Tag label={content.tag} />
          </div>
          <h2 className="max-w-heading type-h2 md:col-span-3">
            {content.heading.text} <span className="text-text-secondary">{content.heading.muted}</span>
          </h2>
        </div>

        <div className="flex flex-col gap-grid-gap lg:grid lg:grid-cols-4">
          <div className="relative aspect-steps overflow-hidden rounded-card md:aspect-steps-wide lg:aspect-auto">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(width >= 1200px) 25vw, 100vw"
              className="object-cover"
            />
          </div>
          <ol className="grid gap-grid-gap md:grid-cols-2 lg:col-span-3">
            {content.steps.map((step) => (
              <li
                key={step.number}
                className="flex flex-col gap-step-gap rounded-card p-stack-sm inset-ring inset-ring-border"
              >
                <span className="type-lead-bold text-accent">{step.number}</span>
                <div className="flex flex-col gap-sm">
                  <h3 className="max-w-step-text type-h6">{step.title}</h3>
                  <p className="max-w-step-text type-body-bold opacity-70">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Phone: 8px more above the button (the original keeps an empty grid cell there). */}
        <div className="max-md:pt-grid-gap lg:grid lg:grid-cols-4 lg:gap-grid-gap">
          <div className="lg:col-start-2">
            <Button href={content.action.href} label={content.action.label} />
          </div>
        </div>
      </div>
    </section>
  );
}
