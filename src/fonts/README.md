# Fonts

All fonts are free and open source under the **SIL Open Font License 1.1 (OFL)**.
Each folder holds the font files and their license (`OFL.txt`). The fonts keep their own
licenses; the Luna UI template license does not change them.

| Font | Used for | Files | Source |
|---|---|---|---|
| Inter Display | all text | `inter-display/InterDisplay-*.woff2` (Regular, Italic, Medium, SemiBold, Bold) | [rsms/inter](https://github.com/rsms/inter/releases/tag/v4.1), official release 4.1, unmodified |
| Instrument Serif | serif accents | `instrument-serif/InstrumentSerif-*.ttf` (Regular, Italic) | [google/fonts](https://github.com/google/fonts/tree/main/ofl/instrumentserif), unmodified |

Fonts are connected in `src/app/layout.tsx` and mapped to `font-sans` and `font-serif` in `src/styles/tokens.css`.
