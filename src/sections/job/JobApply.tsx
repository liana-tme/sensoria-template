/*
 * Apply: tag column + "Apply now" (words rise in) and the
 * form, which lifts in (20px, 0.4s).
 */
import { Reveal } from "@/components/Reveal/Reveal";
import { Tag } from "@/components/Tag/Tag";
import { WordReveal } from "@/components/WordReveal/WordReveal";
import { ApplyForm } from "./ApplyForm";
import type { JobContent } from "./content";
import styles from "./Job.module.css";

export function JobApply({ apply, position }: { apply: JobContent["apply"]; position: string }) {
  return (
    <section id="apply" className="mx-auto max-w-section px-section-x py-section-y">
      <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
        <div>
          <Tag label={apply.tag} />
        </div>
        <div className="flex flex-col gap-section-gap md:col-span-3">
          <h2 className="max-w-heading type-h2">
            <WordReveal parts={[{ text: apply.heading }]} />
          </h2>
          <Reveal kind="lift" className={styles.form}>
            <ApplyForm apply={apply} position={position} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
