# Hero — core rules (do not edit)

Source: `src/sections/hero/`. Home only.

## Structure
- Full screen (`h-screen`), photo edge to edge, no panel, no radius. Layers: `LiquidImage` (liquid on desktop, still photo on tablet & phone) → texts.
- Texts at the bottom left, padding `hero-x` sides and `hero-bottom` below (40 / 40 / 20). Column, gap `hero-stack` (170 / 64 / 48):
  1. Lead: `type-lead-bold`, max `hero-lead`, the first line indented by `--hero-lead-indent`.
  2. Title block, gap `hero-title-gap`: subtitle `type-h4` at 90% opacity (max `hero-sub`), then the title `type-h1` (max `hero-title`), the page's only `h1`.
- Only the title uses `mix-blend-difference`: its white capitals invert the photo under them (so it looks multicoloured). The lead, subtitle and year mark stay plain white. Keep the blend on the title's own wrapper; never give the text block a `z-index` (that would cut the title off from the photo and stop the effect). The section itself is `isolate`, so the title blends only with this photo. The `h1` carries `data-liquid-blend`: on desktop the liquid photo draws the inversion itself (see `LiquidImage` in components.md).
- On phones a soft dark veil (`bg-veil-soft`, hidden from `lg`) sits over the photo so the white text stays readable; the photo loads at high quality (`quality={90}`).
- Year mark: on the right edge, vertically centred, turned 90° anticlockwise; its box sticks out `hero-mark-out` past the edge. `type-body-bold` text, ruler of 1px white ticks (`tick-sm` ×4, `tick-md`, `tick-lg`, `tick-md`, `tick-sm` ×4, gap `ticks-gap`, 50% opacity), then a second short text; gap `hero-mark-gap`.

## Entrance (on load, once — timed to the preloader leaving)
- Photo: `Reveal settle`, delay `--motion-hero-image-delay`.
- Texts: `Reveal drop`. Subtitle and title at `--motion-hero-title-delay`, lead at `--motion-hero-lead-delay`, year mark at `--motion-hero-mark-delay`.

## While scrolling
- The whole hero scrolls at `--motion-hero-speed` (80%) — `ScrollSpeed` wrapper, `relative z-1`. About (`relative z-1`, painted later) slides over it. Keep About positioned with `z-1`, or the hero would cover it.

## Never
- No dark overlay or gradient on the photo, no buttons in the hero, no second title, no video.
- The lead stays one short paragraph; the title one word or a short name (it is very large: 190 / 140 / 64).
