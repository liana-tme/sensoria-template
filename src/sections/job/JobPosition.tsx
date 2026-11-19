/*
 * Job: title, then two outlined boxes, all shown at once (no appear effects:
 * the text box is taller than a phone screen): job details (column 1) and "About the role" + the full
 * job text (columns 2–4). Phone: stacked. Details: label and value side by side on desktop,
 * stacked on tablet and phone.
 */
import { renderJob, type Job } from "@/lib/careers";
import { splitLastTwo } from "@/lib/text";
import type { CareersListContent } from "@/sections/careers-list/content";
import type { JobContent } from "./content";

export function JobPosition({ job, content, labels }: { job: Job; content: JobContent; labels: CareersListContent["labels"] }) {
  const rows = [
    [labels.type, job.type],
    [labels.salary, job.salary],
    [labels.location, job.location],
  ];
  return (
    <section className="mx-auto max-w-section px-section-x pt-page-top pb-section-y">
      <div className="flex flex-col gap-section-gap">
        <h1 className="max-w-heading text-balance type-h2">{job.title}</h1>
        <div className="flex flex-col gap-grid-gap md:grid md:grid-cols-4 md:items-start">
            <div className="flex flex-col gap-stack-sm rounded-card p-stack-sm inset-ring inset-ring-border">
              <p className="type-body-lg-bold">{content.detailsTitle}</p>
              <dl className="flex flex-col gap-sm">
                {rows.map(([label, value], i) => (
                  <div key={label} className="flex flex-col gap-sm">
                    {i > 0 && <span className="h-hairline bg-border" aria-hidden="true" />}
                    <div className="flex flex-col gap-xs lg:grid lg:grid-cols-2 lg:items-center">
                      <dt className="type-body-bold">{label}</dt>
                      <dd className="type-body-bold opacity-80">
                {splitLastTwo(value)[0]}
                <span className="whitespace-nowrap">{splitLastTwo(value)[1]}</span>
              </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col gap-stack-sm rounded-card p-box-pad inset-ring inset-ring-border md:col-span-3">
              <div className="flex flex-col gap-sm">
                <h2 className="max-w-heading type-h6">{labels.about}</h2>
                <p className="max-w-job-text type-body-lg opacity-80">{job.about}</p>
              </div>
              <span className="h-hairline bg-border" aria-hidden="true" />
              <div className="max-w-job-text" dangerouslySetInnerHTML={{ __html: renderJob(job) }} />
            </div>
          </div>
        
      </div>
    </section>
  );
}
