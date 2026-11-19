# About Us

The first section after the Home hero.

## What it does
- Left: the section tag. Right: a two-tone heading, a short intro line with a thin plus, and three cards.
- **Card 1:** a strip of photos drifting left without end.
- **Card 2:** a small chat on a phone screen (drawn in code, not a picture).
- **Card 3:** a number that counts up when it scrolls into view, a small badge and a bar chart (last bar in the accent colour).
- The intro line and the cards rise into view.
- Desktop: three cards in a row. Tablet: two, then the chart card full width. Phone: one column.

## What you can change (in `content.ts`)
| Field | What it is |
|---|---|
| `tag` | the label left of the heading |
| `heading` | white part + softer part |
| `intro` | the short line; `bright: true` parts are white |
| `analysis` | card 1: icon, title, text, the strip photos (`public/images/about/`) |
| `rituals` | card 2: icon, title, text, assistant name and avatar, the message, the input placeholder |
| `tracking` | card 3: icon, title, text, the counter (from, to, suffix), badge, label, the bars (month, value, height 0–1, highlight) |

Icons: `scan-heart`, `sparkle`, `trend-up` (see `src/components/Icon/Icon.tsx`).

## Do not change
Layout, sizes, colours and motion. They come from `tokens.css`.
