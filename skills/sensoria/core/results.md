# Results — core rules (do not edit)

Source: `src/sections/results/`. Home, after How it Works (`#results`).

## Structure
- Like Analysis: max `section` wide incl. padding (content 1240). Gap `section-gap`.
1. Heading row: `Tag` (column 1 of 4 from tablet) + `h2` `type-h2` spanning 3, words revealed with `WordReveal` (white part + `text-accent` part). The accent part starts a new line on phone and desktop and stays on the same line on tablet (as in the original).
2. Row, fixed height `results-h` (1240 / 920 / 520), equal rows (`auto-rows-fr`), gap `grid-gap`: desktop 4 columns, tablet 2, phone 1.
   - Highlight (Reveal `fade`, delay `--motion-fade-delay-1`): card (`rounded-card`, 1px `border` inside, padding `card-pad`) with `Logo` + `type-h4` title (gap `stack-sm`) at the top and a `type-body-bold` 80% quote (max `quote`) at the bottom (min gap `step-gap`); under the card, `Button wide` (gap `grid-gap`).
   - Review (Reveal `fade`, delay `--motion-fade-delay-2`), height `results-overhang` (1% taller than the row, as in the original): top card — avatar `avatar-md` + name `type-body-lg-bold` + role `type-body-sm-bold` 70%; bottom card (fills) — review `type-h6` (`text-primary` + `text-secondary`) at the top, metric label `type-body-sm-bold` 70% + value `type-h5` at the bottom.
   - Comparison (Reveal `slide`), spans 2 columns: `BeforeAfter`.

## BeforeAfter (`src/components/BeforeAfter/`)
- Before photo underneath; after photo clipped to the right of the divider (`clip-path`). An invisible full-size range input moves the divider on drag or click (keyboard works too).
- Divider: 1px `glass` line; handle `handle` round, `glass` fill, `glass-edge` outline, two white arrow heads.
- Labels: pills in the top corners (`stack-sm` in), `bg-page`, 1px `border`, `type-body-sm-bold`; clicking one slides the divider all the way (`--motion-compare-jump`).

## Never
- No autoplay of the divider, no zoom on the photos, no extra cards in the row.
