# Careers — what the owner changes

- **Jobs:** files in `src/content/careers/` — see the README there (fields and Markdown). Title about 25 characters, "about" 2–3 sentences, then Responsibilities / Qualifications / Benefits lists.
- **Careers page:** `src/sections/careers-list/content.ts` — heading (two parts), tag, intro line, card labels, page title and description.
- **Job pages:** `src/sections/job/content.ts` — "Job details" title, the apply form (form-service address in `action`; empty = the visitor's e-mail app writes to `fallbackEmail`), labels, placeholders, button texts, the note and its link.
- **Standards cards:** `src/sections/standards/content.ts` — 6 cards: icon name, one-word title, one sentence (about 80 characters).
- Never invent salaries, benefits or locations: ask the owner.
