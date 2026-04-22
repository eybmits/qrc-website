# Quantum Reservoir Computing Website

Interactive website for learning Quantum Reservoir Computing from fundamentals to implementation, with embedded flashcards and a dedicated spaced-repetition review hub.

Live site:
- `https://eybmits.github.io/qrc-website/`

## Features
- Five-part QRC learning path across long-form essays
- In-essay review cards that unlock knowledge progressively
- Review Hub with Anki-style scheduling logic
- Page-specific metadata, social previews, sitemap, robots, and structured data
- Generated app manifest, icons, and custom 404 page
- Modern animated hero background tuned for readability and stability

## Project Docs
- Full technical documentation: `docs/PROJECT_DOCUMENTATION.md`

## Development
Install dependencies:

```bash
npm ci
```

Run development server:

```bash
npm run dev
```

Create production static export:

```bash
npm run build
```

## Deployment
Deployment runs automatically via GitHub Actions on push to `main`:
- Workflow: `.github/workflows/deploy-pages.yml`
- Output directory: `out/`
- Hosting: GitHub Pages

## Public Routes
- `/` Home
- `/quantum-primer`
- `/qrc`
- `/echo-state`
- `/physical-reservoirs`
- `/measurement`
- `/review`

Generated metadata and platform routes:
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/opengraph-image`
- `/twitter-image`
- `/icon`
- `/apple-icon`
