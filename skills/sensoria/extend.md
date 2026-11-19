# Extending Sensoria — new pages and sections

How to build anything new (a team page, a services page, a new Home block…) so that it looks and behaves like Sensoria.
Read `SKILL.md` first; `core/` rules always apply.

The person you work with is the buyer of the template. They may not be a developer. Talk to them in plain words, in their language; no jargon, no file paths unless they ask.

---

## 1. The main rule
1. **Reuse first.** Look for a ready section or detail (catalogue in `SKILL.md` and `core/components.md`) that does the job, and fill it with new content. If a ready section shows something that is only true for the template — "98% precision", ratings, awards, a review, a salary — don't show it as the buyer's own: ask for the real value, or leave that part out (the look stays the same).
2. **If nothing fits, create a new one in the Sensoria style.** "New" never means "different": the new piece uses only Sensoria's values, type styles, shapes and motion (§5), so nobody can tell it was added later.
3. **Anything new is proposed before it is built** (§2). The buyer decides; you recommend.

## 2. How to work (every request)
1. **Understand** what the page or block is for and what goes on it. Ask only what you can't infer.
2. **Ask about the first screen** of a new page (§4).
3. **Propose a plan** in plain words, one short list:
   - the page from top to bottom, block by block;
   - for each block: *ready* (which one) or *new* (what it is and why nothing ready fits);
   - for every new piece — a card, a section, a motion — the **best solution** in one or two sentences; if there is a real choice, give two options and say which you recommend and why.
4. **Build only after the buyer says yes.** If they change something, update the plan first.
5. **Check, silently, before you report** (§7). Fix what you find.
6. **Report** in two or three plain sentences: what is on the page, where to change texts and pictures, anything still open. Do not mention internal checks by their technical names. When the buyer seems done, offer the launch check (`launch-check.md`).

## 3. The frame of every page
Every page has the same frame — never leave a part out, never build your own version:
- **Navigation** on top (`src/sections/navigation`).
- **Get Started** (`src/sections/get-started`: the accent word strip and the form block) right above the footer.
- **Footer** (`src/sections/footer`) at the bottom. Link the new page from the menu (`navigation/content.ts`) or the footer if the buyer wants it findable.
- A page = `src/app/<address>/page.tsx` with `metadata` (title `"<Brand> — <Page>"`, description); it only puts sections in order (look at `src/app/contact/page.tsx`).
- One `h1` per page. Section headings `h2`, card titles `h3`. Pick the look with the `type-*` style, not with the tag.
- If the buyer's brand differs from Sensoria, use their brand on the new page and offer, once, to rename the rest of the site (logo, texts, titles) as a separate step.

## 4. The first screen — always ask
The template has two kinds. Ask which one the buyer wants (show them Home for the photo one, About or Contact for the text one).
- **Text:** the inner-page start — `page-top` padding, a two-tone `h1` in `type-h2` (white + `text-secondary`), then the content in the tag-column grid (tag in column 1, content in columns 2–4). Like `src/sections/about-intro`, `careers-list`, `contact`.
- **Photo:** the Home hero (`src/sections/hero`) with the buyer's photo and texts. Big photos (hero, Vision, banners) are cropped to their centre on narrow screens — remind the buyer to keep the subject in the middle.

## 5. Building a new section or detail
**Where it lives**
- A section: `src/sections/<name>/` with `<Name>.tsx` (layout), `content.ts` (every text, image, link) and, when it helps, `README.md`.
- A reusable detail (card, badge, control): `src/components/<Name>/`.
- Write the rule for it at the same time: `skills/sensoria/core/<name>.md` (layout rules) and `skills/sensoria/content/<name>.md` (what the buyer changes); add both to `SKILL.md`, a detail also to `core/components.md`. Adding new files or new entries to `core/` is expected; what you never do is change or remove the existing rules there.
- Changing a ready section or detail is allowed only to make it reusable without changing how it looks (an optional part, a new variant). Say so in the report.
- The buyer's own page layout (which blocks a page shows, in which order) lives in `src/app/**/page.tsx`; `core/` keeps describing the template's sections and stays unchanged. Update the matching `content/*.md` so it describes the buyer's site.
- A block removed from every page: delete its section folder too (and its `core/` / `content/` notes from the list in `SKILL.md`), so nothing unused stays behind and the launch check stays honest.
- Text you leave for the buyer to write: mark it with **TO WRITE** (e.g. "TO WRITE: one sentence about honesty"); the launch check finds it.

