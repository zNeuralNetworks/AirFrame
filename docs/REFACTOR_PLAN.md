# Airframe Codebase Refactor Plan (Completed)

This document outlines the architectural improvements and code cleanup performed for the Airframe application.

## 1. App Container Consolidation [DONE]
- Merged `Airframe.tsx` and `WaveRunner.tsx` into a single `AcademyApp.tsx`.
- Consolidated app logic and removed redundant files.

## 2. Layout Component Decomposition [DONE]
- Split monolithic `Layout.tsx` into modular components in `src/shared/ui/layout/`:
    - `Sidebar.tsx`, `SearchBar.tsx`, `FeedbackModal.tsx`, `MobileBottomNav.tsx`, `MobileTopBar.tsx`, `ThemeToggle.tsx`.

## 3. Simulation Registry & Lazy Loading [DONE]
- Implemented `SimulationLoader` and `SimulationErrorBoundary` for robust lab initialization.
- Centralized simulation rendering logic.

## 4. State Management Consistency [DONE]
- Consolidated manual `localStorage` logic into reactive Zustand `useUserStore`.
- Integrated reflections/engineer logs into the global state.

## 5. UI Component Standardization [DONE]
- Audited and standardized UI components to use Tailwind 4 variables.
- Improved component granularity and single-responsibility adherence.

## 6. Type System Organization [DONE]
- Types are currently stable in `src/types.ts`.

## 7. Data & Content Audit [DONE]
- Consolidated all static content from `src/data/` into `src/content/`.
- Updated all import paths across the application.

## 8. CSS & Theming [DONE]
- Theme variables are managed via `ThemeContext` and Tailwind 4 `@theme`.

## 9. Performance Optimization [DONE]
- Implemented lazy loading for all simulations.
- Optimized search and filtering with `useMemo`.

---
*Refactor completed on 2026-04-15*
