# FAQ

Questions and answers, the last section of the Home page.

## What it does
- Tag + heading (words rise in).
- A "Talk to us" card with a button, and a list of questions. One answer is open at a time (the first starts open); click a question to open it, click again to close.
- Desktop: card on the left, questions on the right. Tablet: card full width above. Phone: one column.

## What you can change (in `content.ts`)
| Field | What it is |
|---|---|
| `tag`, `heading` | label and heading |
| `contact` | card title, one sentence, button label and link (e-mail `mailto:` or a page) |
| `items` | questions and answers (3–7 work best) |

## Do not change
Layout, colours and motion. They come from `tokens.css`.
