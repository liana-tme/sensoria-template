# Shared components — core rules (don't change existing entries; new components add theirs at the end)

Source: `src/components/`. Reuse these; never rebuild them with plain markup.

## Text wrapping (all sections)
- No orphan words (a single word alone on the last line), on any screen. Headings wrap evenly (`text-wrap: balance`), paragraphs use `text-wrap: pretty` (both set globally in `globals.css`). Short labels that must stay on one line get `whitespace-nowrap`. After building a section, check phone, tablet and desktop for orphans.

## Colours and type
- Dark site: page background `page`, text `text-primary` (white), softened text `text-secondary`, one `accent` (pink) highlight per section. Lines: `border` (outlines), `divider` (rules between rows).
- Text styles are the design's styles: `type-h1` (Home title only) … `type-h6`, `type-h2-lg`, `type-serif-l` / `-m` / `-s` (Instrument Serif accents; `-m` is italic in `accent`), `type-lead`, `type-lead-bold`, `type-body-lg`, `type-body-lg-bold`, `type-body`, `type-body-bold`, `type-body-sm-bold` and `type-caption-bold` (metadata only: dates, role, location — never headings).
- Inter Display for everything, Instrument Serif only through the `type-serif-*` styles.

## Text links (`text-link`)
- Every text link (e-mail, legal links, links inside texts): add `text-link` to its `type-*` style — white, turns `accent` on hover (`--motion-link-duration`, `--ease-soft`). The big menu links use their own underline instead.

## Button (`Button/`)
- The only button: white pill (`rounded-full`, `bg-white`), `type-body-lg-bold` in `text-dark`, padding `button-x` / `button-y`.
- Hover: the label rolls up by `button-roll` and an identical copy rolls in from below, `--motion-button-duration`, `--ease-spring-button`.
- `newTab` for outside links. An empty `href` renders a placeholder that looks and feels the same (hand cursor, hover roll) but goes nowhere, until the owner adds the address.

## Logo (`Logo/`)
- The brand name as a serif wordmark, `type-serif-s`, row height `logo-h`. Links home. No image mark.

## Reveal (`Reveal/`)
- `drop`: fades in and comes down from `--motion-drop-distance` above, `--motion-drop-duration`, `--ease-spring-drop`.
- `settle`: no fade; comes down from `--motion-hero-image-distance` and shrinks from `--motion-hero-image-scale` (hero photo).
- `trigger="mount"` plays once on page load; `trigger="view"` when it scrolls into view. Delay: a class that sets `--reveal-delay` to a token.
- Reveal uses the `translate` property: never put Tailwind `translate-*` on the same element — position with `inset-*` / `my-auto` / flex instead.
- Everything stops for "reduce motion".

## LiquidImage (`LiquidImage/`)
- A full-bleed photo (`object-cover`). On desktop with a mouse the photo flows like liquid where the cursor moves (a small GPU fluid simulation, the original "Liquid Hover", settings `--liquid-*`). Tablet, phone, touch screens and "reduce motion": the plain photo.
- A title marked `data-liquid-blend` in the same section (the hero `h1`) is drawn by the effect itself from the canvas's first frame (it follows the title while it drops and fades in): the photo is inverted under its letters (same look as `mix-blend-difference`) and the real text is made transparent. Reason: a busy WebGL canvas can be drawn on its own layer, where CSS blending no longer sees it and the letters turn plain white. Keep `mix-blend-difference` on the title wrapper too: it is what tablet and phone use. Changing the title's font or text needs no extra work; the mask is redrawn on resize.
- Never replace it with a video or a static image on desktop, never add a second one on the same screen (it is heavy).

## SmoothScroll (`SmoothScroll/`)
- Smooth mouse-wheel scrolling on every page (`lenis`, strength `--motion-scroll-lerp`, as in the original). Mounted once in `src/app/layout.tsx`. Touch scrolling stays native; off for "reduce motion".

## Icon (`Icon/`)
- Icons from the original site: line icons `plus`, `scan-heart`, `scan-search`, `message-question`, `sparkle`, `trend-up`, `send`, and the filled `play` triangle. Round caps, stroke 2 (1.5 for `plus` and `send`). Size by class (`size-icon-*`), colour = text colour. Don't add icons from other sets.

