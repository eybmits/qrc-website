# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Install dependencies (npm cache workaround for root-owned files)
NPM_CONFIG_CACHE=/tmp/npm-cache npm ci

# Development server
npm run dev

# Production static export (outputs to out/)
npm run build

# Lint
npm run lint

# Preview static build locally
npx serve out
```

**Important:** Always prefix npm/npx commands with `NPM_CONFIG_CACHE=/tmp/npm-cache` — the user's npm cache has root-owned files that cause permission errors otherwise.

There are no tests configured in this project.

## Architecture

This is a **Next.js 14 App Router** site that statically exports to GitHub Pages. It teaches Quantum Reservoir Computing through long-form essays with embedded spaced-repetition flashcards.

### Routing

| Route | Purpose |
|---|---|
| `/` | Hero landing page (`Hero.tsx`) |
| `/qrc` | Main QRC essay |
| `/echo-state` | Echo State Networks essay |
| `/physical-reservoirs` | Physical Reservoir Computing essay |
| `/review` | Central spaced-repetition review hub |

### Key data flow: Essay → Review

1. Each essay page imports card definitions from `src/data/*-cards.ts` and renders them inline via `<ReviewCardSet>`
2. When a user first answers an in-essay card, `ReviewCardSet` calls `unlockCardState()` (sets `unlockedAt > 0`)
3. Unlocked cards then become eligible for the `/review` page queue, scheduled by the SM-2-style algorithm in `spaced-repetition.ts`
4. All state persists in browser `localStorage` under key `qrc-review-state` (version 4; pre-v4 data is silently reset)

### Core modules

- **`src/lib/spaced-repetition.ts`** — SM-2-variant scheduler: card statuses (`new`/`learning`/`review`/`relearning`), ratings (`again`/`hard`/`good`/`easy`), interval calculation, session queue building with daily caps
- **`src/lib/storage.ts`** — localStorage read/write with normalization, version migration (resets pre-v4), daily stats tracking
- **`src/data/toc.ts`** — Sidebar metadata: essay slugs, titles, and section IDs used for scroll-spy navigation
- **`src/components/Sidebar.tsx`** — Left nav with scroll-spy section tracking and mobile hamburger menu

### Styling

- **CSS Modules** for all components (no Tailwind)
- **Global CSS variables** defined in `src/app/globals.css` — dark theme with accent colors, font stacks, spacing tokens
- Font stacks are CSS-only (no `next/font`): ui (`Eurostile`), body (`Charter`), display (`Bodoni MT`), mono (`IBM Plex Mono`)
- KaTeX styles imported globally in `layout.tsx`

### Static export & GitHub Pages

- `next.config.mjs` sets `output: 'export'` with dynamic `basePath`/`assetPrefix` for GitHub Actions
- Deployment: `.github/workflows/deploy-pages.yml` triggers on push to `main`, outputs to `out/`
- The `build` script appends `touch out/.nojekyll` to prevent Jekyll processing

### Hero visual system

`Hero.tsx` and `Hero.module.css` implement a layered animated background (starfield + aurora + SVG waves + grain). This has gone through many design iterations — see `docs/PROJECT_DOCUMENTATION.md` for the full commit history. When modifying hero visuals, preserve text/CTA readability and make small, testable commits.

### Essay page pattern

Each essay page (`src/app/qrc/page.tsx`, etc.) is a `'use client'` component that composes:
- `<Essay>` wrapper with `<Section id="...">` blocks (IDs must match `toc.ts` for scroll-spy)
- `<MathBlock>` for KaTeX rendering (inline or display mode)
- `<ReviewCardSet cards={...}>` for embedded flashcard groups
- Inline `<Figure>` components defined locally per page

### Path alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).
