# Concept — core rules (do not edit)

Source: `src/sections/concept/`. Home, after Analysis (`#concept`).

## Structure
- Section: `bg-page`, padding `section-y` top and bottom, no side padding.
1. **Sticky panel:** `sticky top-0`, full screen (`h-screen`), `bg-accent`, padding `section-x` / `section-y`, grain at `--motion-grain-concept-opacity`. Centred column, gap `concept-stack` (32 / 32 / 24): title block (gap `md`: `Tag` white, `h2` `type-h2-lg` centred, max `hero-title`) then `Button`. Two thin `plus` marks (`icon-lg`, white, stroke 1.5, 70%) `concept-corner` from the bottom-left and bottom-right corners.
2. **Photo grid** over the panel: max `content`, padding `concept-pad` (64 / 64 / 20), columns gap `section-gap`, photos in a column gap `concept-row`. 3×3 cells, column by column: photo, empty, photo / empty, photo, empty / photo, empty, photo. Square, `rounded-card`, cover. Phone: the third column is hidden and every cell gets `xs` padding (`sm` at the bottom).
3. **Tail:** an empty block `concept-tail` tall, so the panel stays on screen after the grid.

## Scroll motion (`ScrollEntry`, no libraries)
- `--entry` goes 0 → 1 while a block enters the screen from the bottom (top edge at the bottom of the screen → fully inside).
- Title block: `scale` and `opacity` = `--entry`.
- Photo grid: `perspective(--concept-perspective) rotateX(--motion-concept-tilt × (1 − --entry))`.
- Transforms go on a child of the measured block, never on the block itself. "Reduce motion": no motion.

## Never
- No second accent panel on the page, no text over the photos, no extra photos in the empty cells (they let the panel show through).
