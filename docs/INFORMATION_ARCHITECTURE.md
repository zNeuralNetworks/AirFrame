# Information Architecture: Airframe

Airframe is a reasoning environment for wireless systems, designed as a comprehensive learning platform for Arista's wireless engineering curriculum.

## 1. App Ecosystem Overview

Airframe is built as a highly interactive SPA (Single Page Application) that prioritizes "Learning by Doing." It combines static curriculum content with real-time simulations.

### Core Stack
- **Framework**: React 18 (Vite)
- **State Management**: Zustand (with Persist middleware and Firebase synchronization)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (`motion/react`)
- **Backend/Identity**: Firebase Auth & Firestore

---

## 2. Navigation & User Journey

The application uses a custom screen-based navigation system managed via global state.

### Primary Flows:
1.  **Onboarding/Dashboard**: Users start at the **Hub**, a high-level view of all learning modules.
2.  **Module Exploration**: Clicking a module transitions to the **Module Detail** view, listing lessons within that category.
3.  **The Learning Loop**:
    - **Lesson View**: Consumption of technical content (Markdown-based).
    - **Lab Manager**: Switch from theory to practice. An interactive split-view featuring:
        - **Lab Guide** (Left): Objectives and manually/automatically trackable challenges.
        - **Simulation Viewport** (Right): The actual interactive lab component.
    - **Quiz Refresher**: Post-lab assessment to verify knowledge retention.
4.  **Profile & Achievements**: Users track their XP, levels, and earned badges via the **Profile** screen.

---

## 3. Data Architecture

The app represents a "Content-as-Code" architecture where the curriculum is defined in strongly-typed TypeScript files.

### Domain Models (`/src/types.ts`)
- **Module**: High-level groupings (e.g., "The Physics of Invisible Light").
- **Lesson**: Individual units of study containing Markdown content, XP rewards, and links to simulations.
- **LabSpec**: Specific metadata for a simulation, including objectives and challenges.
- **UserProgress**: Tracks XP, levels, quiz history, and achievements.

### Global State (`/src/state/userStore.ts`)
The `userStore` acts as the single source of truth for:
- **Curriculum State**: Which lessons are completed or locked.
- **User Identity**: Current Firebase user and profile data.
- **Synchronization**: Two-way sync between local storage (for offline/instant updates) and Cloud Firestore (for cross-device persistence).

---

## 4. Component Hierarchy

The UI is built with atomic design principles, prioritizing "Glassmorphism" and "Arista Brand" aesthetics.

### Key Layout Components
- `AcademyApp.tsx`: The root application shell and screen router.
- `AppSidebar.tsx`: Persistent navigation and user stats.
- `LessonView.tsx`: Orchestrates the transition between Content, Lab, and Quiz.

### Features
- **Curriculum**: `ModuleGrid`, `LessonCard`, `LabManager`.
- **Design System**: Reusable flourishes like `BentoGrid`, `GlassCard`, and `ProgressCircle`.
- **Simulations**: A pluggable registry of interactive components (e.g., `SpectrumAnalyzer`, `PoeBudgetSim`).

---

## 5. Simulation Architecture

Simulations are modular React components that communicate back to the `LabManager` via an `onComplete` trigger.

### Registration System
Simulations are lazily loaded via the `SimulationRegistry.ts`. This reduces the initial bundle size and allows for a scalable "pluggable" lab environment.

### The "Auto-Check" Invariant
Challenges in `labs.ts` can be marked as `isAuto: true`. These are automatically resolved when the simulation calls its `onComplete` hook, ensuring a low-friction "Mission Accomplished" experience.

---

## 6. Directory Structure

- `/src/app`: Root application logic.
- `/src/components`: Generic UI components (Layout, Sidebar).
- `/src/content`: The "Database" of lessons, modules, and labs.
- `/src/features`: Domain-specific features (Simulations, Curriculum, Profile).
- `/src/lib`: External integrations (Firebase, Utils).
- `/src/state`: Zustand stores.
- `/docs`: Project documentation and architecture plans.
