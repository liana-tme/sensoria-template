# Contact — core rules (do not edit)

Source: `src/app/contact/page.tsx`, `src/sections/contact/` (Contact, ContactForm), `src/sections/channels/`.
Order: Navigation → Contact → Channels → Get Started → footer.

## Contact (`Contact.tsx`, `ContactForm.tsx`)
- Padding top `page-top`, bottom `section-y`; `h1` `type-h2` (white + muted). Tag column + the form (columns 2–4; phone stacked, gap `stack-sm`). No appear effects. To put the form on another page, reuse `Contact` with `headingLevel="h2"` (one `h1` per page).
- Form: `Field`s gap `form-gap` — name, e-mail, a drop-down `Field options` (grey placeholder line until a choice), message; then `form-bottom` (34px as in the original design) to `SubmitButton` + note (gap `md`). `useStaticForm`; the chosen topic goes into the e-mail subject.

## Channels (`Channels.tsx`)
- Tag column + `h2` with `WordReveal`; a line with the thin `plus` (`icon-lg`, 30%) + `type-body-lg-bold` (max `intro-lg`, white + muted).
- Cards rise in together (Reveal `cards`): desktop side by side, tablet & phone stacked, gap `grid-gap`. Card: 1px `border` inside, `rounded-card`, padding `stack-sm`, gap `card-pad`: `icon-box` accent square with a `text-dark` icon (`icon-md`, stroke 1.8), title `type-h6` + text `type-body-lg-bold` 80% (max `contact-text`, gap `text-gap`), and an underlined `type-h6` link that turns accent on hover (`--motion-link-fast`).

## Never
- No map embed, no chat widgets: links only.
