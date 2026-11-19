"use client";

/*
 * JobCard: a job with an outline.
 * - Tablet & desktop: a row (title + chevron, "Apply Now"). Clicking the title or chevron opens it:
 *   details (type, salary, location), a rule and "About the role" grow in (0.6s spring, the
 *   chevron turns). Closed, the row is vertically centred.
 * - Phone ("Phone" variant): always open with the details, no chevron, no "About the role";
 *   the button sits under the details.
 */
import { useId, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import type { Job } from "@/lib/careers";
import { splitLastTwo } from "@/lib/text";
import type { CareersListContent } from "./content";
import styles from "./JobCard.module.css";

export function JobDetails({ job, labels }: { job: Job; labels: CareersListContent["labels"] }) {
  const rows = [
    [labels.type, job.type],
    [labels.salary, job.salary],
    [labels.location, job.location],
  ];
  return (
    <dl className="flex flex-col gap-md">
      {rows.map(([label, value], i) => (
        <div key={label} className="flex flex-col gap-md">
          {i > 0 && <span className="h-hairline bg-border" aria-hidden="true" />}
          <div className={`grid grid-cols-2 ${i === rows.length - 1 ? "gap-xs" : "gap-job-row-gap"}`}>
            <dt className="type-body-bold">{label}</dt>
            <dd className="type-body-bold opacity-80">
                {splitLastTwo(value)[0]}
                <span className="whitespace-nowrap">{splitLastTwo(value)[1]}</span>
              </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

export function JobCard({ job, labels }: { job: Job; labels: CareersListContent["labels"] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <article
      className={`${styles.card} ${open ? styles.open : ""} flex flex-col gap-form-gap overflow-hidden rounded-card p-stack-sm inset-ring inset-ring-border md:flex-row md:gap-stack-sm ${
        open ? "md:items-start" : "md:items-center"
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <h3>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen(!open)}
            className="flex w-full items-center gap-text-gap text-left max-md:pointer-events-none"
          >
            <span className="flex-1 type-h6">{job.title}</span>
            <Icon name="chevron-up" className={`${styles.chevron} size-icon-md shrink-0 max-md:hidden`} />
            <span className="sr-only">{labels.open}</span>
          </button>
        </h3>
        <div id={id} className={styles.more}>
          <div className="min-h-0 overflow-hidden">
            <div className="flex flex-col gap-stack-sm pt-stack-sm">
              <JobDetails job={job} labels={labels} />
              <span className="h-hairline bg-border max-md:hidden" aria-hidden="true" />
              <div className="flex flex-col gap-text-gap max-md:hidden">
                <p className="type-body-lg-bold">{labels.about}</p>
                <p className="type-body-bold opacity-80">{job.about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shrink-0">
        <Button href={`/careers/${job.slug}`} label={labels.apply} />
      </div>
    </article>
  );
}
