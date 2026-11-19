# Careers — core rules (do not edit)

Source: `src/app/careers/page.tsx`, `src/app/careers/[slug]/page.tsx`, `src/lib/careers.ts` (reading + Markdown styles),
`src/sections/careers-list/` (CareersList, JobCard), `src/sections/job/` (JobPosition, JobApply, ApplyForm),
`src/sections/standards/content.ts` (shown with `Principles`). Jobs: `src/content/careers/*.md`.
Both pages: … → Standards → Get Started → footer.

## Careers list (`CareersList.tsx`)
- Padding top `page-top`, bottom `section-y`. `h1` `type-h2` (white + muted). Tag column + intro `type-h4` (muted part first) and the job cards (gap `grid-gap`, 8px empty space after the list as in the original design).

## Job card (`JobCard.tsx`)
- 1px `border` inside, `rounded-card`, padding `stack-sm`. Title `type-h6`; details: rows of label + value (`type-body-bold`, value 80%) in 2 columns (gap `job-row-gap`, last row `xs`), `border` hairlines between, gap `md`.
- Tablet & desktop: row with title + `chevron-up` (`icon-md`, turned 180° while closed) and `Button` "Apply Now" (gap `stack-sm`). Clicking the title opens the card: details, a rule and "About the role" (`type-body-lg-bold` + `type-body-bold` 80%, gap `text-gap`) grow in (`--motion-card-open-duration`, `--ease-spring-card`). Closed: vertically centred; open: top-aligned.
- Phone: always open, details only, the button under them (gap `form-gap`).
- Detail values keep their last two words together (`splitLastTwo`).

## Job page
- `JobPosition.tsx`: `h1` `type-h2` (balanced) and two outlined boxes, all shown at once (no appear effects — the text box can be taller than a screen): details (column 1; padding `stack-sm`, title `type-body-lg-bold`, rows gap `sm`, label/value side by side only on desktop) and the role (columns 2–4; padding `box-pad`: heading `type-h6`, text `type-body-lg` 80% max `job-text`, a hairline, then the job text max `job-text`). Phone: stacked.
- Job text Markdown (`src/lib/careers.ts`): `###` → `type-h6` (`article-heading` above), paragraphs and lists `type-body-lg` (lists like the journal).
- `JobApply.tsx` (`#apply`): tag column + "Apply now" with `WordReveal`; the form lifts in 20px / 0.4s. `ApplyForm`: four `Field`s (name, e-mail, résumé link, cover letter) gap `form-gap`, `SubmitButton` + note (gap `md`). `useStaticForm`; the job title goes into the subject and a hidden "Position" field.

## Standards
- `Principles` with `standardsContent` (6 cards). Careers page: `equalRows={false}` (rows fit their cards); job pages: equal rows.

## Never
- No database, no login, no file upload (the résumé is a link). Static site only.
