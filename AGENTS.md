<!-- code-review-graph MCP tools -->
# Codex Operating Guide: Airframe

Start here for Codex work in this repo. Keep token use low: use the graph first, then `CONTEXT.md`, then only the specific files needed for the task.

## Fast Context

- Product: Airframe, an interactive wireless-systems learning app for Arista-oriented SE/customer education.
- Stack: React 19, TypeScript, Vite 8, Tailwind CSS 4.2, Zustand 5, Firebase Auth/Firestore, Express/lowdb fallback API.
- Main app flow: `src/app/App.tsx` selects mode; `src/app/AcademyApp.tsx` routes screens; `src/features/curriculum/LessonView.tsx` runs briefing -> lab -> quiz; simulations resolve through `src/features/simulations/SimulationRegistry.ts`.
- Low-token docs: read `CONTEXT.md` for orientation, `MEMORY.md` for durable decisions, `CLAUDE.md` for the fuller repo brief and caveats.

## Codex Workflow

1. Use code-review-graph before broad file reads.
2. For code changes, inspect the smallest ownership slice that can answer the task.
3. Prefer existing patterns in `src/features`, `src/shared/ui`, `src/content`, `src/state`, and `src/services`.
4. Use `apply_patch` for manual edits.
5. Run focused verification. Default checks are `npm run lint` for TypeScript and `npm run build` for production bundling when UI/runtime behavior changed.
6. Do not assume `npm test` exists; `package.json` currently has no test script.
7. If graph freshness matters after edits, run `code-review-graph update --repo /Users/theorajan/local\ builds/airframe` or full `code-review-graph build --repo /Users/theorajan/local\ builds/airframe`.

## High-Risk Files

Treat these as wider blast-radius changes:

- `src/state/userStore.ts`
- `src/app/AcademyApp.tsx`
- `src/shared/ui/Layout.tsx`
- `src/features/curriculum/LessonView.tsx`
- `src/services/contentService.ts`
- `src/types.ts`
- `src/content/lessons.ts`
- `src/content/labs.ts`
- `src/features/simulations/SimulationRegistry.ts`
- `src/features/curriculum/visuals/VisualRegistry.tsx`

## Repo Invariants

- Static TypeScript content in `src/content` is the baseline source of truth; Firestore can override lessons and glossary terms at runtime.
- Preserve local-first progress merging in `userStore`: persisted lesson completion/lock state merges onto `INITIAL_LESSONS`.
- Quiz access is gated on lab completion for lessons with simulations.
- Demo mode is limited by `DEMO_LESSON_IDS` in `AcademyApp`.
- Admin CMS access is currently gated by `tinurajan1@gmail.com` or `@arista.com`.
- Add simulations by updating `SimulationType`, `SimulationRegistry.ts`, `LAB_SPECS`, and lesson `simulationId`.
- Use accurate Arista/networking terminology and realistic enterprise wireless/campus examples in content and UI copy.

## Commands

```bash
npm i
npm run dev
npm run lint
npm run build
code-review-graph status
code-review-graph build --repo /Users/theorajan/local\ builds/airframe
```

`npm run dev` starts `tsx server.ts` and serves on `http://localhost:3000`. Prefer it over raw `vite` because the Express server embeds Vite middleware.

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

### Current Graph Notes

- Full graph build completed on 2026-04-21.
- Current CLI status after rebuild: 135 files, 485 indexed nodes, 3010 status edges; build output reported 581 total nodes, 3025 edges, 44 flows, 12 communities.
- `get_architecture_overview` works through MCP.
- Some graph hotspot tools may fail with a path-resolution error; fall back to overview/search and targeted file reads.
- This folder is not a git repository, so Claude hook commands guarded by `git rev-parse` may skip graph auto-update. Run graph update/build manually when needed.
