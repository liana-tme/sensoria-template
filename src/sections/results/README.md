# Results

Proof that the product works, on the Home page after How it Works.

## What it does
- Tag + heading; its words rise in one by one when it scrolls into view.
- A row of three blocks: a highlight card with a button under it, a customer review, and a before / after comparison.
- The comparison: drag or click anywhere on it to move the divider; click "Before" or "After" to show that photo whole.
- The cards fade in, the comparison slides in from the left.
- Desktop: all in one row (comparison twice as wide). Tablet: card + review, comparison below. Phone: one column.

## What you can change (in `content.ts`)
| Field | What it is |
|---|---|
| `tag`, `heading` | label; heading = white part + accent part |
| `highlight` | title, short quote and the button (label + link) |
| `review` | name, role, avatar photo, the review (bright part white), a metric line |
| `compare` | the before and after photos (`public/images/results/`), their descriptions and the two labels |

The logo in the highlight card is the brand name from the navigation (`src/sections/navigation/content.ts`).

## Do not change
Layout, heights, colours and motion. They come from `tokens.css`.
