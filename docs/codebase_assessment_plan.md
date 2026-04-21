# Airframe Labs - Codebase Assessment & Refactoring Plan

## 1. Executive Summary
This document outlines a comprehensive plan to refine the Airframe Labs codebase. While functional and content-complete, the application has evolved rapidly, leading to some structural redundancies and large component files. This plan focuses on **Clarity, Redundancy Reduction, and Maintainability** to ensure the project remains scalable for future pedagogical expansions.

---

## 2. Core Assessment

### 2.1 Component Architecture
*   **Large Component Files:** `LessonView.tsx` exceeded 700 lines. It contains briefing logic, simulation loading, and quiz handling.
*   **Icon Registry Fragmentation:** Multiple files maintain their own `Icons` records to map strings to Lucide components.
*   **Shared UI:** Proliferation of "Mascot" components (`CorgiMascot.tsx`, `AirframeMascot.tsx`) should be consolidated into a single highly-configurable component.

### 2.2 Data Management & Redundancy
*   **Curriculum Synchronization:** Current data structures for the "Live App" (`lessons.ts`) and "Design System Roadmap" (`curriculum.ts`) overlap. There is an opportunity to unify the underlying models.
*   **Content Merging:** `contentService.ts` and `userStore.ts` contain manual "merge" logic (Firestore vs Static). This could be abstracted into a cleaner utility pattern.
*   **State Bloat:** `userStore.ts` handles auth, progress, content loading, and achievements.

### 2.3 Visual & Design Consistency
*   **Padding/Spacing Logic:** While recently optimized, some spacing values are hardcoded in components instead of using a unified design tokens file or theme configuration.
*   **Responsive Complexity:** Mobile navigation and Desktop sidebars use separate logic paths that could be unified under a shared hook or layout context.

---

## 3. Implementation Plan

### Phase 1: Structural De-duplication (Cleanliness)
1.  **Unify Mascot Identity:** [x]
    *   Merge `CorgiMascot.tsx` and `AirframeMascot.tsx` into a single `Mascot.tsx` component.
    *   Use the `MASCOT_WARDROBE` and `MASCOT_EXPRESSIONS` from the design system to drive the props.
2.  **Centralize Icon Management:** [x]
    *   Create `src/shared/ui/IconRegistry.tsx` to host the global string-to-component mapping.
    *   Replace local `Icons` records in `CurriculumLegacy`, `CurriculumRedesign`, and `EdTechGallery`.

### Phase 2: Component Refactoring (Maintainability) [x]
1.  **Decompose `LessonView.tsx`:** [x]
    *   Extract `BriefingView.tsx`: Handle markdown rendering and rich text patterns. [x]
    *   Extract `LabManager.tsx`: Handle simulation lifecycle and challenge tracking. [x]
    *   Extract `QuizEngine.tsx`: Isolate question progression and score calculation. [x]
2.  **Refactor `DesignSystem.tsx` Navigation:** [x]
    *   Move the `navItems` and `renderContent` logic into a custom hook `useDesignSystemRoutes` to clean up the entry point. [x]

### Phase 3: Data Model Consolidation (Non-Redundancy) [x]
1.  **Unified Curriculum Interface:** [x]
    *   Refactored `src/types.ts` to create a base `Module` and `Lesson` type that serves both the live curriculum and the roadmap views.
    *   Created `src/content/modules.ts` as the single source for all curriculum tiers.
2.  **Abstract Data Fetching:** [x]
    *   Created a `useContent` hook that encapsulates the logic found in `contentService.ts`, reducing the code footprint in `userStore.ts`.

### Phase 4: Polish & Performance [x]
1.  **Lazy Loading:** [x]
    *   Implemented `React.lazy` for simulation modules and `LessonView` sub-components to reduce initial load times.
2.  **Error Boundary Refinement:** [x]
    *   Implemented granular error boundaries with telemetry tracking around the simulation viewport.

---

## 4. Final Verification
*   **Linting:** Run `npm run lint` to ensure no unused imports or type leaks.
*   **Visual Regression:** Check that the spacing refinements in `LessonBriefing` remain intact after component extraction.
*   **State Integrity:** Verify that persistence (Zustand + LocalStorage) continues to bridge correctly after the store refactor.
