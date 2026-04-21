# Airframe Context

Use this file as the low-token starting point for future work. For deeper architecture, read `CLAUDE.md` first, then only the specific entry-point files needed for the task.

## Product

Airframe is an interactive wireless-systems learning app for Arista-oriented SE/customer education. It combines structured lessons, visual explainers, hands-on simulations, quizzes, demo tools, scorecards, databank/search, and an internal design-system app.

## Stack

- React 19, TypeScript, Vite 8, Tailwind CSS 4.2.
- Zustand 5 with persisted local progress.
- Firebase Auth/Firestore for Google login, user progress, feedback, lesson/glossary overrides.
- Express/lowdb/JWT local API exists as a legacy or fallback backend and also hosts Vite middleware in dev.
- Icons: `lucide-react`; charts: `recharts`; animation: `motion`.

## Main Paths

- `src/app/App.tsx`: mode switch for landing, launcher, academy, demo, design.
- `src/app/AcademyApp.tsx`: academy shell, screen routing, search index, nav items, admin gate.
- `src/shared/ui/Layout.tsx`: global UI shell.
- `src/shared/ui/layout/*`: sidebar, mobile bars, search, theme, feedback modal.
- `src/state/userStore.ts`: progress, auth, lesson/glossary loading, sync, achievements, reflections.
- `src/features/curriculum/LessonView.tsx`: briefing -> lab -> quiz flow.
- `src/features/curriculum/*`: course map, briefing renderer, lab manager, quiz engine, assessment, glossary drawer.
- `src/features/simulations/*`: interactive labs.
- `src/features/simulations/SimulationRegistry.ts`: lazy sim lookup.
- `src/features/curriculum/visuals/VisualRegistry.tsx`: non-interactive content visual lookup.
- `src/content/*`: lessons, modules, labs, glossary, cheatsheets, comparisons, demo/copilot data.
- `src/services/contentService.ts`: Firestore content override merge.
- `src/lib/firebase.ts`: Firebase config/init and structured Firestore error handling.
- `server.ts`, `server/db.ts`: local API and lowdb store.

## Core Flow

`App` selects a mode. `AcademyApp` loads auth/content, builds nav/search state, and renders a screen. `LessonView` selects a lesson from `userStore`, shows a briefing, launches a lazy simulation through `SimulationRegistry`, gates quiz access on `simCompleted`, and records completion/telemetry/progress.

## Commands

- Install: `npm i`
- Dev server: `npm run dev` (serves on `http://localhost:3000`)
- Build: `npm run build`
- Type check: `npm run lint`
- No test script is currently defined.

## Change Risk

High-blast-radius files: `src/state/userStore.ts`, `src/app/AcademyApp.tsx`, `src/shared/ui/Layout.tsx`, `src/features/curriculum/LessonView.tsx`, `src/services/contentService.ts`, `src/types.ts`, `src/content/lessons.ts`, `src/content/labs.ts`, and simulation/visual registries.

## Add Simulation Checklist

1. Add the simulation id to `SimulationType` in `src/types.ts`.
2. Add the React component under `src/features/simulations/`.
3. Register it in `src/features/simulations/SimulationRegistry.ts`.
4. Add a matching `LAB_SPECS` entry in `src/content/labs.ts`.
5. Reference the id from a lesson in `src/content/lessons.ts` or Firestore content.
6. Verify lab completion triggers `onComplete` if challenges are auto-checked.

## Graph Note

Project instructions require using code-review-graph MCP tools before grep/read exploration. `get_architecture_overview` works and reported high coupling between feature/simulation areas and app/layout/services. Some graph hotspot tools may currently fail with a path-resolution error.
