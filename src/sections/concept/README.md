# Concept

The accent "wow" moment of the Home page.

## What it does
- A full-screen accent-coloured panel sticks to the top while the page scrolls over it. In it: a tag, a huge title and a button; two thin plus marks in the bottom corners.
- As the panel comes into view, the title block grows from nothing to full size.
- A grid of five square photos (in an X pattern) scrolls up over the panel. It starts leaning back and straightens as it comes in.
- Desktop and tablet: 3 columns. Phone: 2 columns (the right column is hidden).

## What you can change (in `content.ts`)
| Field | What it is |
|---|---|
| `tag` | the label above the title |
| `title` | the huge title (two short words work best) |
| `action` | the button: label and link |
| `images` | five photos (`public/images/concept/`): top-left, bottom-left, centre, top-right, bottom-right. Shown square, centre crop. On phones the first three show. |

## Do not change
Layout, colours and the scroll motion. They come from `tokens.css`.
