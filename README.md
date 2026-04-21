# Airframe Academy

**A reasoning environment for wireless systems.**

Airframe is an interactive learning platform for wireless engineering, built for active reasoning instead of passive video consumption. It combines curriculum, simulations, visual explainers, quizzes, demo workflows, scorecards, searchable reference material, and an internal design-system reference.

Primary audience: Arista-oriented SE/customer education across Wi-Fi, RF fundamentals, roaming, WIPS/WIDS, CV-CUE observability, campus architecture, and wired-foundation topics such as PoE, MTU, and Multi-Gig uplinks.

## Current Stack

- React 19
- TypeScript 5.8
- Vite 8
- Tailwind CSS 4.2
- Zustand 5 with persisted local progress
- Firebase Auth and Firestore
- Express 5, JWT, and lowdb for the local/legacy API path
- `lucide-react`, `motion`, `react-markdown`, and `recharts`

## Quick Start

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm i
```

### Start Development Server

```bash
npm run dev
```

Open `http://localhost:3000`.

`npm run dev` runs `tsx server.ts`. The Express server listens on port `3000` and mounts Vite middleware in development. Prefer this path over running raw `vite`.

If port `3000` is already in use, stop the existing dev server or run another instance on a different port:

```bash
PORT=3001 npm run dev
```

### Type Check

```bash
npm run lint
```

The `lint` script currently runs `tsc --noEmit`.

### Build

```bash
npm run build
```

This creates the production `dist/` bundle and copies root-level mascot PNG assets into `dist/` so the Express production server can serve them.

### Preview

```bash
npm run preview
```

No `npm test` script is currently defined.

### Browser Screenshot Check

With `npm run dev` already running:

```bash
npm run screenshot:constellation
```

This captures the Airframe Labs Knowledge Constellation to `output/playwright/airframe-constellation.png`.

## Product Modes

The top-level app has five modes:

- Landing page
- Launcher
- Airframe Academy
- Quick Demo
- Design System

Quick Demo is a curated path for short customer-facing or internal demo sessions. The current demo lesson IDs are controlled in `src/app/AcademyApp.tsx`.

Search is available through the app shell and indexes lessons, glossary terms, and cheatsheets.

## Architecture

```text
airframe/
├── src/
│   ├── app/                  # Top-level app modes and academy shell
│   ├── components/           # Remaining legacy/shared components
│   ├── content/              # Content-as-code: lessons, modules, labs, glossary, demos
│   ├── context/              # Theme context
│   ├── features/             # Curriculum, simulations, dashboard, CMS, demo, design system
│   ├── hooks/                # Content lookup hooks
│   ├── lib/                  # Firebase integration and Firestore error handling
│   ├── services/             # API, content, Gemini, telemetry services
│   ├── shared/ui/            # Layout, navigation, mascot, UI utilities
│   ├── state/                # Zustand user/progress store
│   └── types.ts              # Core domain types
├── server.ts                 # Express API + Vite middleware
├── server/db.ts              # lowdb local persistence
├── docs/                     # Design, architecture, setup, and planning docs
├── AGENTS.md                 # Codex operating guide
├── CODEX.md                  # Short Codex handoff
├── CONTEXT.md                # Low-token repo context
└── MEMORY.md                 # Durable decisions and caveats
```

## Core Flow

`src/app/App.tsx` selects the app mode.

`src/app/AcademyApp.tsx` initializes auth/content, builds navigation and search data, applies demo filtering, gates admin CMS access, and routes screens.

`src/features/curriculum/LessonView.tsx` runs the learning loop:

1. Briefing content
2. Interactive lab through `SimulationRegistry`
3. Quiz or assessment
4. Completion, XP, telemetry, and progress sync

`src/state/userStore.ts` is the main state boundary for lessons, glossary, auth state, user progress, achievements, reflections, Firebase sync, and fallback API sync.

## Content Model

Airframe uses content-as-code as the baseline:

- `src/content/lessons.ts`: lessons, markdown-like briefing content, quizzes, XP, simulation IDs
- `src/content/modules.ts`: module grouping and metadata
- `src/content/labs.ts`: lab objectives, baselines, challenges, auto-check metadata
- `src/content/glossary.ts`: glossary and misconceptions
- `src/content/cheatsheets.ts`, `comparisons.ts`, `copilot.ts`, `scenarios.ts`: reference/demo support

Firestore can override lessons and glossary terms at runtime through `src/services/contentService.ts`. Static content remains the fallback.

## Simulation Checklist

To add a simulation:

