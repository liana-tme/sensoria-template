# Legal pages and 404 — core rules (do not edit)

Source: `src/app/legal/[slug]/page.tsx`, `src/lib/legal.ts`, `src/sections/legal/`; documents in `src/content/legal/*.md`.
404: `src/app/not-found.tsx`, `src/sections/not-found/`. Both end with Get Started and the footer. No appear effects (as in the original design).

## Legal (`Legal.tsx`)
- Padding top `page-top`, bottom `section-y`. `h1` `type-h2`, gap `section-gap`; then gap `legal-gap` (64 / 48 / 32) between the intro row and the text.
- Intro row (tag-column grid; phone stacked, gap `stack-sm`): "Last updated" `type-body-bold` 80% + date `type-body-lg-bold` (gap `stat-gap`, max `legal-date`) in column 1; intro `type-h4` (max `heading`) in columns 2–4.
- Text in columns 2–4 (max `article-body`), rendered like journal articles (`renderArticle`): `##` → `type-h5`, paragraphs `type-lead`, lists with bullets, links `text-link`.
- Paragraphs keep their last two words together, also when the last word is a link (`noOrphanHtml`).

## 404 (`NotFound.tsx`)
- Real 404 status (Next.js `not-found`). Tag column + a column (gap `notfound-gap`: 42 / 32 / 24): the number in `type-display` (190 / 140 / 64, bold), one line `type-h6` (max `notfound-text`), `Button` home. Phone: the tag above (gap `md`).

## Never
- Keep the file names `privacy-policy` and `terms-of-service`: the footer, menu and forms link to them.
