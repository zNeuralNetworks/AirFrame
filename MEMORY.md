# Airframe Memory

## Durable Decisions

- `AGENTS.md` is the authoritative Codex repo instruction file; `CODEX.md` is a short handoff, not a replacement.
- Treat static TypeScript content under `src/content` as the baseline source of truth; Firestore can override lessons and glossary terms at runtime.
- Preserve the local-first progress model in `src/state/userStore.ts`: persisted completion/lock state is merged onto current static lessons.
- Keep future UI work aligned with the existing Apple-inspired, light, minimal visual language in `src/index.css` and `src/shared/ui`.
- For Arista/networking content, prioritize platform-accurate wording and realistic enterprise wireless/campus examples.
- Prefer feature-based placement under `src/features` and reusable primitives under `src/shared/ui`.
- Use `npm run lint` for type checking. Do not assume a test runner exists until one is added to `package.json`.
- Firebase Auth and Firestore are the only backend. Do not reintroduce `/api/*`, JWT auth, Express, or lowdb.
- Cloud Run deployment uses `Dockerfile`, `nginx.conf`, and `cloudbuild.yaml` to serve the static Vite build on port 8080.
- `npm run build` runs Vite and copies root-level `corgimascot-*.png` files into `dist/`.

## Current Repo Facts

- App shell has four modes: landing, launcher, academy, and design system.
- The standalone Quick Demo app mode was removed; demo tools remain available inside the academy/design-system areas where routed.
- Admin CMS gate is hardcoded to `tinurajan1@gmail.com` and `@arista.com`.
- Firebase config is loaded from `firebase-applet-config.json`.
- `npm run dev` runs Vite directly on port 3000.
- README and docs contain some older structure references; current source already uses `src/app`, `src/features`, `src/shared`, `src/content`, `src/state`, and `src/services`.
- The local code-review graph was rebuilt on 2026-04-21. `.code-review-graph/` is gitignored, so future clones/sessions may need a local rebuild.

## Avoid Re-Reading Unless Needed

- `README.md` is partially stale but useful for product framing.
- `docs/TECHNICAL_DESIGN.md` and `docs/INFORMATION_ARCHITECTURE.md` are useful for intent, but verify implementation details against source.
- `CLAUDE.md` and `CONTEXT.md` now contain the compact repo map for future agents.

## Open Follow-Ups

- Add a real test script and targeted coverage for simulation math/state if requested.
- Clean up stale docs that still mention older paths, React 18, or the wrong simulation registry.
- Consider extracting auth/admin policy from `AcademyApp` and `userStore` if authorization grows beyond the current email-domain gate.
