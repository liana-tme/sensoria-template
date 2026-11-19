# Journal articles (the CMS)

One file = one article. Notes for yourself in `<!-- ... -->` never appear on the site.
The file name is the article address: `skin-barrier-basics.md` → `/journal/skin-barrier-basics`.

## Add an article
1. Copy any file here and rename it (lowercase words with dashes).
2. Fill the fields at the top, between the two `---` lines:

| Field | What it is |
|---|---|
| `title` | article title (about 50 characters) |
| `date` | `YYYY-MM-DD`; newest articles come first everywhere |
| `banner` | wide photo for the card and the article, e.g. `/images/journal/<file name>.png` (put the file in `public/images/journal/`) |
| `bannerAlt` | what the photo shows |
| `intro` | one or two sentences under the title |
| `author`, `authorRole`, `authorImage` | the author line (square photo in `public/images/journal/authors/`) |

3. Write the text below the fields:
   - `## ` section heading
   - empty line between paragraphs
   - `**bold**` for key words
   - `- ` bullet list, `1. ` numbered list
   - `> ` quote (a line `> — Name` under it for the author)

The journal page shows 6 articles first and a "Load More" button when there are more.
Each article page ends with two other articles ("More Insights").
