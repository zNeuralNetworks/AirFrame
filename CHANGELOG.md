# Changelog

## 2026-04-21

- Added Cloud Run deployment support with `Dockerfile`, `.dockerignore`, and `cloudbuild.yaml`.
- Updated Cloud Build to create `airframe-jwt-secret` automatically on first deploy and grant the Cloud Run runtime service account secret access.
- Made `JWT_SECRET` mandatory in production while preserving the local dev fallback.
- Added `AIRFRAME_DB_PATH` so the lowdb fallback can write to `/tmp` in Cloud Run.
- Updated `npm run build` to copy root-level mascot PNG assets into `dist/` for production serving.
- Fixed Codex Playwright MCP configuration by setting a writable output directory and user-data directory in `/Users/theorajan/.codex/config.toml`.
- Added local Playwright as a dev dependency plus `npm run screenshot:constellation` for reliable repo-level visual verification independent of MCP.
- Fixed the Knowledge Constellation view by keying galaxy positions by module number instead of brittle category strings, rendering all 12 modules and keeping right-edge labels inside the constellation panel.
- Added `tsconfig.json` include/exclude boundaries so `tsc --noEmit` ignores generated `dist` output.
- Added a friendly `EADDRINUSE` startup path with `PORT` override support, so duplicate dev server launches explain how to stop or move off port `3000` instead of throwing an unhandled Node stack trace.
- Fixed Vite middleware HMR startup by binding HMR to the same HTTP server as Express, removing the separate port `24678` listener and avoiding duplicate-dev-server WebSocket collisions.
- Ran `npm i` and resolved dependency issues by upgrading `@tailwindcss/vite`/`tailwindcss` to `^4.2.4`, `vite` to `^8.0.9`, and `zustand` to `^5.0.12`; audit now reports 0 vulnerabilities and React 19 peer checks are clean.
- Rewrote `README.md` to reflect the current React 19/Vite/Express/Firebase architecture, port 3000 dev path, graph workflow, repo context files, and current no-test-script state.
- Expanded `AGENTS.md` into the authoritative Codex operating guide for Airframe.
- Added `CODEX.md` as a short Codex handoff with read order, routing hints, graph commands, and verification defaults.
- Updated `MEMORY.md` with Codex file ownership and graph freshness notes.
- Added compact repo orientation in `CLAUDE.md` while preserving graph-first instructions.
- Added `CONTEXT.md` as a low-token entry point for future work.
- Added `MEMORY.md` with durable implementation facts, decisions, caveats, and follow-ups.
- Documented current stack, key flows, commands, high-risk files, simulation extension checklist, and known documentation drift.

No application runtime code was changed.
