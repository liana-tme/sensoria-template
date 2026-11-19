# Get Started — core rules (do not edit)

Source: `src/sections/get-started/` (`GetStarted.tsx`, `CtaForm.tsx`, `LoopVideo.tsx`). Above the footer on every page (`#get-started`).

## Structure
1. Word strip: `strip-h` tall, `bg-accent`, `Ticker gap="strip"`: words `type-body-bold` `text-dark`, each followed by a black `dot` circle.
2. Dark block `bg-page`, padding `section-x` / `section-y`, grain (`--motion-grain-cta-opacity`: 0.03 / 0.02 / none). Content max `content`, gap `section-gap`.
   - `h2` `type-h2`: white part + `text-secondary` part (phone max `cta-heading`, else `heading`).
   - Desktop & tablet 4 columns (`grid-gap`), phone stacked. Column 1: `LoopVideo` (`portrait-video` aspect, `rounded-card`, muted loop; missing file = poster only), `video-col` space on its right.
   - Columns 2–4 (gap `section-gap`, desktop `form-gap`; 8px empty space at the bottom on tablet & desktop as in the original design):
     - Intro (Reveal `rise`, 20px): thin `plus` (`icon-lg`, 30%) + `type-body-lg-bold` line, max `cta-intro`, bright parts white.
     - Form (Reveal `rise`, 10px): `Field`s gap `form-gap` (labels `type-body-lg-bold` 80%, underline `divider` → `accent` on focus), then `SubmitButton` + note `type-body-bold` secondary (max `note`) with a `text-link`, gap `md`.

## Form
- `useStaticForm`: `action` empty → opens the visitor's e-mail app (`mailto:` to `fallbackEmail`, state "prepared"); otherwise POST to the service. States: idle, loading (spinner), success, prepared, error ("Try again", error tint).
- No database, no login, no payment: the site stays static.

## Never
- No new fields beyond name / e-mail / message without the owner asking; never remove the states or the fallback.
