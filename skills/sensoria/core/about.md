# About Us — core rules (do not edit)

Source: `src/sections/about/`. Home, first section after the hero (`#about`).

## Structure
- `bg-page`, padding `section-x`, top `section-first` (200 / 100 / 80), bottom `section-y`. Content max `content`.
- From tablet: a 4-column grid, gap `grid-gap`: `Tag` in the first column, everything else spans 3. Phone: one column, gap `stack-sm`.
- Right column, gap `section-gap`:
  1. `h2` `type-h2`, max `heading`: first part `text-primary`, second part `text-secondary`.
  2. Intro (Reveal `rise`): thin `plus` icon (`icon-lg`, stroke 1.5, 30% opacity) + `type-body-lg-bold` `text-secondary` with `text-primary` highlights, max `intro`. Row from tablet (gap `stack-sm`), stacked on phone.
  3. Cards (Reveal `rise`): grid, gap `grid-gap`, **equal row heights** (`auto-rows-fr`): 3 columns desktop; 2 on tablet with the chart card spanning both; 1 on phone.

## Card
- `rounded-card`, 1px `border` outline drawn inside (`inset-ring`), padding `stack-sm` (card 2 has no bottom padding: the phone touches the bottom edge), gap `stack-sm`.
- Head: accent icon (`icon-sm`) + `type-body-bold` title (gap `xs`), then `type-lead-bold` at 80% opacity, max `card-text` (225 / 300 / 300), `text-balance`.
- Visual area `card-visual` tall (card 2: fills the rest).
  - Card 1: `Ticker` of photos `ticker-image-w` × full height, `rounded-image-sm`.
  - Card 2: phone screen, max `chat-w`, padding `md`, `radius-phone` top corners, `phone-frame` outline drawn inside on top and sides only. Header (avatar `avatar`, `type-body-sm-bold`), bubble `bg-border` `rounded-bubble` `p-sm` `type-chat` at `chat-bubble` width, input pill `rounded-input` with a 1px `border` outline, `type-caption-bold` at 60%, round `accent` send button (`send`, icon `icon-xs` dark, turned 90°).
  - Card 3: number block top-left (`Counter` in `type-counter`, white pill `type-pill`, `type-caption-bold` label at 70%), bar chart `graph-h` tall at the bottom, gap `xs`. Bars: `bg-border` (last one `bg-accent` with dark value), `rounded-bar`, `p-sm`, value in `type-caption-bold` reading bottom-to-top, month label below at 80%. Desktop: bars share the width; tablet & phone: `bar-w` each, centred.

## Never
- No images instead of the chat or the chart (they are drawn in code), no shadows, no second accent bar, no extra cards in this section.
