/*
 * About Us: tag column on the left, heading, intro line and three cards.
 * - Desktop: 3 cards in a row. Tablet: 2 + the chart card full width. Phone: one column.
 * - The intro line and the cards rise into view (Reveal "rise").
 * - Card 1: drifting photo strip. Card 2: chat on a phone screen. Card 3: counter + bar chart.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { Counter } from "@/components/Counter/Counter";
import { Icon, type IconName } from "@/components/Icon/Icon";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import { Ticker } from "@/components/Ticker/Ticker";
import type { AboutContent } from "./content";
import styles from "./About.module.css";

function Card({
  icon,
  title,
  text,
  children,
  className = "",
}: {
  icon: IconName;
  title: string;
  text: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`flex flex-col gap-stack-sm overflow-hidden rounded-card px-stack-sm pt-stack-sm inset-ring inset-ring-border ${className}`}>
      <div className="flex flex-col gap-stack-sm">
        <h3 className="flex items-center gap-xs type-body-bold">
          <Icon name={icon} className="size-icon-sm shrink-0 text-accent" />
          {title}
        </h3>
        <p className="max-w-card-text text-balance type-lead-bold opacity-80">{text}</p>
      </div>
      {children}
    </article>
  );
}

export function About({ content, id }: { content: AboutContent; id?: string }) {
  const { analysis, rituals, tracking } = content;
  return (
    <section id={id} className="relative z-1 bg-page px-section-x pt-section-first pb-section-y">
      <div className="mx-auto flex max-w-content flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
        <div>
          <Tag label={content.tag} />
        </div>

        <div className="flex flex-col gap-section-gap md:col-span-3">
          <h2 className="max-w-heading type-h2">
            {content.heading.text} <span className="text-text-secondary">{content.heading.muted}</span>
          </h2>

          <Reveal kind="rise">
            <div className="flex flex-col items-start gap-stack-sm md:flex-row md:items-center">
              <Icon name="plus" strokeWidth={1.5} className="size-icon-lg shrink-0 opacity-30" />
              <p className="max-w-intro type-body-lg-bold text-text-secondary">
                {content.intro.map((part, i) => (
                  <span key={i} className={part.bright ? "text-text-primary" : undefined}>
                    {part.text}
                  </span>
                ))}
              </p>
            </div>
          </Reveal>

          <Reveal kind="rise">
            <div className="grid auto-rows-fr gap-grid-gap md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: drifting photo strip */}
              <Card icon={analysis.icon} title={analysis.title} text={analysis.text} className="pb-stack-sm">
                <div className="h-card-visual">
                  <Ticker label={analysis.title}>
                    {analysis.images.map((image) => (
                      <div key={image.src} className="relative h-full w-ticker-image-w overflow-hidden rounded-image-sm">
                        <Image src={image.src} alt={image.alt} fill sizes="180px" className="object-cover" />
                      </div>
                    ))}
                  </Ticker>
                </div>
              </Card>

              {/* Card 2: chat on a phone screen (drawn in code) */}
              <Card icon={rituals.icon} title={rituals.title} text={rituals.text}>
                <div className="flex flex-1 flex-col items-center">
                  <div className={`${styles.phone} flex w-full max-w-chat-w flex-1 flex-col justify-between gap-sm p-md`}>
                    <div className="flex flex-col gap-xs">
                      <div className="flex w-chat-head items-center gap-xs p-chat-head-pad">
                        <span className="relative size-avatar shrink-0 overflow-hidden rounded-full">
                          <Image src={rituals.assistant.avatar} alt="" fill sizes="24px" className="object-cover" />
                        </span>
                        <span className="type-body-sm-bold">{rituals.assistant.name}</span>
                      </div>
                      <p className="w-chat-bubble rounded-bubble bg-border p-sm type-chat">{rituals.message}</p>
                    </div>
                    <div className="flex items-center gap-xs rounded-input py-xs pr-xs pl-input-x inset-ring inset-ring-border" aria-hidden="true">
                      <span className="flex-1 type-caption-bold opacity-60">{rituals.placeholder}</span>
                      <span className="flex size-send shrink-0 items-center justify-center rounded-full bg-accent">
                        <Icon name="send" strokeWidth={1.5} className="size-icon-xs rotate-90 text-text-dark" />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Card 3: counter + bar chart */}
              <Card icon={tracking.icon} title={tracking.title} text={tracking.text} className="pb-stack-sm md:col-span-2 lg:col-span-1">
                <div className="relative flex h-card-visual flex-col justify-end">
                  <div className="absolute top-0 left-0 flex flex-col gap-3xs">
                    <div className="flex items-center gap-md">
                      <Counter from={tracking.metric.from} to={tracking.metric.to} suffix={tracking.metric.suffix} className="type-counter" />
                      <span className="rounded-full bg-white px-pill-x py-pill-y type-pill">{tracking.metric.badge}</span>
                    </div>
                    <p className="type-caption-bold opacity-70">{tracking.metric.label}</p>
                  </div>
                  <div className="flex h-graph-h items-end justify-center gap-xs lg:justify-start">
                    {tracking.bars.map((bar) => (
                      <div
                        key={bar.month}
                        className="flex w-bar-w flex-col gap-sm lg:w-auto lg:flex-1"
                        style={{ height: `${bar.height * 100}%` }}
                      >
                        <div
                          className={`flex flex-1 flex-col items-center justify-end rounded-bar p-sm ${bar.highlight ? "bg-accent" : "bg-border"}`}
                        >
                          <span className={`${styles.vertical} type-caption-bold ${bar.highlight ? "text-text-dark" : ""}`}>
                            {bar.value}
                          </span>
                        </div>
                        <span className="text-center type-caption-bold opacity-80">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
