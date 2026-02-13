# QRC Website Documentation

## Project Purpose
This repository contains an interactive learning website for Quantum Reservoir Computing (QRC).

The site combines:
- long-form technical essays (from intuitive start to full math),
- in-context review cards inside essays,
- a central Review Hub with spaced repetition.

Main deployment target: GitHub Pages at `https://eybmits.github.io/qrc-website/`.

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript + React
- Styling: CSS Modules + global CSS
- Math rendering: KaTeX
- Persistence: browser localStorage
- Hosting: GitHub Pages (static export)

## Routing and App Structure
Main routes:
- `/` Overview Hero page
- `/qrc` Quantum Reservoir Computing essay
- `/echo-state` Echo State Networks essay
- `/physical-reservoirs` Physical Reservoir Computing essay
- `/review` central spaced-repetition review page

Key files:
- `src/app/layout.tsx` global shell + sidebar
- `src/components/Sidebar.tsx` left navigation and section tracking
- `src/components/Hero.tsx` landing hero and visual background layers
- `src/components/Hero.module.css` hero visual system
- `src/components/Essay.tsx` essay layout primitives
- `src/components/ReviewCardSet.tsx` inline essay flashcards
- `src/components/ReviewPage.tsx` dedicated review workflow
- `src/lib/spaced-repetition.ts` scheduler and queue logic
- `src/lib/storage.ts` localStorage state, normalization, and migrations
- `src/data/*-cards.ts` card banks per essay
- `src/data/toc.ts` sidebar essay metadata and section map

## Flashcard and Scheduling Logic
The card scheduler is implemented in `src/lib/spaced-repetition.ts`.

Core model:
- statuses: `new`, `learning`, `review`, `relearning`
- ratings: `again`, `hard`, `good`, `easy`
- unlock rule: cards are considered unlocked only when `unlockedAt > 0`

Default scheduler config:
- learning steps: `[1, 10]` minutes
- relearning steps: `[10]` minutes
- graduating interval: `1` day
- easy interval: `4` days
- hard multiplier: `1.2`
- easy bonus: `1.3`
- min ease factor: `1.3`
- daily caps: `20` new, `200` review

Queue behavior (`buildSessionQueue`):
- includes only unlocked cards,
- prioritizes due learning/relearning,
- then due review (respecting daily review cap),
- then due new (respecting daily new cap).

Essay to Review flow:
- In-essay cards (`ReviewCardSet`) unlock cards on first answer.
- Once unlocked, cards can appear in `/review` according to due state and intervals.
- Storage tracks daily counters (`newSeen`, `reviewSeen`, `sessionsCompleted`, `answers`).

Storage details (`src/lib/storage.ts`):
- key: `qrc-review-state`
- version: `4`
- policy: pre-v4 state resets to default (curriculum reset)

## Hero Visual System (Current Final State)
Current target achieved from the latest visual requests:
- keep a star-sky look,
- keep smooth wave motion,
- remove flying particles,
- remove atom visuals,
- no flicker-style wave pulsing.

Current hero layers in DOM (`src/components/Hero.tsx`):
- `bgSky`
- `bgStars`
- `bgStarsSoft`
- `bgAurora`
- `bgRings`
- `bgWaveScene` (SVG wave bands)
- `bgGlow`
- `bgGrain`

Removed from DOM in final pass:
- drifting particle layer
- atom/electron visual system

Wave behavior:
- slow drift animations (`waveSceneDrift`, `waveBandA/B/C`)
- no explicit wave pulse animation

## Hero Iteration Log (Key Commits)
Chronological design history for `Hero.tsx` and `Hero.module.css`:

- `705afb3` Initial site and GitHub Pages deployment setup
- `c97d3e9` Upgrade hero with modern quantum background animation
- `340d2c4` Refresh QRC content/design and stabilize CSS rendering
- `a82cbef` Fix hero title glyph clipping in heading
- `6d2a005` Restore atom-and-orbit hero background
- `41b7e18` Redesign hero with subtle animated sky background
- `fbe3e6d` Enhance hero sky with subtle layered star motion
- `388a43c` Make starfield motion visible while keeping it subtle
- `48124e6` Enable visible hero animation by removing motion overrides
- `0e377bb` Add visible subtle hero particle motion and stronger sky drift
- `3e721f6` Strengthen starfield breathing animation
- `a31b83f` Add prominent breathing animation to top-right hero blob
- `2d62141` Replace hero background with animated SVG quantum waves
- `fdfc0ee` Fix right-side wave breathing artifact with overscan and no-scale drift
- `8beeefe` Fix hero breathing artifact by isolating blob animation
- `e6a48ce` Restore atom-orbit hero base and keep non-flicker wave layer
- `316f85e` Switch hero to starfield background and remove atoms/particles

## Local Development
Install and run:

```bash
npm ci
npm run dev
```

Build static export:

```bash
npm run build
```

Local preview of static output (optional):

```bash
npx serve out
```

## Deployment
Deployment is automated via GitHub Actions:
- workflow: `.github/workflows/deploy-pages.yml`
- trigger: push to `main`
- output: static site from `out/`

`next.config.mjs` sets:
- `output: 'export'`
- dynamic `basePath` and `assetPrefix` for GitHub Pages in Actions

## Common Troubleshooting
If the site looks unstyled or outdated after deploy:
1. Wait 1-3 minutes for Pages workflow/CDN propagation.
2. Hard refresh browser cache (`Cmd+Shift+R` on macOS).
3. Confirm generated HTML references the latest CSS hash.

If local styling looks broken:
1. Run `npm run build` to catch syntax/module errors.
2. Ensure no stale custom edits in `Hero.module.css` keyframes/layers.
3. Verify no accidental reintroduction of removed layers in `Hero.tsx`.

## Maintenance Notes
When adjusting visuals, prefer:
- small, testable commits,
- build validation before push,
- preserving readability of hero text and CTA over all backgrounds.
