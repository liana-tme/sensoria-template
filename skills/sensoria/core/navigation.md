# Navigation — core rules (do not edit)

Source: `src/sections/navigation/`. On every page, fixed at the top, above the sections (`--layer-nav`).

## Closed
- Transparent bar, no background, no line: `Logo` left, menu icon right — on **every** screen size (there is no row of links on desktop).
- Padding: `nav-x` (36 / 36 / 20) sides, `nav-y` top and bottom. Icon `menu-icon-w` × `menu-icon-h`, three `menu-line` lines: short top-left, long middle, short bottom-right; on hover all three become long.

## Open
- The bar grows into a `page`-coloured panel (`--motion-nav-open-duration`, `--ease-curtain`), bottom padding `nav-bottom`. The icon turns into a cross (`--motion-menu-icon-cross`, 30° while hovered, `--ease-spring-bouncy`).
- Inside, gap `nav-stack` between header, links row, line and contacts row:
  1. Links: `type-h4`, gap `nav-links`, each with an `accent` 1px underline that grows on hover (`--motion-link-line-duration`, `--ease-soft`). They drop in one after another each time the menu opens (`--motion-menu-link-*`, `--ease-spring-menu`). `Button` on the right, aligned to the bottom of the links.
  2. A `divider` line, full width.
  3. Contacts: "Need Support?" `type-body-bold` `text-secondary`, gap `nav-contact`, e-mail `type-h5 text-link` (mailto, new tab). Legal links `type-body-lg-bold text-link`, gap `nav-stack`, on the right, aligned to the bottom.
- Phone: both rows become columns (gap `nav-stack-sm`): links, then the button; contacts, then the legal links.
- A link click closes the menu.

## Scroll
- Phone only: once the page is scrolled past `--nav-scroll-offset` px, the closed bar blurs what is under it (`blur-nav`).
- Scrolling down hides the bar: up `--motion-nav-hide-distance` and fades out (`--motion-nav-hide-duration`, `--ease-spring-hide`). Scrolling up brings it back. The open menu never hides.

## Never
- No solid or blurred bar background while closed, no desktop link row, no second button, no values outside `tokens.css`.
- Open menu: a 1px `border` line along its bottom edge (inside), so the panel never merges with the page under it.
