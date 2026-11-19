# How it Works — core rules (do not edit)

Source: `src/sections/how-it-works/`. Home, after Concept (`#how-it-works`). Static: no appear or scroll motion (as in the original).

## Structure
- Like Analysis: the section is max `section` wide incl. padding (content 1240). Gap `section-gap` between heading, body and button.
1. Heading row: `Tag` in column 1 of 4 (tablet up), `h2` `type-h2` (white + `text-secondary` part) spanning 3; phone stacked, gap `stack-sm`.
2. Body, gap `grid-gap`:
   - Desktop: 4-column grid — photo in column 1 stretched to the steps' height; steps (2×2) span 3.
   - Tablet: photo full width, `aspect-steps-wide`; steps 2×2 below. Phone: photo `aspect-steps`; steps in one column.
   - Photo: `rounded-card`, cover.
   - Step card (`li` of an `ol`): `rounded-card`, 1px `border` drawn inside, padding `stack-sm`, gap `step-gap`: number `type-lead-bold` `accent`; then title `type-h6` and text `type-body-bold` at 70% (gap `sm`, max `step-text`).
3. `Button` (same tab): desktop in column 2 of a 4-column grid (lined up with the steps); tablet and phone on the left. Phone: `grid-gap` extra space above it (as in the original).

## Never
- No hover effects or animations on the cards, no icons instead of the numbers, no more than four steps in this grid.
