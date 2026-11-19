# About page — what the owner changes

Files: `src/sections/about-intro/content.ts`, `team/content.ts`, `awards/content.ts`, `principles/content.ts`, `vision/content.ts`.
The page title and description for search are in `src/app/about/page.tsx`.

- **Intro:** heading in two parts (about 25 characters), a wide 3:2 office photo, a statement of 3–4 sentences (about 300 characters; mark the softer parts `muted`), one short line, two 4:3 team photos.
- **Team:** invitation card (`invite`) title (about 30 characters) and one sentence; button label and link (`/careers`). People: name, role (about 25 characters), portrait photo (vertical, about 5:6). 3 people fill one desktop row with the invitation card; more people simply add rows of the same cards (4 per row on desktop, 2 on tablet).
- **Awards:** 3–6 rows: who gave it (about 25 characters), the award (up to about 45 characters), month and year. Only real awards: never invent them.
- **Principles:** exactly 3 cards: icon name from `src/components/Icon/Icon.tsx`, one word title, one sentence (about 80 characters).
- **Vision:** one quote (about 130 characters, with quotation marks), the author's name and role, a full-screen photo.
