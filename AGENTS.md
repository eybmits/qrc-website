# AGENTS.md

Guidance for Codex when working in this repository.

## Commands

```bash
npm ci
npm run dev
npm run build
npm run lint
```

There is no separate test suite configured. Use `npm run build` as the primary validation path because the site is statically exported.

## Project Shape

This is a Next.js 14 App Router site for an introductory Quantum Reservoir Computing learning site. It statically exports for GitHub Pages.

Key routes:

| Route | Purpose |
|---|---|
| `/` | Home and reading path |
| `/qrc` | Main QRC essay |
| `/quantum-primer` | Quantum mechanics primer |
| `/echo-state` | Echo State Networks essay |
| `/physical-reservoirs` | Physical reservoir essay |
| `/measurement` | Measurement and readout essay |
| `/review` | Spaced-repetition review hub |

## Architecture Notes

- Essay pages are mostly Server Components so static text, SVG figures, and KaTeX math do not hydrate unnecessarily.
- Interactive islands remain Client Components, especially `ReviewCardSet`, `ReviewPage`, `ReviewCard`, `Sidebar`, and the Quantum Primer `BlochSphereExplorer`.
- `MathBlock` renders KaTeX server-side and keeps the same props: `math` and optional `display`.
- Review progress is stored in browser `localStorage` through `src/lib/storage.ts` under `qrc-review-state`.
- Card scheduling logic lives in `src/lib/spaced-repetition.ts`.
- Sidebar route and section metadata live in `src/data/toc.ts`; section IDs in essays should stay aligned with this file.

## Styling

- Styling uses CSS Modules plus global variables in `src/app/globals.css`.
- The global ambient background is implemented by `src/components/AmbientBackground.tsx` and `AmbientBackground.module.css`; preserve the floating square/card visual style unless the user explicitly asks to simplify it.
- The right navigation is a drawer controlled by `Sidebar.tsx`, not a permanent desktop sidebar.
- KaTeX CSS is imported globally in `src/app/layout.tsx`.

## Static Export

- `next.config.mjs` sets `output: 'export'`.
- `basePath` and `assetPrefix` are set automatically in GitHub Actions from the repository name.
- `scripts/postprocess-static-export.mjs` runs after `next build`.
- `.github/workflows/deploy-pages.yml` deploys on push to `main`.
