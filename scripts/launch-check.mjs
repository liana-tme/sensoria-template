#!/usr/bin/env node
/*
 * Sensoria launch check — finds everything on the site that is still template sample content.
 * Rules and how to talk to the buyer: skills/sensoria/launch-check.md.
 *
 *   npm run launch-check                 report (exit code 1 while something blocks launch)
 *   npm run launch-check -- --json       the same as JSON (for AI assistants)
 *   npm run launch-check -- --placeholders
 *                                        replace every template photo that is still on the site
 *                                        with a neutral placeholder of the same size, and remove
 *                                        the template videos (their blocks show the poster instead)
 *   node scripts/launch-check.mjs --author-make-samples
 *                                        Luna UI only: record the template's samples
 *                                        (skills/sensoria/launch/samples.json). Never run on a buyer's site.
 *
 * Uses only Node built-ins (and `sharp`, which ships with Next.js, for JPEG/WebP placeholders).
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const samplesFile = path.join(root, "skills/sensoria/launch/samples.json");
/* Images replaced by --placeholders (path -> hash), so the report can remind they are temporary. */
const placeholdersFile = path.join(root, "skills/sensoria/launch/placeholders.json");
const args = new Set(process.argv.slice(2));

const PHOTO_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov"]);
/* Not sample content: the grain texture (part of the design) and the tab icons (checked as the brand below). */
const DESIGN_ASSETS = ["public/images/texture/", "public/brand/"];
/* Placeholder colour = --color-divider (#404040): neutral, and white text on photos stays readable. */
const PLACEHOLDER_RGB = [0x40, 0x40, 0x40];

