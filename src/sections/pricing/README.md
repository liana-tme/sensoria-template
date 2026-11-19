# Pricing

Plans and a founder's word, on the Home page after Results (`#pricing` — the "Get Started" and "Try Sensoria" buttons lead here).

## What it does
- Tag + heading (words rise in).
- A Monthly / Yearly switch: it changes the prices on the plan cards at once.
- Two plan cards (icon, title, price, description, dashed line, five features, button) and a photo card for custom deals with your e-mail.
- Under the plans: a label, a quote and the person who said it.
- Desktop: photo card on the left, plans on the right. Tablet: plans side by side, photo card below. Phone: one column.

## What you can change (in `content.ts`)
| Field | What it is |
|---|---|
| `tag`, `heading` | label; heading = white part + softer part |
| `billing` | switch labels and the small text after the price |
| `plans` | each plan: icon (`scan-heart`, `scan-search`, `sparkle`, `trend-up`), title, monthly and yearly price, description, up to 5 features, button label and link. **The button links are empty placeholders** — add your checkout or sign-up link. |
| `custom` | photo card: tag, title (white + softer part), e-mail, photo |
| `founder` | label, quote (bright parts white), name, role, avatar |

## Do not change
Layout, colours and motion. They come from `tokens.css`.
