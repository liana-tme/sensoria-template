# Sensoria — free Next.js website template by Luna UI

[![Sensoria — dark, editorial website template for an AI beauty product](https://luna-sensoria.vercel.app/opengraph-image.jpg)](https://luna-sensoria.vercel.app)

A dark, editorial website for an AI beauty or skin-care product, in code: **Next.js, TypeScript, Tailwind CSS**.
**AI-ready:** it comes with its own instructions for Claude Code, Cursor, Codex and other AI tools — tell your assistant what you want in plain words, and it keeps the Sensoria look.

**[Live demo](https://luna-sensoria.vercel.app)** · **Free** for any number of websites · More templates at **[lunaui.co](https://lunaui.co)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fliana-tme%2Fsensoria-template&project-name=sensoria&repository-name=sensoria)

**Pages:** Home · About · Journal (list + articles) · Careers (list + job pages) · Contact · Legal (Privacy, Terms) · 404

**Get your copy:** press **Use this template** above (choose **Private** for your repository), or **Code → Download ZIP**.

---

## Start here — no coding needed

The site is **already built**. You make it yours by talking to an AI assistant that works inside this folder. You don't need to know how to code.

**1. Install two apps** (once):
- **An AI app that can work with folders.** Either the [Claude desktop app](https://claude.ai/download) — open its **Code** tab (Claude Code needs a paid Claude plan) — [Cursor](https://cursor.com) (check its current plans), or [Codex](https://openai.com/codex) by OpenAI (comes with a ChatGPT plan). In these apps the Sensoria instructions load by themselves.
  This is a code project: open it in the **Code** tab — not in Claude Design, Cowork or Framer.
- **Node.js** — the free engine that runs the site on your computer. Download the **LTS** version from [nodejs.org](https://nodejs.org) and click through the installer.

**2. Get your copy** (Use this template, or Code → Download ZIP and unzip it) and **open the folder** in your AI app.

**3. Paste this message** to start (you can use it in any AI tool):

```text
This is the Sensoria website template by Luna UI, and the site is already built.
Before doing anything, read AGENTS.md and skills/sensoria/SKILL.md in this folder
and follow them. Don't create a new site, don't use pictures from the internet
and don't invent facts — ask me instead. First, run the site and give me
the link to open it.
```

Then just say what you want in your own words — "change the title", "add my photos", "make an About page", "is my site ready to launch?". The assistant knows where everything lives, keeps the Sensoria look, proposes a plan before building anything new, and tells you what is still template content.

> **Started in a chat?** Uploading the files to a chat works for questions, but you can't see your site there while you work. Move to the **Code** tab of the Claude app (or Cursor, or Codex), open the unzipped folder and paste the message above — your site opens live and the assistant follows the template's instructions by itself.

The site first shows grey **"Your photo"** blocks — that's where your photos go (the template ships without photos and videos; video blocks show a still picture until you add yours).

---

The sections below are for when you want to do things by hand.

## 1. Run it on your computer

You need **Node.js 20.9 or newer** ([nodejs.org](https://nodejs.org)).

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. Changes show up in the browser as you save.

## 2. Make it yours — with AI (recommended)

Open this folder in your AI coding tool (Claude Code, Cursor, Codex, Windsurf, …) and just ask in your own words:

- "Change the title on the home page to …"
- "Put my photos from the `my-photos` folder into the About section"
- "Add an About page with our team and a contact form"
- "Is my site ready to launch?"

The AI reads `AGENTS.md` and the Sensoria skill in `skills/sensoria/` first. It knows where every text and picture lives, keeps the Sensoria look, proposes a plan before building anything new, and checks the result on phone, tablet and desktop.

## 3. Make it yours — by hand

| What | Where |
|---|---|
| Texts, pictures and links of a section | `src/sections/<section>/content.ts` |
| Journal articles | `src/content/journal/` — one Markdown file per article (see its `README.md`) |
| Job openings | `src/content/careers/` — one Markdown file per job (see its `README.md`) |
| Forms (Get Started, newsletter, contact, job application) | the `action` address in the section's `content.ts` — from a form service you sign up for; until then forms open the visitor's e-mail app |
| Privacy Policy, Terms of Service | `src/content/legal/` — **sample texts**, see its `README.md` |
| Photos and videos | `public/images/`, `public/videos/` |
| Colours, fonts, spacing, motion | `src/styles/tokens.css` — the only place with design values (ask your AI: "use my brand colour #… and font …") |
| Page title and description | `metadata` in `src/app/**/page.tsx` and `src/app/layout.tsx` |
| Browser-tab icon | `public/brand/icon-light.svg` (light browser themes) and `icon-dark.svg` (dark ones) |
| Link preview image (shown when your link is shared) | `src/app/opengraph-image.jpg` (1800×945) |

## 4. Before you go live

Everything in the template — texts, reviews, numbers, job openings, e-mail addresses, the address and links — is an **example**. Replace it with your own before launch.

**Photos and videos are not included.** The live preview shows them for demonstration only. In this template every picture is a grey placeholder labelled with the size it needs ("Your photo · 1200×800") — swap in your own. Photos fill their frame and are cropped to the centre on phones, so keep the main subject in the middle.

```bash
npm run launch-check
```

lists everything that is still template content and every placeholder still waiting for your photo.

## 5. Publish

The easiest way is [Vercel](https://vercel.com): put the project in your own GitHub repository, sign in to Vercel with your account, import the repository and press Deploy. Any host that runs Next.js works too — there, set the environment variable `NEXT_PUBLIC_SITE_URL` to your site's address (e.g. `https://example.com`) so link previews work (on Vercel this is automatic).

```bash
npm run build   # check that the site builds without errors
```

## What's inside

```
src/app/          pages (one folder per address)
src/sections/     one folder per section: layout and content.ts
src/components/   shared parts: buttons, cards, tags, motion …
src/content/      journal articles, job openings and legal documents (Markdown)
src/styles/       tokens.css — all design values
src/fonts/        fonts with their licenses
public/images/    picture placeholders (put your photos here, same names and sizes)
public/videos/    your videos (the template ships without them)
skills/sensoria/  instructions for AI assistants
scripts/          launch check
```

## License

Free for any number of websites, for yourself and for your clients. Change anything; don't share or resell the template — keep your own copy **private**, and send others here instead. Full terms: [`LICENSE.md`](LICENSE.md).

There is no personal support — your AI assistant and these instructions guide you step by step. Questions about the license: [hello@lunaui.co](mailto:hello@lunaui.co).

Made by [Luna UI](https://lunaui.co).
