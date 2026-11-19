> **This file is for AI assistants.** You (the site owner) don't need to read it — start with `README.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Sensoria template (Luna UI)

This project is the **Sensoria** website template by Luna UI (Next.js, TypeScript, Tailwind CSS).
Before any change, read the skill: **`skills/sensoria/SKILL.md`**, then the files it points to.

- "Make me a website" → the site already exists: never build a new one; follow "Start here" in `skills/sensoria/SKILL.md` (explain, ask three questions, show the site — from a chat, first recommend the Code tab of the Claude app where the site is live; screenshots only as a fallback, never a `localhost` link; say the grey "Your photo" blocks are for their photos).
- New page or section → `skills/sensoria/extend.md` (reuse first; new pieces in the Sensoria style; propose before building).
- Changing texts and images → `skills/sensoria/content/` (each section keeps its content in `content.ts`; articles, jobs and legal documents are Markdown files in `src/content/`).
- Going live → `skills/sensoria/launch-check.md` (`npm run launch-check`). All template texts and facts are examples and must be replaced; photos and videos are not included — every picture is a "Your photo" placeholder, and only the buyer's own pictures and videos go in. **Bring this up yourself**: mention it in your first conversation, run the check before any deploy / publish / domain setup, and after each finished task add one line about what is still from the template.
- Never ask the buyer for passwords, keys or tokens in chat: sign-ins to services (hosting, forms, domains) happen in their own browser; ask only for public values (a form address, a site URL).
- Never change the existing rules in `skills/sensoria/core/` (new sections add their own); never write colours or sizes outside `src/styles/tokens.css`.