/* Template facts that must never reach a live site (checked in src/, always). */
const FACTS = [
  { id: "email", pattern: /[\w.-]+@sensoria\.com/g, what: "template e-mail address" },
  { id: "address", pattern: /82 Rothschild Blvd|82\+Rothschild\+Blvd/g, what: "template lab address" },
  { id: "author-social", pattern: /(?:instagram\.com\/liana\.tudakova|linkedin\.com\/in\/liana-tme|threads\.com\/@liana\.tudakova)/g, what: "the template author's social profile" },
  { id: "store", pattern: /lunaui\.co\/code-templates\/[\w-]+/g, what: "link to the template's store page" },
  { id: "to-write", pattern: /TO WRITE[^"`\n]{0,40}/g, what: "text left for you to write" },
  { id: "numbers", pattern: /98% precision|100,000 dermal points|82% → 96%|\+14% Glow|60% increase in leads/g, what: "made-up number shown as fact" },
];

const rel = (p) => path.relative(root, p).split(path.sep).join("/");
const sha = (buf) => createHash("sha256").update(buf).digest("hex").slice(0, 16);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/* ---------- what the site contains now ---------- */

function imageFiles() {
  // public/ photos and pictures, plus the link preview image in src/app (opengraph-image.*)
  return [...walk(path.join(root, "public")), ...walk(path.join(root, "src/app")).filter((f) => /\/(opengraph|twitter)-image\.[a-z]+$/.test(f))]
    .filter((f) => PHOTO_EXT.has(path.extname(f).toLowerCase()) || f.endsWith(".svg"))
    .filter((f) => !DESIGN_ASSETS.some((d) => rel(f).startsWith(d)));
}

/* Visible texts from every section's content.ts (string literals that read like words). */
function contentTexts() {
  const out = [];
  for (const file of walk(path.join(root, "src/sections")).filter((f) => f.endsWith("content.ts"))) {
    const src = fs.readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const body = src.slice(src.search(/export const /));
    for (const m of body.matchAll(/"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)) {
      const text = (m[1] ?? m[2] ?? "").replace(/\\n/g, "\n").trim();
      if (!/[A-Za-zÀ-ÿ]/.test(text)) continue;
      if (/^(\/|https?:|mailto:|#|\.\.?\/|@\/)/.test(text)) continue; // links and paths
      if (/^[a-z0-9-]+$/.test(text) && !text.includes(" ")) continue; // icon names, ids, variants
      out.push({ file: rel(file), text });
    }
  }
  return out;
}

function videoFiles() {
  return walk(path.join(root, "public")).filter((f) => VIDEO_EXT.has(path.extname(f).toLowerCase()));
}

function markdownDocs() {
  return ["src/content/journal", "src/content/careers", "src/content/legal"].flatMap((d) =>
    walk(path.join(root, d)).filter((f) => f.endsWith(".md") && path.basename(f) !== "README.md"),
  );
}

function snapshot() {
  const images = Object.fromEntries(imageFiles().map((f) => [rel(f), sha(fs.readFileSync(f))]));
  const videos = Object.fromEntries(videoFiles().map((f) => [rel(f), sha(fs.readFileSync(f))]));
  const docs = Object.fromEntries(markdownDocs().map((f) => [rel(f), sha(fs.readFileSync(f))]));
  const iconFiles = ["public/brand/icon-light.svg", "public/brand/icon-dark.svg"].map((f) => path.join(root, f)).filter((f) => fs.existsSync(f));
  return {
    images,
    videos,
    docs,
    texts: contentTexts(),
    favicon: iconFiles.length ? sha(Buffer.concat(iconFiles.map((f) => fs.readFileSync(f)))) : null,
  };
}

/* ---------- placeholders ---------- */

function crc32(buf) {
  let c = ~0;
  for (const b of buf) {
    c ^= b;
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function solidPng(w, h) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // truecolour
  const row = Buffer.alloc(1 + w * 3);
  for (let x = 0; x < w; x++) row.set(PLACEHOLDER_RGB, 1 + x * 3);
  const raw = Buffer.concat(Array.from({ length: h }, () => row));
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

/* Width and height of PNG / JPEG / WebP files, read from their headers. */
function imageSize(buf) {
  if (buf.readUInt32BE(0) === 0x89504e47) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      i += 2 + len;
    }
  }
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const kind = buf.toString("ascii", 12, 16);
    if (kind === "VP8X") return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
    if (kind === "VP8L") {
      const b = buf.readUInt32LE(21);
      return [1 + (b & 0x3fff), 1 + ((b >> 14) & 0x3fff)];
    }
    if (kind === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
  }
  return null;
}

/*
 * Label on a placeholder (only where it fits): "Your photo · 1200×800" and, below it,
 * "keep the subject in the centre" — photos are cropped to their centre on narrow screens,
 * so the label is sized to fit the centre square that stays visible.
 */
const LABEL_MIN = 120;
const labelSvg = (w, h, title, hint) => {
  const size = Math.round(Math.max(12, (Math.min(w, h) * 0.6) / (title.length * 0.6))); // grows with the photo, so it stays readable when shown small
  const line = (y, text, weight, opacity, s) =>
    `<text x="50%" y="${y}" text-anchor="middle" dominant-baseline="central" font-family="Helvetica, Arial, sans-serif" font-weight="${weight}" font-size="${s}" fill="#ffffff" fill-opacity="${opacity}">${text}</text>`;
  if (!hint) return line("50%", title, 600, 0.55, size);
  const small = Math.max(11, Math.round(size * 0.72));
  return line(h / 2 - small * 0.75, title, 600, 0.55, size) + line(h / 2 + size * 0.85, hint, 500, 0.45, small);
};
const placeholderLabel = (file, w, h) =>
  /(opengraph|twitter)-image\./.test(file) ? labelSvg(w, h, `Link preview image · ${w}×${h}`, "shown when your link is shared") : labelSvg(w, h, `Your photo · ${w}×${h}`, "keep the subject in the centre");

async function makePlaceholder(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".svg") {
    const svg = fs.readFileSync(file, "utf8");
    const vb = svg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 100 40";
    const [, , w, h] = vb.split(/[\s,]+/).map(Number);
    fs.writeFileSync(
      file,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><rect width="${w}" height="${h}" rx="${Math.min(w, h) / 4}" fill="currentColor" opacity="0.15"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="${Math.round(h / 3)}" fill="currentColor" fill-opacity="0.45">Logo</text></svg>\n`,
    );
    return true;
  }
  const buf = fs.readFileSync(file);
  const size = imageSize(buf);
  if (!size) return false;
  const [w, h] = size;
  try {
    const { default: sharp } = await import("sharp");
    // Cut-outs (PNGs with real transparency) become fully transparent, so the photo behind them shows.
    const cutout = ext === ".png" && !(await sharp(buf).stats()).isOpaque;
    const svg = cutout
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="rgb(${PLACEHOLDER_RGB.join(",")})"/>${Math.min(w, h) >= LABEL_MIN ? placeholderLabel(file, w, h) : ""}</svg>`;
    const out = sharp(Buffer.from(svg)).resize(w, h);
    const data = await (ext === ".webp" ? out.webp() : ext === ".png" ? out.png() : out.jpeg()).toBuffer();
    fs.writeFileSync(file, data);
    return true;
  } catch {
    // Without sharp: plain grey PNG files only.
    if (ext !== ".png") return false;
    fs.writeFileSync(file, solidPng(w, h));
    return true;
  }
}

/* ---------- report ---------- */

function check(samples) {
  const now = snapshot();
  const sampleTexts = new Set(samples.texts.map((t) => `${t.file}\u0000${t.text}`));

  const photos = Object.entries(now.images)
    .filter(([p, h]) => samples.images[p] === h || Object.values(samples.images).includes(h))
    .map(([p]) => p);
  const logos = photos.filter((p) => p.endsWith(".svg"));
  const rasters = photos.filter((p) => !p.endsWith(".svg"));

  const texts = {};
  for (const t of now.texts) {
    if (!sampleTexts.has(`${t.file}\u0000${t.text}`)) continue;
    (texts[t.file] ??= []).push(t.text);
  }

  const sampleVideos = Object.values(samples.videos ?? {});
  const videos = Object.entries(now.videos).filter(([p, h]) => (samples.videos ?? {})[p] === h || sampleVideos.includes(h)).map(([p]) => p);
  const docs = Object.entries(now.docs).filter(([p, h]) => samples.docs[p] === h).map(([p]) => p);
  const jobs = docs.filter((d) => d.includes("/careers/"));
  const legalSamples = walk(path.join(root, "src/content/legal"))
    .filter((f) => f.endsWith(".md") && path.basename(f) !== "README.md" && fs.readFileSync(f, "utf8").includes("SAMPLE TEXT"))
    .map(rel);

  const facts = [];
  for (const f of walk(path.join(root, "src")).filter((f) => /\.(ts|tsx|md)$/.test(f) && path.basename(f) !== "README.md")) {
    const src = fs.readFileSync(f, "utf8");
    for (const fact of FACTS) {
      for (const m of src.matchAll(fact.pattern)) facts.push({ file: rel(f), found: m[0], what: fact.what });
    }
  }

  const brandFiles = walk(path.join(root, "src")).filter((f) => /\.(ts|tsx)$/.test(f) && /\bSensoria\b/.test(fs.readFileSync(f, "utf8"))).map(rel);
  const hasIcon = now.favicon !== null || fs.readdirSync(path.join(root, "src/app")).some((f) => /^(favicon\.ico|icon\.(png|svg|ico|jpg))$/.test(f));
  const favicon = !hasIcon ? "missing" : now.favicon !== null && now.favicon === samples.favicon;

  const recorded = fs.existsSync(placeholdersFile) ? JSON.parse(fs.readFileSync(placeholdersFile, "utf8")) : {};
  const placeholders = Object.entries(recorded).filter(([p, h]) => now.images[p] === h).map(([p]) => p);

  const shareFile = fs.readdirSync(path.join(root, "src/app")).find((f) => /^opengraph-image\./.test(f));
  const sharePath = shareFile ? `src/app/${shareFile}` : null;
  const shareImage = !sharePath ? "missing" : placeholders.includes(sharePath) ? "placeholder" : rasters.includes(sharePath) ? "template" : "yours";
  const blockers = rasters.length + logos.length + videos.length + placeholders.length + legalSamples.length + facts.length + jobs.length;
  return { rasters, logos, videos, placeholders, texts, docs, jobs, legalSamples, facts, brandFiles, favicon, shareImage, blockers };
}

function print(r) {
  const line = (s = "") => console.log(s);
  const list = (items, max = 12) => {
    items.slice(0, max).forEach((i) => line(`    - ${i}`));
    if (items.length > max) line(`    … and ${items.length - max} more`);
  };
  line("Sensoria launch check");
  line("=====================");
  line(r.blockers ? `NOT READY — ${r.blockers} item(s) must be replaced before launch.` : "Ready: no photo placeholders, template facts or sample legal texts left.");
  line();
  line(`Template photos still on the site: ${r.rasters.length} (must be replaced — yours or placeholders)`);
  list(r.rasters);
  if (r.logos.length) {
    line(`Template logos: ${r.logos.length} (yours, or remove them)`);
    list(r.logos);
  }
  line(`Template videos still on the site: ${r.videos.length} (yours, or delete the file — the block then shows its poster photo)`);
  list(r.videos);
  line(`Template job openings: ${r.jobs.length} (yours, or remove the files — never publish made-up jobs)`);
  list(r.jobs);
  if (r.placeholders.length) {
    line(`Photo placeholders waiting for your pictures: ${r.placeholders.length} (same file name and size; or remove the block)`);
    list(r.placeholders, 12);
  }
  line(`Template facts and contacts: ${r.facts.length} (must be yours)`);
  list(r.facts.map((f) => `${f.what}: "${f.found}" in ${f.file}`));
  line(`Legal texts still marked SAMPLE: ${r.legalSamples.length} (yours, reviewed by a lawyer)`);
  list(r.legalSamples);
  line();
  const textFiles = Object.entries(r.texts);
  const textCount = textFiles.reduce((n, [, t]) => n + t.length, 0);
  line(`Template texts still unchanged: ${textCount} in ${textFiles.length} section(s) (replace with your own)`);
  for (const [file, texts] of textFiles) {
    line(`  ${file}: ${texts.length}`);
    list(texts.map((t) => `"${t.replace(/\s+/g, " ").slice(0, 70)}"`), 3);
  }
  line(`Template journal articles unchanged: ${r.docs.filter((d) => d.includes("/journal/")).length}`);
  line();
  line("Brand");
  line(`  "Sensoria" still appears in ${r.brandFiles.length} file(s) — rename if your product has another name.`);
  line(`  Browser-tab icon: ${r.favicon === "missing" ? "missing — add public/brand/icon-light.svg and icon-dark.svg" : r.favicon ? "still the template's (public/brand/icon-light.svg, icon-dark.svg)" : "replaced"}`);
  const shareText = {
    missing: "missing — add src/app/opengraph-image.jpg (about 1800×945)",
    placeholder: "still a placeholder — replace src/app/opengraph-image.jpg with yours",
    template: "still the template's — replace src/app/opengraph-image.jpg with yours",
    yours: "yours",
  };
  line(`  Link preview image (shown when your link is shared): ${shareText[r.shareImage]}`);
  const siteUrlSet =
    Boolean(process.env.NEXT_PUBLIC_SITE_URL) ||
    fs.readdirSync(root).some((f) => /^\.env/.test(f) && /^\s*NEXT_PUBLIC_SITE_URL\s*=\s*\S+/m.test(fs.readFileSync(path.join(root, f), "utf8")));
  line(`  Site address for link previews: ${siteUrlSet ? "set (NEXT_PUBLIC_SITE_URL)" : "automatic on Vercel — publishing elsewhere? set NEXT_PUBLIC_SITE_URL to your address (see README), or link previews won't show"}`);
}

/* ---------- main ---------- */

if (args.has("--author-make-samples")) {
  fs.mkdirSync(path.dirname(samplesFile), { recursive: true });
  fs.writeFileSync(samplesFile, JSON.stringify(snapshot(), null, 2) + "\n");
  console.log(`Recorded template samples in ${rel(samplesFile)}.`);
  process.exit(0);
}

if (!fs.existsSync(samplesFile)) {
  console.error(`Missing ${rel(samplesFile)} — the list of template samples. Restore it from the template download.`);
  process.exit(2);
}
const samples = JSON.parse(fs.readFileSync(samplesFile, "utf8"));

if (args.has("--placeholders")) {
  const r = check(samples);
  let done = 0;
  const skipped = [];
  const recorded = fs.existsSync(placeholdersFile) ? JSON.parse(fs.readFileSync(placeholdersFile, "utf8")) : {};
  for (const p of [...r.rasters, ...r.logos]) {
    if (await makePlaceholder(path.join(root, p))) {
      recorded[p] = sha(fs.readFileSync(path.join(root, p)));
      done++;
    } else skipped.push(p);
  }
  fs.writeFileSync(placeholdersFile, JSON.stringify(recorded, null, 2) + "\n");
  // Sample videos are never shipped: remove them; their blocks show the poster (now a placeholder).
  for (const v of r.videos) fs.rmSync(path.join(root, v));
  console.log(`Replaced ${done} template image(s) with neutral placeholders; removed ${r.videos.length} template video(s).`);
  if (skipped.length) console.log(`Could not replace (do it by hand):\n${skipped.map((s) => `  - ${s}`).join("\n")}`);
  process.exit(0);
}

const result = check(samples);
if (args.has("--json")) console.log(JSON.stringify(result, null, 2));
else print(result);
process.exit(result.blockers ? 1 : 0);