**What it may use — only this**
- Values from `src/styles/tokens.css`: colours, spacing, radii, blur, motion, breakpoints. Never a `#hex`, a `px` number or an arbitrary `[…]` class in a section or component. If a value is missing, add a **named** token to `tokens.css` (with a comment and phone / tablet / desktop values) — but only when it follows Sensoria's scale. If it doesn't, ask the buyer (§8).
- Type styles `type-*` only (list in `tokens.css` and `core/components.md`). Never a new font or font size outside them.
- Links in text: `text-link`. Every link must lead somewhere real — never `#`.
- Icons from `Icon` (the Sensoria line set). Need one that is missing? Add it in the same style (24-unit box, round caps, same stroke) and say so in the report.
- Ready details: `Button`, `Tag`, `Reveal`, `WordReveal`, `ParallaxImage`, `PostCard`, `VideoCard`, `Ticker`, `Counter`, `BeforeAfter`, the form parts in `src/components/Form`, `Principles` (icon cards), … (full list in `core/components.md`).

**Looks — what makes it Sensoria**
- Dark page (`bg-page`), white text, one pink accent (`text-accent`) per section at most — usually the `Tag`.
- Sections: max `section` wide incl. `section-x` padding, `section-y` top and bottom, `section-gap` between blocks; the tag-column grid (4 columns, `grid-gap`) for heading rows.
- Headings: `type-h2` in capitals, two-tone where there is an intro (white lead, `text-secondary` rest); a line with the thin plus (`Icon plus`, 30%) for short intros.
- Cards: outlined, not filled — `rounded-card` + `inset-ring inset-ring-border`, padding `stack-sm`; an accent icon square (`icon-box`) where a card has an icon.
- Photos: `rounded-card`, `object-cover`; text on photos sits on a shade or veil token. Only the buyer's own pictures; until they arrive, use a "Your photo" placeholder of the right size (copy an existing placeholder and resize it). Never stock, AI or internet images or videos.
- Layout per width: desktop (≥ 1200), tablet (≥ 810), phone. Decide all three before coding; phone is one column.

**Motion**
- Default: headings rise word by word (`WordReveal`), blocks rise in (`Reveal` `rise` / `cards` / `fade` with the delay tokens). Reuse the existing hovers (button label roll, card photo zoom-and-blur, text links turning accent).
- A new motion is allowed only when the buyer agreed to it in the plan, and it must feel like Sensoria: the easings and durations from `tokens.css` (`--ease-*`, `--motion-*`), soft and short, never flashy. Respect reduced motion. Add its values as tokens.

**Forms and other inputs**
- The site is static: a form can't send anything by itself. Use `useStaticForm` (`src/components/Form`): it posts to a form service the buyer signs up for — they give you only the public form address, never a password — and, while there is none, opens the visitor's e-mail app with the message. Never fake a "sent" message.
- Fields: `Field` (label `type-body-lg-bold` 80% above an underlined field; `options` for a drop-down), `SubmitButton` with its states, the small note with the privacy link under it — like `src/sections/contact/ContactForm.tsx`.

**Code**
- Static site: no login, database, payments or tracking. Lists like articles, jobs or documents go into Markdown files in `src/content/` (see `src/lib/journal.ts`, `careers.ts`, `legal.ts`).
- This Next.js version differs from older ones: read `node_modules/next/dist/docs/` before using an API you are not sure about.
- Ask before adding any new package, and explain why in one sentence.
- Never ask for passwords, keys or tokens in chat. The buyer signs in to services (hosting, form service, domain) in their own browser; you only need public values.

## 6. The buyer's colours and font
Change values only in `src/styles/tokens.css`, never the sections. One change there repaints the whole site.

