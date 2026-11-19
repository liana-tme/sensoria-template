"use client";

/*
 * PricingTable: a Monthly / Yearly switch and
 * the plan cards; the switch changes the prices at once (no animation, as in the original).
 * - Desktop: switch over column 2; the custom card in column 1 (as tall as the plans), plans side by side in columns 2–4.
 * - Tablet: switch over column 2; plans side by side, the custom card full width below.
 * - Phone: switch on the left; everything in one column, the custom card last.
 * - Motion: the switch fades in, the cards float up (0.3s after they come into view).
 */
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { Reveal } from "@/components/Reveal/Reveal";
import type { Plan, PricingContent } from "./content";
import styles from "./Pricing.module.css";

function PlanCard({ plan, yearly, billing }: { plan: Plan; yearly: boolean; billing: PricingContent["billing"] }) {
  return (
    <article className="flex flex-1 flex-col gap-plan-gap rounded-card p-stack-sm inset-ring inset-ring-border">
      <div className="flex flex-col gap-stack-sm">
        <div className="flex flex-col gap-sm">
          <h3 className="flex items-center gap-xs type-body-bold">
            <Icon name={plan.icon} className="size-icon-sm shrink-0 text-accent" />
            {plan.title}
          </h3>
          <p className="flex items-end">
            <span className="type-h3">{yearly ? plan.price.yearly : plan.price.monthly}</span>
            <span className="type-body-sm-bold opacity-80">{yearly ? billing.perYear : billing.perMonth}</span>
          </p>
        </div>
        <p className="type-body opacity-80">{plan.description}</p>
      </div>
      <div className={`${styles.dash} h-hairline`} aria-hidden="true" />
      <ul className="flex flex-col gap-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-xs type-body-bold">
            <Icon name="plus" className="size-icon-xs shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Button href={plan.action.href} label={plan.action.label} wide />
    </article>
  );
}

export function PricingTable({ content }: { content: PricingContent }) {
  const [yearly, setYearly] = useState(false);
  const { billing, custom } = content;
  const option = (active: boolean) =>
    `rounded-full px-stack-sm py-sm type-body-bold ${active ? "bg-white text-text-dark" : "text-text-primary"}`;

  return (
    <div className="flex flex-col gap-stack-md">
      <div className="md:grid md:grid-cols-4 md:gap-3xs">
        <Reveal kind="fade" className={`${styles.later} md:col-start-2 md:col-span-3`}>
          <div role="group" aria-label="Billing period" className="inline-flex rounded-full bg-glass-faint p-3xs">
            <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)} className={option(!yearly)}>
              {billing.monthly}
            </button>
            <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)} className={option(yearly)}>
              {billing.yearly}
            </button>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col gap-grid-gap lg:grid lg:grid-cols-4">
        <Reveal kind="float" className={`${styles.later} ${styles.near} order-last h-custom-h lg:order-first lg:h-auto`}>
          <div className="relative flex h-full flex-col justify-between gap-custom-gap overflow-hidden rounded-card p-stack-sm">
            <Image src={custom.image.src} alt={custom.image.alt} fill sizes="(width >= 1200px) 25vw, 100vw" className="object-cover brightness-32" />
            <div className="relative flex flex-col gap-sm">
              <p className="type-body-lg-bold">{custom.tag}</p>
              <h3 className="max-w-step-text type-h4">
                {custom.title.text}
                <span className="text-text-secondary">{custom.title.muted}</span>
              </h3>
            </div>
            <a href={`mailto:${custom.email}`} target="_blank" rel="noopener" className="relative max-w-email type-h6 text-link">
              {custom.email}
            </a>
          </div>
        </Reveal>
        <Reveal kind="float" className={`${styles.later} flex flex-col gap-grid-gap md:flex-row lg:col-span-3`}>
          {content.plans.map((plan) => (
            <PlanCard key={plan.title} plan={plan} yearly={yearly} billing={billing} />
          ))}
        </Reveal>
      </div>
    </div>
  );
}
