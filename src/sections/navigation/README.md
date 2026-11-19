# Navigation

The bar at the top of every page, with the opening menu.

## What it does
- **Closed:** transparent bar over the page — logo on the left, menu icon on the right (on every screen size).
- **Open:** the bar grows into a dark panel with big links (they drop in one by one), a white button, a line, the support e-mail and legal links. On phones everything is in one column.
- **Scroll down:** the bar slides up and fades out. **Scroll up:** it comes back.

## What you can change (in `content.ts`)
| Field | What it is |
|---|---|
| `logo` | brand name (shown as text) and where it leads |
| `links` | big menu links: label + address |
| `action` | the white button: label, address (empty = placeholder), new tab or not |
| `contact` | line above the e-mail + the support e-mail |
| `legal` | small links at the bottom |

## Do not change
Layout, spacing, colours, text styles and motion. They come from `tokens.css` and keep the bar one-to-one with Sensoria.
