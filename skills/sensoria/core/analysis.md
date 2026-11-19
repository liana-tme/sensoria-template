# Analysis — core rules (do not edit)

Source: `src/sections/analysis/`. Home, after About Us (`#analysis`).

## Structure
- The whole section is max `section` wide **including** its padding (`section-x`, `section-y`), so the content is 1240 wide on large screens (narrower than About Us). Gap `section-gap` between the three blocks.
1. Heading row: like About Us — `Tag` in the first of 4 columns (tablet up), `h2` `type-h2` spanning 3; phone: stacked, gap `stack-sm`.
2. `VideoCard`, full width, `video-h` tall (700 on tablet & desktop, 380 on phone), `rounded-video`.
3. Stats row (Reveal `rise`): grid, column gap `grid-gap`, row gap `section-gap`; desktop 5 columns (3 stats + the paragraph spanning 2), tablet 3 columns (paragraph below, spanning 2), phone 1.
   - Stat: `Counter` in `type-counter-lg` (start `load`, pace `slow`, suffix gap `3xs`), label `type-body-bold` at 70%, gap `stat-gap`.
   - Paragraph block (its own Reveal `rise`, distance `--motion-rise-distance-sm`): thin `plus` icon (`icon-lg`, stroke 1.5, 30%) + `type-body-lg-bold` `text-secondary` with `text-primary` highlights, max `text`; row from tablet (centred), stacked on phone.

## VideoCard (`src/components/VideoCard/`)
- Poster photo (cover) → video (muted, looping, inline, loads only on play) → grain at `--motion-grain-video-opacity` → play button.
- Play button: white circle `play`, pink filled triangle `play-icon`, a white ring `play-pulse` outside it that grows to `--motion-pulse-scale` and fades, `--motion-pulse-duration`, endless.
- Click toggles play / pause; the button fades out while playing (`--motion-play-duration`, `--ease-play`).
- Hover (mouse only, not while playing): the picture (poster + video) grows to `--motion-video-hover-scale` and blurs `blur-video`, same timing; the button stays as it is.
- No video file (or it can't load): poster only, no button, not clickable. Never show a broken player.

## Never
- No autoplay with sound, no visible player controls, no second video on the page, no text over the video.
