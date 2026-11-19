# About page — core rules (do not edit)

Source: `src/app/about/page.tsx` and `src/sections/about-intro/`, `team/`, `awards/`, `principles/`, `vision/`.
Order: Navigation → About intro → Team → Awards → Principles → Vision → Get Started → Footer. No preloader.
Every section is max `section` wide incl. its padding (`px-section-x`); Vision is full width.

## About intro (`AboutIntro.tsx`)
- Padding top `page-top`, bottom `section-y`; gap `section-gap`.
- `h1` `type-h2` (max `heading`): white part + `text-secondary` part.
- `ParallaxImage`: `aspect-landscape`, `rounded-card`.
- Tag column + columns 2–4 (phone stacked, gap `stack-sm`): statement `type-h5` (max `heading`) with muted parts; a line with the thin `plus` (`icon-lg`, 30%) + `type-body-lg-bold` (max `intro-lg`); two `aspect-photo` photos (`rounded-card`, gap `grid-gap`, phone stacked) that fade in at `--motion-fade-delay-1` / `-2`.

## Team (`Team.tsx`)
- Tag + `h2` with `WordReveal`. Cards `h-team-card` (510 / 471 / 430), gap `grid-gap`: desktop 4 in a row, tablet 2 × 2, phone 1 column. Each fades in, delays `--motion-fade-delay-1…4` (repeating for every next row of four).
- Invitation card (`invite`): 1px `border` inside, `rounded-card`, padding `card-pad`, content spread top/bottom (`careers-gap` at least): `Logo`, title `type-h4` (max `careers-title`) gap `stack-sm`; text `type-body-bold` 80% (max `careers-text`). Under it `Button wide`.
- Portrait card: photo, `--color-shade` fade at 50% (transparent → black), padding `stack-sm`; `plus` `icon-lg` 50% top right; name `type-h6` + role `type-body-lg-bold` 80% at the bottom (gap `3xs`).

## Awards (`Awards.tsx`)
- Tag column + heading `type-h2` (white + muted). Line with the thin plus rises in when half visible (`threshold 0.5`); the list rises in.
- Rows gap `stack-sm`, a `divider` hairline after each row. Row: source `type-body-bold` 80%, gap `stat-gap`, award `type-h5`; the date on the right (`type-body-bold` 80%). Phone: date after the source with a white `dot` (gap `xs`).

## Principles (`Principles.tsx`)
- Tag column + `h2` with `WordReveal`. Cards rise in together (Reveal `cards`).
- Grid gap `grid-gap`: desktop 3 columns, tablet 2 with equal row heights, phone 1.
- Card: 1px `border` inside, `rounded-card`, padding `stack-sm`, gap `card-pad`: `icon-box` accent square (`rounded-icon-box`) with a `text-dark` icon (`icon-md`, stroke 1.8); text block `feature-text` wide: title `type-h6`, gap `text-gap`, text `type-body-lg-bold` 80% (max `feature-desc`).

## Vision (`Vision.tsx`)
- Full screen height (`h-screen`), padding `vision-y` / `vision-x`, `ParallaxImage` behind everything, under a light `veil-soft` that keeps the quote readable.
- Top: Tag (white) + quote `type-h3` (max `quote`), gap `vision-gap`; the quote floats in (`--motion-quote-duration`). Bottom: name `type-h6` + role `type-body-bold` 80% (max `author`, gap `stat-gap`). Both inset `vision-inset`, max `content`.

## Never
- No extra animations; no photos without alt text; keep one quote only in Vision.
