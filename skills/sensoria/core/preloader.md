# Preloader — core rules (do not edit)

Source: `src/sections/preloader/`. Home only (as in the original), placed first in `src/app/page.tsx`.

- A `page`-coloured curtain over the whole screen (`--layer-preloader`) with a fine grain texture (`/images/texture/grain.png`, `--motion-grain-opacity`). It is a design asset, not a photo.
- In the centre the word in `type-serif-m` (accent, italic). Its letters rise one after another from `--motion-letters-distance` below, blurred → sharp (`--motion-letters-duration`, `--ease-spring-letters`, step `--motion-letters-stagger`).
- After `--motion-preloader-hold` the curtain slides up by `--motion-preloader-distance` and blurs (`--motion-preloader-duration`, `--ease-preloader`), then it is removed from the page. Skipped for "reduce motion". The motion is pure CSS (it starts with the first paint and can't get stuck); JS only removes the finished curtain.
- The hero entrance delays are timed to this; change them together or not at all.
- Never: a progress bar, a spinner, a logo image, or a preloader on inner pages.
