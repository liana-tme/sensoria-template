# Analysis

The section after About Us on the Home page.

## What it does
- Tag + one-word heading.
- A large rounded video card: a poster photo with a round play button that pulses. On hover the picture grows a little and softens. Click: the video plays (muted, looping) and the button fades out; click again to pause.
  No video file yet? The card shows the poster only, without the play button.
- A row of three big numbers that count up after the page loads, and a short paragraph with a thin plus. The row rises into view.
- Desktop: numbers and paragraph in one row. Tablet: three numbers, the paragraph below. Phone: one column.

## What you can change (in `content.ts`)
| Field | What it is |
|---|---|
| `tag`, `heading` | label and heading |
| `video` | `src` = the video file in `public/videos/` (MP4, keep it short and small, it plays without sound), `poster` = the cover photo in `public/images/analysis/`, `alt` = what the cover shows, `label` = what the video shows (for screen readers) |
| `stats` | three numbers: start, end, suffix (`%`, `h`, `s`…), label |
| `text` | the paragraph; `bright: true` parts are white |

## Do not change
Layout, sizes, colours and motion. They come from `tokens.css`.