## Tag (`Tag/`)
- The eyebrow label above (or beside) every section heading, like `[About Us]`. `type-body-bold`. `accent` on dark sections, `white` on photos or accent backgrounds.

## Ticker (`Ticker/`)
- An endless row drifting left at `--motion-ticker-speed` px/s, items `xs` apart. Children = one set; it is repeated for a seamless loop.

## Counter (`Counter/`)
- Counts up from `from` to `to`, once. `start`: `view` (when it scrolls into view) or `load` (right after the page loads). `pace`: `fast` (`--motion-counter-step`) or `slow` (`--motion-counter-step-slow`). `suffixGap` sets the gap before the suffix. Screen readers get the final number.

## VideoCard (`VideoCard/`)
- Rounded card with a poster, grain and a pulsing play button; click plays / pauses a muted looping video. Without a video file it shows the poster only. Rules: `analysis.md`.

## Reveal `rise`
- Section blocks (intro lines, card groups) fade in and rise from `--motion-rise-distance` below with `--ease-spring-firm` when they scroll into view.

## ScrollEntry (`ScrollEntry/`)
- Writes `--entry` (0 → 1) on its block while the block enters the screen from the bottom. Children use it for scroll-linked motion (Concept). Put transforms on a child, never on the measured block. "Reduce motion": stays 1.

## ScrollSpeed (`ScrollSpeed/`)
- The block scrolls slower than the page: pushed down by (1 − speed) × the distance scrolled past its top; speed comes from a CSS variable (hero: `--motion-hero-speed`). The next section must be positioned with the same `z-1` to slide over it. "Reduce motion": no effect.

## WordReveal (`WordReveal/`)
- Heading words fade in and rise `--motion-words-distance` one after another (`--motion-words-stagger`, `--motion-words-duration`, `--ease-words`) when the text scrolls into view, once. `parts` mixes colours. Screen readers get the plain text.

## BeforeAfter (`BeforeAfter/`)
- Before / after photos with a draggable divider and two jump labels. Rules: `results.md`.

## Reveal `fade` / `slide`
- `fade`: opacity only, `--motion-fade-duration`, `--ease-spring` (cards). `slide`: from `--motion-slide-distance` on the left, `--motion-slide-duration`, `--ease-soft`.

## Reveal `float`
- Opacity + rise from `--motion-float-distance`, `--motion-float-duration`, `--ease-float` (plan cards; a block can shorten the distance by overriding the variable).

## Button `wide`
- Full width of its column (Results highlight card).

## Forms (`src/components/Form/`)
- `useStaticForm` (static sending with a `mailto:` fallback), `Field` (underline field, md / sm), `SubmitButton` (white pill with states), `ArrowSubmit` (accent arrow, turns 45° on hover). Used by Get Started and the footer; reuse them for every form.
- `Ticker` takes `gap`: `xs` (photo strip) or `strip` (word strip).
- `Logo` takes `size`: `s` (menu bar) or `l` (footer).
- `ParallaxImage`: a photo that moves slower than the page (`--motion-parallax`, 5% taller frame `--motion-parallax-scale`). Frame shape via `className`.
- `Reveal` also takes `threshold` (0–1) and the kind `cards` (principle cards).
- Icons added for the About page: `microscope`, `zap`, `hand-heart`.
- `Button` with no `href` but `onClick` is a real button (journal "Load More"); an empty `href` stays a placeholder.
- `PostCard`: journal card (see `journal.md`).
- `Reveal` kind `lift` (job page: 40px, 0.6s, `--ease-soft`).
- `Principles` takes `equalRows` (default true).
- Icons added for Careers: `target`, `life-buoy`, `shield-check`, `layers`, `chevron-up`.
- `Field` type can be `url` (résumé link).
- `Field` with `options` is a drop-down list (grey until chosen).
- Icons added for Contact: `mail`, `map-pin`.
- Text style `type-display` (404 number).
- Phones (< 810px): appear effects only fade — every movement distance (`--motion-*-distance`, hero photo scale) is 0 there; parallax photos and the hero's slower scrolling are off on phones (parallax also on tablets).
- Page change: the new page wipes in from the bottom (`@view-transition` in `globals.css`, `--motion-page-duration`, `--ease-page`).
