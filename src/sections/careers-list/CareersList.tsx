/*
 * Careers: page heading, then tag column + intro line and the jobs
 * (JobCard, gap grid-gap). Jobs come from src/content/careers/.
 * The list ends with 8px of empty space (kept from the original layout).
 */
import { Tag } from "@/components/Tag/Tag";
import type { Job } from "@/lib/careers";
import type { CareersListContent } from "./content";
import { JobCard } from "./JobCard";

export function CareersList({ content, jobs }: { content: CareersListContent; jobs: Job[] }) {
  return (
    <section className="mx-auto max-w-section px-section-x pt-page-top pb-section-y">
      <div className="flex flex-col gap-section-gap">
        <h1 className="max-w-heading type-h2">
          {content.heading.text}
          <span className="text-text-secondary">{content.heading.muted}</span>
        </h1>
        <div className="flex flex-col gap-stack-sm md:grid md:grid-cols-4 md:gap-grid-gap">
          <div>
            <Tag label={content.tag} />
          </div>
          <div className="flex flex-col gap-section-gap md:col-span-3">
            <p className="max-w-heading type-h4">
              <span className="text-text-secondary">{content.intro.muted}</span>
              {content.intro.text}
            </p>
            <div className="flex flex-col gap-grid-gap pb-xs">
              {jobs.map((job) => (
                <JobCard key={job.slug} job={job} labels={content.labels} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
