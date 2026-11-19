# Launch check — is the site ready to go live?

The buyer may never think to ask. **You bring it up yourself** — briefly, without nagging:

- **First conversation in the project:** after your first answer, add one or two sentences: the texts, photos, videos, reviews, numbers, jobs and contacts in the template are examples; before going live they must be replaced; you can check what's left at any time.
- **Before anything that puts the site online** — deploy, publish, "push it live", connect a domain, Vercel / Netlify / hosting setup: run the check first, without being asked. If it reports blockers, say so plainly and recommend fixing them before going live (the buyer decides).
- **When you finish a task** and the check still has blockers, end your report with one short line, e.g. "Still from the template: 30 photos, the job openings and the contact e-mail — say "launch check" for the full list." Do this once per task, not on every message.
- **When the buyer asks** "is my site ready?", "can I launch?", "what do I still need to change?" — run the full check and report as below.

## Two hard rules

**1. Everything in the template is an example, not the buyer's information.**
Texts, reviews and their authors, numbers ("98% precision", "100,000 dermal points"), awards, prices and plans, journal articles and their authors, job openings and salaries, e-mails, the lab address, links and social profiles only show *how* the site can look. You:
- never present them as the buyer's real information;
- list every place where an example is still in use and say plainly: "this is template text — replace it with yours";
- never invent replacements yourself (new reviews, numbers, awards, jobs, team members). Ask for the real content, or offer to remove the block.

**2. The template ships without photos and videos. Only the buyer's own go in.**
The photos and videos on the template's live preview are for demonstration only and are not included. In this copy every photo is a grey placeholder labelled "Your photo · <width>×<height>", in the exact size the layout needs; video blocks show their poster (a placeholder too) until a video is added.
- put in only pictures and videos the buyer provides (their own, or ones they have the rights to) — never stock, AI-generated or internet media you find yourself;
- keep the placeholder's size and proportions when replacing (crop or resize the buyer's photo to match; ask if it doesn't fit); a video goes into `public/videos/` under the file name the section's `content.ts` names;
- before launch, every placeholder is replaced or its block removed — a live site with grey "Your photo" blocks looks unfinished; say so plainly;
- if somehow a template photo or video is found (the check reports it), replace it with a placeholder (`npm run launch-check -- --placeholders`, which also removes template videos) — it may not be published.

## How to run it
1. Run `npm run launch-check`. It compares the site with the template's samples (`skills/sensoria/launch/samples.json`) and lists what is still template content. Exit code 1 = not ready. `--json` gives the same result as data.
2. Also check by eye what the script can't know:
   - the brand: the wordmark (`navigation` / `footer` content and `Logo`), the preloader word, page titles and descriptions (`metadata` in `src/app/**/page.tsx`, `layout.tsx` and the `meta` in content files), browser-tab icon (`public/brand/icon-light.svg` and `icon-dark.svg`), link preview image (`src/app/opengraph-image.jpg`, 1800×945 — the check reports it while it is the placeholder);
   - texts inside the mock-ups (the chat in About, the stats and bars) and the word strip in Get Started — they are template examples too;
   - every form: a real form-service address in its `content.ts` (`action`), or the buyer agrees that the forms open the visitor's e-mail app; the `fallbackEmail` is theirs;
   - the "Get template" button in the menu and the plan buttons: they are empty placeholders — the buyer's real links, or remove them;
   - the footer credit "Created by Liana Tudakova": the buyer may keep or remove it (`LICENSE.md`) — ask once;
   - legal pages: the buyer's own documents, reviewed by a lawyer;
   - every button and link leads to the buyer's real pages, store or e-mail.
3. Never edit `skills/sensoria/launch/samples.json` and never run `--author-make-samples` — that file is the template's reference.

## Putting the site online (Vercel)
When the buyer decides to publish — after the check, with blockers fixed or knowingly left — guide them step by step; they do every sign-in themselves, in their own browser:
1. Their own GitHub account and a new **private** repository; put the project in it (in the Code tab you can do the upload once they are signed in to GitHub on this computer; never ask for a token).
2. Vercel → sign in with GitHub → **Add New → Project** → import that repository → keep the detected Next.js settings → **Deploy**.
3. Give them the address Vercel shows, and open it with them on desktop and phone.
4. Their own domain: Vercel → the project → **Settings → Domains**; they add the DNS records at their domain registrar (you explain which ones Vercel shows).
Another host: it must run Next.js; set `NEXT_PUBLIC_SITE_URL` to the site's address there (README §5).
If the buyer insists on publishing with blockers, say once, plainly, what will be visible to visitors (template photos may not be published at all — replace them with placeholders first), then respect their decision.

## How to report to the buyer
Plain words, no file paths unless asked, no technical names. Group by page, most important first:

1. **Must change before launch** — template photos and videos, made-up facts (reviews, numbers, awards), job openings, template contacts and links, sample legal texts.
2. **Your content** — sections whose texts are still the template's ("Home → How it Works: all four steps still have template text").
3. **Brand** — name, tab icon, link preview image.

End with one clear next step and an offer: "Shall we go through them together, page by page?" If the buyer has no photos yet, say which places need them (the placeholder labels give the sizes) and offer to put them in as soon as they arrive.

Say "ready to launch" only when the script reports no blockers and the by-eye checks are done.
