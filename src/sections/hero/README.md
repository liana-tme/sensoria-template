# Hero

The full-screen first section of the Home page.

## What it does
- A full-screen photo. On desktop it flows like liquid where the mouse moves; on tablets and phones it is a still photo.
- At the bottom left: a short lead, a subtitle and the big title. The title inverts the photo under it.
- On the right edge: a small vertical year mark with a ruler.
- While you scroll, the hero moves a little slower than the page, so the next section slides over it.
- After the preloader the photo settles in and the texts drop in one after another.

## What you can change (in `content.ts`)
| Field | What it is |
|---|---|
| `image` | the photo (`public/images/hero/`) and its description. Keep the face in the centre: phones show only the middle. |
| `lead` | the short paragraph |
| `subtitle` | the line above the title |
| `title` | the big title (shown in capitals) |
| `mark` | the two tiny texts beside the ruler |

## Do not change
Layout, sizes, the blend on the title and the motion. They come from `tokens.css`.
