# Pricing — core rules (do not edit)

Source: `src/sections/pricing/` (`Pricing.tsx`, `PricingTable.tsx`). Home, after Results (`#pricing`, the target of "Get Started" / "Try Sensoria").

## Structure
- Like Analysis: max `section` wide incl. padding. Gap `section-gap`: heading row, table, founder block.
1. Heading row: `Tag` + `h2` `type-h2` with `WordReveal` (white + `text-secondary`).
2. Table, gap `stack-md` (42 / 42 / 32):
   - Switch: from tablet in column 2 of a 4-column grid with gap `3xs`; phone on the left. Track `bg-glass-faint`, `rounded-full`, padding `3xs`; options `px-stack-sm py-sm type-body-bold rounded-full`, selected `bg-white text-text-dark`. Changes prices instantly (no animation). Buttons with `aria-pressed`.
   - Cards, gap `grid-gap`: desktop 4-column grid — custom card in column 1 (as tall as the plans), plans side by side in columns 2–4; tablet: plans side by side, custom card full width below (`custom-h`); phone: one column, custom card last (`custom-h`).
   - Plan card: `rounded-card`, 1px `border` inside, padding `stack-sm`, gap `plan-gap`: [icon + title `type-body-bold` (gap `xs`); price `type-h3` + period `type-body-sm-bold` 80% (gap `sm`); description `type-body` 80% (gap `stack-sm`)] → dashed line (1px slice of a `dash` dashed `border`) → features (`plus` `icon-xs` + `type-body-bold`, gap `xs`, rows `sm`) → `Button wide`.
   - Custom card: photo cover at `brightness-32`, padding `stack-sm`, `rounded-card`, no outline; top: tag `type-body-lg-bold` + `type-h4` (white + `text-secondary`, max `step-text`, gap `sm`); bottom: e-mail `type-h6 text-link` (mailto, new tab, max `email`); min gap `custom-gap`.
3. Founder block: tablet up 4 columns — label `type-body-bold` 70% (max `step-text`) in column 1; columns 2–4: quote row (Reveal `rise`: thin `plus` `icon-lg` 30% + `type-h5` `text-secondary` with `text-primary` part, max `quote-lg`; row from tablet, stacked on phone, gap `stack-sm`) then founder (Reveal `fade`: avatar `avatar-md` + name `type-body-lg-bold` / role `type-body` 70%, gaps `md` / `stat-gap`); gap `stack-md`. Phone: stacked, gap `stack-sm`.

## Motion
- Switch: Reveal `fade`, plans and custom card: Reveal `float` (custom card from `--motion-rise-distance-sm`), all with `--motion-plans-delay`.

## Never
- No third plan in this row (use the custom card for "talk to us"), no strike-through prices, no badges ("Popular") that are not in the original.
