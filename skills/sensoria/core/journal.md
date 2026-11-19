# Journal — core rules (do not edit)

Source: `src/app/journal/page.tsx`, `src/app/journal/[slug]/page.tsx`, `src/lib/journal.ts` (reading + Markdown styles),
`src/sections/journal-list/`, `src/sections/article/`, `src/components/PostCard/`. Articles: `src/content/journal/*.md`.
Both pages end with Get Started and the footer.

## Journal list (`JournalList.tsx`, `JournalGrid.tsx`)
- Padding top `page-top`, bottom `section-y`; gap `section-gap`. `h1` `type-h2`: white + `text-secondary` part.
- Cards in 2 columns (phone 1), gap `grid-gap`; desktop uses the large card. First `pageSize` (6) cards; the "Load More" `Button` (no href, onClick) appears centred under the grid only when there are more, and shows `pageSize` more each time.

## Post card (`PostCard.tsx`)
- Link to `/journal/<slug>`, `rounded-card`, photo fills it under a `--gradient-post-shade` fade at 50%. Date `type-body-bold` (max `post-date`) + title (max `post-title`) at the bottom.
- `sm`: height `post-card`, padding `card-pad`, gap `md`, title `type-h4`. `lg` on desktop: height `post-card-lg`, padding `post-pad-lg`, gap `stack-sm`, title `type-h3`.
- Hover: photo grows to `--motion-video-hover-scale` and blurs `--blur-video` (`--motion-card-hover-duration`, `--ease-soft`).

## Article (`Article.tsx`)
- `h1` `type-h2` (max `article-title`). Intro row (tag-column grid; phone stacked, gap `stack-sm`): author at the bottom of column 1 — photo `avatar-author` round, gap `md`, name `type-body-lg-bold` + role `type-body-bold` 80% (max `author-text`, gap `name-gap`); intro `type-h5` in columns 2–4.
- `ParallaxImage` banner (`aspect-landscape`, `rounded-card`).
- Tag column + text (max `article-body`). Markdown styles (src/lib/journal.ts): `##` → `type-h5` (`article-heading` above), paragraph → `type-lead` (`article-p` above), lists `type-lead` with the bullet / number in `list-indent` (`article-list` above), `>` → `type-quote` italic with a `quote-bar` accent bar, `quote-indent` padding. Paragraphs, items and quotes keep their last two words together (`noOrphanHtml`).

## More Insights (`MoreInsights.tsx`)
- Tag column + `h2` with `WordReveal`; `count` (2) other articles as `sm` cards (desktop 2 in a row, tablet & phone stacked), rising in together (Reveal `cards`).

## Never
- No database or comments; articles stay Markdown files read at build time.