**Colours** (top of `tokens.css`, "Colors"):
| Variable | What it paints |
|---|---|
| `--color-accent` | the one highlight colour: tags, the word strip, icon squares, link hovers |
| `--color-page`, `--color-black` | page and deepest backgrounds — keep them dark; the layout is designed for a dark site |
| `--color-text-primary`, `--color-text-secondary`, `--color-text-placeholder` | white text, softened text, quiet text — keep them as one family |
| `--color-border`, `--color-divider` | card outlines and thin rules |

- Ask for the brand colour as a code (e.g. `#7A5CFA`) or a reference; propose the accent and say which variables change.
- **Check contrast** before saving: normal text at least **4.5 : 1** against its background, large headings, icons and buttons at least **3 : 1** (accent on the page colour, dark icon on the accent square, text on the word strip). If a brand colour fails, propose a lighter/darker shade of it and explain why.
- Keep one accent. Don't touch veils, shades and glass values (they keep text readable on photos) unless the buyer asks — then re-check contrast on the photos.

**Font**
- Only fonts with an open licence (SIL OFL or similar — e.g. most Google Fonts) or a font the buyer has a web licence for. Ask if unsure.
- Self-hosted, never loaded from Google at runtime: put the font file (`.woff2`) and its licence (`OFL.txt`) in `src/fonts/<font>/`, list it in `src/fonts/README.md` and `LICENSE.md` (Fonts), connect it in `src/app/layout.tsx` (`localFont`, same `variable` name or update `--font-sans` / `--font-serif` in `tokens.css`).
- Main font → `--font-sans`; the logo and serif accents → `--font-serif`. Keep the `type-*` sizes; only adjust a size or line height in its `@utility` if the new font looks clearly larger/smaller.
- A new font changes line lengths: re-check every page at 1440 / 810 / 390 for overflow and lone words (§7).

## 7. Checks — always, without being asked
Before every report:
- Look at the page at **1440, 810 and 390 px** wide. Nothing overflows sideways, nothing overlaps, spacing matches the rest of the site.
- **No lone word on the last line** of any heading, card text or paragraph, at all three widths. Headings balance and paragraphs wrap "pretty" by themselves (`globals.css`); Markdown text uses `noOrphanHtml`, short values `splitLastTwo` (`src/lib/text.ts`); add `text-balance` to short card lines.
- No values outside `tokens.css` in the new files; texts only in `content.ts` / Markdown.
- Type check passes (`npx next typegen && npx tsc --noEmit`); the page opens without errors.
Never ask the buyer to do these checks, and never list them by technical name — say "checked on phone, tablet and desktop".

## 8. Stop and ask the buyer when
- a colour, size or effect is needed that is not in `tokens.css` and does not follow the scale;
- the request would break the Sensoria look (a light theme, several bright colours, heavy shadows, busy animation) — explain the trade-off and propose a Sensoria-style alternative;
- legal texts are involved — build them only as a **sample**, with the sample note, and say a lawyer must review them;
- the request needs login, payments, a database or another service;
- the request goes beyond the license (`LICENSE.md`) — e.g. packaging it as a template, theme or kit to share or sell. Say kindly what the license allows and point to it; don't do it.

## 9. Never
- Change or remove existing rules in `skills/sensoria/core/` (adding new ones is fine), or change the existing Sensoria sections' design on your own.
- Write values straight into sections or components.
- Copy another website's design, logos or texts.
- Remove `LICENSE.md`, the Luna UI notice or the font licences (`src/fonts/*/OFL.txt`). The footer credit "Created by Liana Tudakova" may be removed if the buyer wants (`LICENSE.md`).
- Ship legal text as final.
- Invent facts for the buyer (numbers, reviews, jobs, team members). Short connecting lines you write yourself are fine — list them in the report so the buyer can change them.

## Example: a team page (`/team`)
Plan you would show the buyer:
1. First screen — *asked*: text. Two-tone heading "Meet the team", tag "[Team]", one line with the thin plus. (Ready pattern.)
2. People — *ready*: the Team block from About (portrait cards) with the buyer's people and photos; more than three people → more rows of the same cards.
3. Values — *ready*: `Principles` with the buyer's three values.
4. Get Started and footer — frame.
