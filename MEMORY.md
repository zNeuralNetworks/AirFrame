# Airframe Memory

## Durable Decisions

- `AGENTS.md` is the authoritative Codex repo instruction file; `CODEX.md` is a short handoff, not a replacement.
- Treat static TypeScript content under `src/content` as the baseline source of truth; Firestore can override lessons and glossary terms at runtime.
- Preserve the local-first progress model in `src/state/userStore.ts`: persisted completion/lock state is merged onto current static lessons.
- Keep future UI work aligned with the existing Apple-inspired, light, minimal visual language in `src/index.css` and `src/shared/ui`.
- For Arista/networking content, prioritize platform-accurate wording and realistic enterprise wireless/campus examples.
- Prefer feature-based placement under `src/features` and reusable primitives under `src/shared/ui`.
- Use `npm run lint` for type checking. Do not assume a test runner exists until one is added to `package.json`.
- Cloud Run deployment uses `Dockerfile` and `cloudbuild.yaml`. Production requires `JWT_SECRET`; the Cloud Build config creates a Secret Manager secret named `airframe-jwt-secret` on first deploy unless `_JWT_SECRET_NAME` is overridden.
- The lowdb fallback path is controlled by `AIRFRAME_DB_PATH`; Cloud Run uses `/tmp/airframe/database.json`, which is ephemeral. Firestore remains the durable cloud persistence path.
- `npm run build` runs Vite, copies root-level `corgimascot-*.png` files into `dist/`, and bundles `server.ts` into `dist-server/server.js` for production.

## Current Repo Facts

- App shell has five modes: landing, launcher, academy, design system, and demo.
- Demo mode filters lessons to `1.1`, `1.3`, `5.1`, and `1.assessment`.
- Admin CMS gate is hardcoded to `tinurajan1@gmail.com` and `@arista.com`.
- Firebase config is loaded from `firebase-applet-config.json`.
- `server.ts` listens on port 3000 and runs Vite middleware in non-production.
- `vite.config.ts` also declares port 3000; use `npm run dev` for the integrated server path.
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
