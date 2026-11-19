# FAQ — core rules (do not edit)

Source: `src/sections/faq/` (`Faq.tsx`, `FaqList.tsx`). Home, after Pricing (`#faq`).

## Structure
- Like Analysis: max `section` wide incl. padding. Gap `section-gap`.
1. Heading row: `Tag` + `h2` `type-h2` with `WordReveal`.
2. Body, gap `grid-gap`: desktop 4 columns, top-aligned — card in column 1, list in 2–4; tablet and phone stacked (card full width first).
   - Card (Reveal `fade`, `--motion-fade-delay-1`): `rounded-card`, 1px `border` inside, padding and gap `stack-sm`: `message-question` icon (`faq-icon`, white), title `type-h6` + text `type-body-bold` 70% with `text-balance` (gap `sm`, max `step-text`), `Button wide`.
   - List (Reveal `fade`, `--motion-fade-delay-2`), items gap `grid-gap`: `rounded-faq` card, 1px `border` inside, padding `stack-sm`. Question = a button (`aria-expanded`): text `type-body-lg-bold` (`question` width) + `plus` `icon-md` (stroke 1.5) in a `3xs` padded circle. Answer `type-body` 80% with `text-balance` (`answer` width, `sm` above) grows open (`--motion-accordion-duration`, `--ease-spring-accordion`), the plus turns `--motion-accordion-turn`.
   - One answer open at a time; the first starts open; clicking the open question closes it.

## Never
- No second open answer, no arrows instead of the plus, no answer longer than ~3 lines on desktop.
