/*
 * Analysis: tag + heading, a large video card, and a row of stats.
 * - The whole section is max --container-section wide incl. its padding (content 1240).
 * - Stats: desktop 5 columns (3 numbers + the paragraph over 2); tablet 3 numbers, paragraph below;
 *   phone one column. The row rises into view; the paragraph rises a little more.
 */
import { Counter } from "@/components/Counter/Counter";
import { Icon } from "@/components/Icon/Icon";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import { VideoCard } from "@/components/VideoCard/VideoCard";
import type { AnalysisContent } from "./content";
import styles from "./Analysis.module.css";

export function Analysis({ content, id }: { content: AnalysisContent; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-section bg-page px-section-x py-section-y">
      <div className="flex flex-col gap-section-gap">
        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <div>
            <Tag label={content.tag} />
          </div>
          <h2 className="max-w-heading type-h2 md:col-span-3">{content.heading}</h2>
        </div>

        <VideoCard
          video={content.video.src}
          poster={{ src: content.video.poster, alt: content.video.alt }}
          label={content.video.label}
        />

        <Reveal kind="rise">
          <div className="grid gap-x-grid-gap gap-y-section-gap md:grid-cols-3 lg:grid-cols-5">
            {content.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-stat-gap">
                <Counter
                  from={stat.from}
                  to={stat.to}
                  suffix={stat.suffix}
                  start="load"
                  pace="slow"
                  suffixGap="gap-3xs"
                  className="type-counter-lg"
                />
                <p className="type-body-bold opacity-70">{stat.label}</p>
              </div>
            ))}
            <Reveal kind="rise" className={`${styles.text} md:col-span-2`}>
              <div className="flex h-full flex-col items-start gap-stack-sm md:flex-row md:items-center">
                <Icon name="plus" strokeWidth={1.5} className="size-icon-lg shrink-0 opacity-30" />
                <p className="max-w-text type-body-lg-bold text-text-secondary">
                  {content.text.map((part, i) => (
                    <span key={i} className={part.bright ? "text-text-primary" : undefined}>
                      {part.text}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
