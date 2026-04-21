# Codex Handoff: Airframe

Use `AGENTS.md` as the authoritative Codex instruction file. This file is a short handoff for fast orientation.

## Read Order

1. `AGENTS.md`: operating rules, graph-first workflow, repo invariants.
2. `CONTEXT.md`: compact map of app flow, stack, commands, and risky files.
3. `MEMORY.md`: durable decisions, caveats, and follow-ups.
4. Source files only after graph search or targeted need.

## First Commands

```bash
code-review-graph status
npm run lint
```

Use `npm run build` when a change affects runtime behavior, bundling, lazy imports, Tailwind classes, Firebase/API paths, or app shell routing.

If a dev server is already running on port `3000`, either stop it or use `PORT=3001 npm run dev`.

## Deployment

- GitHub target: `https://github.com/zNeuralNetworks/AirFrame`
- Cloud Run support files: `Dockerfile`, `.dockerignore`, `cloudbuild.yaml`
- Production uses Secret Manager secret `airframe-jwt-secret` by default; Cloud Build creates it on first deploy if missing.
- Cloud Run lowdb fallback path is `/tmp/airframe/database.json`; durable progress should use Firestore.

## Graph

The repo has a rebuilt `.code-review-graph/graph.db`, but `.code-review-graph/` is gitignored. If the graph is missing or stale:

```bash
code-review-graph build --repo /Users/theorajan/local\ builds/airframe
```

If only source files changed:

```bash
code-review-graph update --repo /Users/theorajan/local\ builds/airframe
```

## Task Routing

- UI/app shell: start with `src/app/App.tsx`, `src/app/AcademyApp.tsx`, `src/shared/ui/Layout.tsx`.
- Lesson flow: start with `src/features/curriculum/LessonView.tsx`.
- Simulation work: start with `src/features/simulations/SimulationRegistry.ts`, target simulation component, `src/content/labs.ts`, and `src/types.ts`.
- Content work: start with `src/content/lessons.ts`, `src/content/modules.ts`, `src/content/glossary.ts`, plus `src/services/contentService.ts` if Firestore behavior matters.
- Progress/auth: start with `src/state/userStore.ts`, `src/lib/firebase.ts`, `src/services/apiService.ts`, `server.ts`.
- Design-system docs: start with `src/app/DesignSystem.tsx` and `src/features/design-system/useDesignSystemRoutes.tsx`.

## Verification Defaults

- Docs-only: no runtime check required unless markdown links/commands changed.
- Type/content/registry changes: run `npm run lint`.
- UI/runtime changes: run `npm run build`; run local dev server if visual verification is needed.
- For the Knowledge Constellation, run `npm run screenshot:constellation` with the dev server already running.
- No `npm test` script exists today.