1. Add the new ID to `SimulationType` in `src/types.ts`.
2. Add the React component under `src/features/simulations/`.
3. Register it in `src/features/simulations/SimulationRegistry.ts`.
4. Add a matching `LAB_SPECS` entry in `src/content/labs.ts`.
5. Reference the simulation ID from a lesson in `src/content/lessons.ts` or Firestore content.
6. Ensure the component calls `onComplete` when auto-checked challenges should complete.

Curriculum visuals are separate from simulations. They are registered in `src/features/curriculum/visuals/VisualRegistry.tsx`.

## State and Persistence

The app is local-first:

- Zustand persist stores progress in local storage under `airframe_progress_v3`.
- Persisted lesson state is merged onto the current static `INITIAL_LESSONS` so new content can appear without wiping user progress.
- Reflections use local storage under `airframe_reflections_v1`.
- Firebase Auth/Firestore provide Google sign-in and cloud progress sync.
- Express/JWT/lowdb remain available as a local/legacy fallback API path.

Admin CMS access is currently gated by `tinurajan1@gmail.com` or email addresses ending in `@arista.com`.

## Firebase

Firebase config is loaded from `firebase-applet-config.json`.

Firestore is used for:

- User progress
- Feedback
- Lesson overrides
- Glossary overrides

See `docs/FIREBASE_SETUP.md` for setup details.

## Deploy To Google Cloud Run

The repo includes:

- `Dockerfile`: multi-stage Node 22 build/runtime image
- `.dockerignore`: excludes local dependencies, generated output, graph data, and secrets
- `cloudbuild.yaml`: builds the image, pushes it to Artifact Registry, and deploys Cloud Run

Runtime expectations:

- Cloud Run gets `JWT_SECRET` from Secret Manager. The Cloud Build pipeline creates `airframe-jwt-secret` with a generated value if the secret does not already exist.
- `PORT` is set to `8080` in the container and overridden automatically by Cloud Run when needed.
- `AIRFRAME_DB_PATH` defaults to `/tmp/airframe/database.json` in the container. This lowdb path is ephemeral; use Firestore for durable cloud progress.

One-time GCP setup:

```bash
gcloud config set project YOUR_PROJECT_ID
gcloud services enable cloudbuild.googleapis.com run.googleapis.com artifactregistry.googleapis.com secretmanager.googleapis.com
```

Submit a manual Cloud Build from the repo root:

```bash
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_REGION=us-central1,_SERVICE=airframe,_AR_REPO=airframe,_JWT_SECRET_NAME=airframe-jwt-secret
```

For GitHub-triggered deploys, connect the GitHub repository to Cloud Build and use `cloudbuild.yaml` as the build config. The pipeline creates the Artifact Registry Docker repository if it does not already exist.

If you want to provide your own JWT secret instead of the generated first-run value:

```bash
printf '%s' 'replace-with-a-strong-secret' | gcloud secrets versions add airframe-jwt-secret --data-file=-
```

## Code Review Graph

This project uses `code-review-graph` for low-token codebase exploration.

Check graph status:

```bash
code-review-graph status
```

Build or rebuild the graph:

```bash
code-review-graph build --repo /Users/theorajan/local\ builds/airframe
```

Incrementally update after source changes:

```bash
code-review-graph update --repo /Users/theorajan/local\ builds/airframe
```

`.code-review-graph/` is intentionally gitignored. Future clones or copied workspaces may need a local rebuild.

## Assistant and Repo Context

For future Codex or agent work:

- `AGENTS.md`: authoritative Codex operating guide
- `CODEX.md`: short Codex handoff and task-routing guide
- `CONTEXT.md`: compact repo map
- `MEMORY.md`: durable decisions, caveats, and follow-ups
- `CLAUDE.md`, `GEMINI.md`, `QODER.md`: assistant-specific graph/context notes

Start with the graph and these context files before broad source reads.

## Design System

The Design System mode documents product strategy, pedagogy, interface patterns, mascot reference, typography, and visual systems. Entry points:

- `src/app/DesignSystem.tsx`
- `src/features/design-system/useDesignSystemRoutes.tsx`
- `src/features/design-system/*`

## Resetting Local Data

In the app, use **Academy > Settings > Reset Data**.

For manual browser cleanup, clear these local storage keys:

- `airframe_progress_v3`
- `airframe_reflections_v1`

## Known Gaps

- There is no test script yet.
- Some docs under `docs/` still describe earlier architecture names or older implementation details. Verify against source before changing behavior.
- Some code-review-graph hotspot tools may fail with a path-resolution error; `get_architecture_overview` works.

---

Internal use: Arista Networks SE enablement.
