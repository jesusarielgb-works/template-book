# Fonts — JAG Brand Template v1.1

This directory holds locally-hosted font files for PDF generation
(required when Google Fonts is unavailable or for offline rendering
with WeasyPrint / puppeteer / pandoc).

## Required families

| Family | Role | License | Download |
|--------|------|---------|----------|
| Playfair Display | Display / titles | SIL OFL 1.1 | [google.com/fonts](https://fonts.google.com/specimen/Playfair+Display) |
| Source Serif 4 | Body (article / book) | SIL OFL 1.1 | [google.com/fonts](https://fonts.google.com/specimen/Source+Serif+4) |
| Source Sans 3 | Body (technical doc) | SIL OFL 1.1 | [google.com/fonts](https://fonts.google.com/specimen/Source+Sans+3) |
| JetBrains Mono | Code / metadata | SIL OFL 1.1 | [jetbrains.com](https://www.jetbrains.com/legalforms/fonts/) |

## SIL Open Font License 1.1

All four families are licensed under the SIL Open Font License 1.1.
This allows:
- Free use, modification, and distribution
- Embedding in documents (PDFs, ebooks, web)
- Commercial use

Full license text: https://openfontlicense.org/

## Directory structure (after download)

```
assets/fonts/
├── PlayfairDisplay/
│   ├── PlayfairDisplay-Bold.woff2
│   └── PlayfairDisplay-BoldItalic.woff2
├── SourceSerif4/
│   ├── SourceSerif4-Regular.woff2
│   ├── SourceSerif4-Italic.woff2
│   └── SourceSerif4-SemiBold.woff2
├── SourceSans3/
│   ├── SourceSans3-Regular.woff2
│   ├── SourceSans3-Italic.woff2
│   └── SourceSans3-SemiBold.woff2
├── JetBrainsMono/
│   ├── JetBrainsMono-Regular.woff2
│   └── JetBrainsMono-Medium.woff2
└── README.md
```

## @font-face declarations (for brand.css when using local fonts)

Replace the Google Fonts `<link>` with these declarations:

```css
@font-face {
  font-family: 'Playfair Display';
  src: url('../assets/fonts/PlayfairDisplay/PlayfairDisplay-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Source Serif 4';
  src: url('../assets/fonts/SourceSerif4/SourceSerif4-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Source Sans 3';
  src: url('../assets/fonts/SourceSans3/SourceSans3-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('../assets/fonts/JetBrainsMono/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```
