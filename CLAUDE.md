<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
| ------ | ---------- |
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.

## Repo Brief

Airframe is a React/Vite/TypeScript learning environment for wireless systems. The product teaches RF, Wi-Fi, CV-CUE, WIPS, campus architecture, and wired-foundation concepts through lessons, simulations, quizzes, demo flows, and an internal design-system reference.

Primary stack:
- React 19, TypeScript 5.8, Vite 8, Tailwind CSS 4.2.
- Zustand 5 with `persist` for local-first progress state.
- Firebase Auth/Firestore for identity, feedback, cloud progress, lessons, and glossary overrides.
- Express 5 + Vite middleware + lowdb as a legacy/local API fallback.

High-value entry points:
- `src/app/App.tsx`: top-level mode switch for landing, academy, demo, design system, and launcher.
- `src/app/AcademyApp.tsx`: main screen router, navigation, search index, admin CMS gate, demo filtering.
- `src/state/userStore.ts`: source of truth for lessons, glossary, progress, auth state, Firebase/API sync, XP, achievements, quiz history, reflections.
- `src/features/curriculum/LessonView.tsx`: lesson loop orchestrator for briefing, simulation/lab, quiz/assessment, glossary drawer, telemetry.
- `src/features/simulations/SimulationRegistry.ts`: lazy simulation registry keyed by `SimulationType`.
- `src/content/lessons.ts`, `src/content/modules.ts`, `src/content/labs.ts`, `src/content/glossary.ts`: content-as-code core.
- `src/lib/firebase.ts`: Firebase initialization, auth exports, Firestore error payloads, boot-time connection check.
- `server.ts`, `server/db.ts`: local Express API, JWT auth, lowdb persistence, Vite dev middleware.

Current architecture shape from the graph:
- Largest community is `src/features`, especially curriculum, simulations, dashboard, CMS, demo, and design-system components.
- `src/app` is a thin shell that calls into features and shared layout.
- Shared UI lives under `src/shared/ui`; layout and search couple into many feature surfaces.
- Services and state are small but high-impact because lesson/progress/auth flows depend on them.
- Graph warnings show high coupling between app/layout/services and the feature-heavy simulation/curriculum area. Treat changes to `AcademyApp`, `Layout`, `LessonView`, `userStore`, `contentService`, and registries as wider blast-radius changes.

Development commands:
- `npm run dev`: starts `tsx server.ts` on port 3000 with Vite middleware.
- `npm run build`: production Vite build.
- `npm run lint`: runs `tsc --noEmit`; this is the main type/check command.
- README references `npm run test`, but `package.json` currently has no `test` script.

Important invariants:
- Add a simulation by updating `SimulationType` in `src/types.ts`, adding/lazy-registering the component in `SimulationRegistry.ts`, adding a `LAB_SPECS` entry in `src/content/labs.ts`, and assigning `simulationId` from lesson content.
- Preserve local-first progress merge behavior in `userStore`; persisted progress is intentionally merged onto static `INITIAL_LESSONS` so new lessons can appear without wiping completion state.
- Demo mode only exposes `DEMO_LESSON_IDS` from `AcademyApp`.
- Admin CMS access is email gated by `tinurajan1@gmail.com` or `@arista.com`.
- Firestore lessons/glossary override static content when present; static content remains the fallback.
- Quiz access is blocked until the lab is complete when a lesson has a simulation.
- Use Arista-accurate terminology and realistic enterprise wireless/networking scenarios in content or UI copy.

Known caveats:
- Docs mention some historical names and React 18, but package metadata uses React 19 and current source uses the feature-based `src/features` structure.
- `docs/TECHNICAL_DESIGN.md` says simulations are managed through `VisualRegistry`; the active simulation registry is `src/features/simulations/SimulationRegistry.ts`. `VisualRegistry` is for curriculum visuals.
- `vite.config.ts` sets Vite server port 3000, while `server.ts` also listens on 3000 and embeds Vite middleware. Prefer `npm run dev` rather than raw `vite`.
- The code-review graph `get_hub_nodes` and `get_bridge_nodes` calls may fail with `'str' object has no attribute 'resolve'`; `get_architecture_overview` works.
