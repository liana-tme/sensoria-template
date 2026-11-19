# Footer — core rules (do not edit)

Source: `src/sections/footer/` (`Footer.tsx`, `Newsletter.tsx`). On every page, after Get Started.

## Structure
- Photo (`object-cover`) under `bg-veil`; content max `content`. Desktop & tablet: two columns side by side, vertically centred, sharing the space left after their padding (`basis-0`, grow 2 : 1 desktop, 3 : 2 tablet). Phone: stacked.
- Column 1: padding top `footer-top`, bottom `footer-bottom`, sides `section-x` (desktop: no right padding); gap `footer-stack`. `Logo size="l"`, a `footer-line` rule (white 20%), then text (`type-body-lg`, tablet `type-body`, 90%, max `footer-text`, first-line indent from leading spaces, `whitespace-pre-wrap`) and contact (label `type-body-lg-bold` 70%, e-mail `type-h4` `text-link`, gap `contact-gap`), gap `footer-stack`.
- Column 2: padding top `footer-top` (phone `footer-bottom`), bottom `footer-gap`, sides `section-x`; gap `footer-gap`.
  - Newsletter: line `type-body-bold` 80% (max `newsletter`), gap `xs`, field `Field size="sm"` (`field-h`) with `ArrowSubmit` at its right end (`field-arrow` from the bottom). Same `useStaticForm` as Get Started.
  - An invisible `footer-line` spacer (hidden on phone).
  - Menu: 2 columns (gap `footer-cols`), label `type-body-bold` 60%, links `type-lead-bold`, row `link-h`, gap `xs`; an accent underline grows on hover (`--motion-link-line-duration`). Outside links open in a new tab.
- Bottom bar `bg-page`, padding `bar-y`; its content is `max-w-content` with `section-x` sides, so it lines up with the columns above: copyright `type-body` + credit (secondary, link `type-body-bold` `text-link`), legal links `type-body-bold` `text-link`. Desktop one row (spread), tablet two rows (gap `md`), phone stacked (gap `bar-stack`, first row gap `sm`).

## Never
- No extra columns or social icons; keep the veil so the text stays readable.
