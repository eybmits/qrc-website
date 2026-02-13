# Quantum Reservoir Computing Website

Interactive website for learning Quantum Reservoir Computing from fundamentals to implementation, with embedded flashcards and a dedicated spaced-repetition review hub.

Live site:
- `https://eybmits.github.io/qrc-website/`

## Features
- Long-form QRC learning path across multiple essays
- In-essay review cards that unlock knowledge progressively
- Review Hub with Anki-style scheduling logic
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
