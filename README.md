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
- Firebase Auth and Firestore as the only backend
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

`npm run dev` runs Vite directly on port `3000`.

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

This creates the production `dist/` bundle and copies root-level mascot PNG assets into `dist/`.

### Preview

```bash
npm run preview
```

### Tests

```bash
npm run lint
npm run build
npm test
npm run test:unit
npm run test:components
npm run test:e2e
```

The E2E suite starts Vite with `VITE_AIRFRAME_E2E_AUTH=1` through `playwright.config.ts`. That mode injects a deterministic approved learner account so tests can exercise the authenticated Academy flow without live Firebase credentials.

### Browser Screenshot Check

With `npm run dev` already running:

```bash
npm run screenshot:constellation
```

This captures the Airframe Labs Knowledge Constellation to `output/playwright/airframe-constellation.png`.

## Product Modes

The top-level app has four modes:

- Landing page
- Launcher
- Airframe Academy
- Design System

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
│   ├── services/             # Content, Gemini, telemetry services
│   ├── shared/ui/            # Layout, navigation, mascot, UI utilities
│   ├── state/                # Zustand user/progress store
│   └── types.ts              # Core domain types
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

`src/state/userStore.ts` is the main state boundary for lessons, glossary, auth state, user progress, achievements, reflections, and Firebase sync.

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
- Firebase Auth provides Google and email/password sign-in.
- Firestore stores user progress, feedback, lesson overrides, and glossary overrides.

Admin CMS access is currently gated by `tinurajan1@gmail.com` or email addresses ending in `@arista.com`.

## Firebase

Firebase config is loaded from `firebase-applet-config.json`.

Firestore is used for:

- User progress
- Feedback
- Lesson overrides
- Glossary overrides

See `docs/FIREBASE_SETUP.md` for setup details.

### Firebase Auth Deploy Validation

Production sign-in depends on Firebase Auth domain alignment:

1. Set `VITE_FIREBASE_AUTH_DOMAIN` to the public app domain when deploying behind Cloud Run, a custom domain, or another hosted origin. For local development, the bundled Firebase config can be used.
2. In Firebase Console, open Authentication -> Settings -> Authorized domains and add every domain that serves Airframe, including the Cloud Run default domain and any custom domain.
3. After deploy, validate email/password sign-in, Google popup sign-in, sign-out, reload persistence, and progress sync from the deployed URL.
4. If Google sign-in reports an unauthorized domain, confirm the browser hostname exactly matches an authorized Firebase domain and the deployed bundle was built with the intended `VITE_FIREBASE_AUTH_DOMAIN`.

## Deploy To Google Cloud Run

The repo includes:

- `Dockerfile`: multi-stage Node 22 build/runtime image
- `.dockerignore`: excludes local dependencies, generated output, graph data, and secrets
- `cloudbuild.yaml`: builds the image, pushes it to Artifact Registry, and deploys Cloud Run
- Production is served by an unprivileged Nginx container that listens on port `8080`.

Runtime expectations:

- Cloud Run serves the static Vite build.
- Firebase Auth and Firestore are the only backend dependencies.

One-time GCP setup:

```bash
gcloud config set project YOUR_PROJECT_ID
gcloud services enable cloudbuild.googleapis.com run.googleapis.com artifactregistry.googleapis.com
```

Submit a manual Cloud Build from the repo root:

```bash
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_REGION=us-central1,_SERVICE=airframe,_AR_REPO=airframe
```

For GitHub-triggered deploys, connect the GitHub repository to Cloud Build and use `cloudbuild.yaml` as the build config. The pipeline creates the Artifact Registry Docker repository if it does not already exist.

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
