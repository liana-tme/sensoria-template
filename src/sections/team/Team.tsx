/*
 * Team: tag + heading (words rise in), then the invitation card and
 * portrait cards, all --spacing-team-card tall.
 * - Desktop: 4 in a row. Tablet: 2 × 2. Phone: one column.
 * - Cards fade in one after another (0.1s, 0.2s, 0.3s, 0.4s; repeating for every next row of four).
 * - Portrait card: photo with a dark fade at the bottom, plus top right,
 *   name and role at the bottom.
 */
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { Logo } from "@/components/Logo/Logo";
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import { WordReveal } from "@/components/WordReveal/WordReveal";
import type { TeamContent } from "./content";
import styles from "./Team.module.css";

const delays = [styles.d1, styles.d2, styles.d3, styles.d4];

export function Team({ content, id }: { content: TeamContent; id?: string }) {
  const { invite } = content;
  return (
    <section id={id} className="mx-auto max-w-section px-section-x py-section-y">
      <div className="flex flex-col gap-section-gap">
        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <div>
            <Tag label={content.tag} />
          </div>
          <h2 className="max-w-heading type-h2 md:col-span-3">
            <WordReveal parts={[{ text: content.heading }]} />
          </h2>
        </div>

        <div className="grid gap-grid-gap md:grid-cols-2 lg:grid-cols-4">
          <Reveal kind="fade" className={delays[0]}>
            <div className="flex h-team-card flex-col gap-grid-gap">
              <div className="flex flex-1 flex-col items-start justify-between gap-careers-gap rounded-card p-card-pad inset-ring inset-ring-border">
                <div className="flex flex-col gap-stack-sm">
                  <Logo logo={invite.logo} />
                  <h3 className="max-w-careers-title type-h4">{invite.title}</h3>
                </div>
                <p className="max-w-careers-text type-body-bold opacity-80">{invite.text}</p>
              </div>
              <Button href={invite.action.href} label={invite.action.label} wide />
            </div>
          </Reveal>
          {content.members.map((member, i) => (
            <Reveal key={member.name} kind="fade" className={delays[(i + 1) % delays.length]}>
              <article className="relative flex h-team-card flex-col items-end justify-between overflow-hidden rounded-card p-stack-sm">
                <Image src={member.image.src} alt={member.image.alt} fill sizes="(width >= 1200px) 25vw, (width >= 810px) 50vw, 100vw" className="object-cover" />
                <span className={`${styles.shade} absolute inset-0 opacity-50`} aria-hidden="true" />
                <Icon name="plus" strokeWidth={1.5} className="relative size-icon-lg opacity-50" />
                <div className="relative flex w-full flex-col gap-3xs">
                  <h3 className="type-h6">{member.name}</h3>
                  <p className="type-body-lg-bold opacity-80">{member.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
