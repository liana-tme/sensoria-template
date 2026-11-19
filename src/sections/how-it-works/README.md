# How it Works

Four steps with a photo, on the Home page after Concept. Static (no motion), as in the original.

## What it does
- Tag + two-tone heading.
- Desktop: the photo on the left (as tall as the steps), four step cards 2×2 on the right, a button below lined up with the steps.
- Tablet: the photo full width on top, steps 2×2 below. Phone: photo, steps in one column, button.

## What you can change (in `content.ts`)
| Field | What it is |
|---|---|
| `tag`, `heading` | label; heading = white part + softer part |
| `image` | the photo (`public/images/how-it-works/`) and its description. Desktop shows a tall centre crop, tablet a wide one. |
| `steps` | four steps: number, title (1–2 words), one sentence |
| `action` | the button: label and link (opens in the same tab) |

## Do not change
Layout, sizes and colours. They come from `tokens.css`.
