# Technical Design: Airframe

This document provides a comprehensive technical blueprint of the Airframe platform, detailing its architecture, data models, state management, and core engineering patterns.

## 1. System Architecture

Airframe is designed as a modular, resilient "Reasoning Environment" for wireless engineering education.

### 1.1 Layered Overview
-   **View Layer (React & Tailwind)**: Responsible for high-fidelity UI rendering. It uses a "Glassmorphism" design system and Framer Motion for hardware-accelerated animations.
-   **Integration Layer (Firebase)**: Provides robust middleware for authentication (Google Identity) and cloud persistence (Firestore).
-   **Business Logic Layer (Zustand & Content Controllers)**: Handles curriculum navigation, user progress calculation, and simulation state.
-   **Data Storage Layer (Zustand Persist & Cloud Firestore)**: A dual-mode storage system ensuring instant responsiveness (LocalStorage) and long-term durability (Cloud).

---

## 2. State & Persistence Engine

State management is the backbone of the "Learning Journey" in Airframe.

### 2.1 Zustand Store Architecture (`/src/state/userStore.ts`)
The `userStore` manages four primary state domains:
1.  **Identity State**: `currentUser` (Firebase), `isAuthReady`.
2.  **Curriculum State**: `lessons` (with `completed`, `locked`, `simCompleted` status).
3.  **Progress State**: `user` object containing `totalXp`, `level`, `achievements`, and `quizHistory`.
4.  **UI State**: `isLoading`.

### 2.2 Dual-Sync Synchronization Strategy
Airframe uses a "Local-First, Sync-Follows" pattern:
-   **Persistence**: The `persist` middleware caches progress in LocalStorage.
-   **Hydration/Merging**: On mount, the store merges hardcoded static curriculum (`INITIAL_LESSONS`) with persisted user progress (lesson IDs and completion flags). This ensures new content is instantly available without breaking existing progress.
-   **Firebase Sync**: A subscriber listens for auth changes. When a user is identified, a background job syncs local `UserProgress` to Firestore to enable cross-device portability.

---

## 3. The Curriculum Engine (Content-as-Code)

To ensure agility and developer-friendly content updates, the platform treats the curriculum as structured data.

### 3.1 Data Schema (`/src/types.ts`)
-   **Module**: Structural grouping with metadata (icon, color, tag).
-   **Lesson**: Content-heavy units containing Markdown (`content`), rewards (`xpReward`), and a pointer to a simulation (`simulationId`).
-   **SimulationType**: A strict union of all valid simulation identifiers to prevent invalid mapping.

### 3.2 Dynamic Routing
The app utilizes a "Screen State" instead of complex nested URL routing for most interactions. This allows for seamless, animated transitions between **Hub**, **Dashboard**, **Lesson**, and **Profile** views within a single focus context.

---

## 4. Simulation & Lab Architecture

Simulations are isolated, interactive environments that bridge theory and practice.

### 4.1 Lab Registry & Lazy Loading
Simulations are managed via the `VisualRegistry.ts` (located in `/src/features/curriculum/visuals/`).
-   **Pattern**: All simulations are lazily loaded to minimize the critical path bundle.
-   **Mapping**: The `VisualRegistry` maps the `simulationId` from a lesson to its corresponding React component.

### 4.2 Lab Specifications (`/src/content/labs.ts`)
Each simulation is accompanied by a `LabSpec`:
-   **Challenges**: A list of tasks for the user.
-   **Auto-Check Mechanism**: Challenges can be marked as `isAuto: true`. These are automatically marked as complete when the simulation calls its `onComplete` trigger, validating specific performance metrics (e.g., reaching a dB threshold).

---

## 5. Security & Identity Logic

### 5.1 Authentication Patterns
-   **Provider**: Google Auth (`signInWithPopup`).
-   **Lifecycle**: Handled via `onAuthStateChanged` in the `userStore`.
-   **Authorization**: Firestore Security Rules (defined in `firestore.rules`) enforce that users can only read/write their own records in the `users/{uid}` collection.

### 5.2 Validation & Data Integrity
The `handleFirestoreError` utility provides structured error payloads, enabling developers to debug security rule violations by inspecting the full context of a failed operation (including user info and target path).

---

## 6. Engineering Quality & performance

### 6.1 Performance Patterns
-   **Component Memoization**: Use of `React.memo` and `useMemo` in high-refresh simulations (e.g., Spectrum Analyzer) to maintain 60fps performance.
-   **Optimistic UI**: XP rewards and completion badges are updated in the local store immediately, with Firestore synchronization occurring as a non-blocking background task.
-   **Referrer Policy**: Enforced `referrerPolicy="no-referrer"` for all external assets to prevent cross-origin leaks and ensure asset loading in sandboxed environments.

### 6.2 Code Quality
-   **TypeScript Everywhere**: Strict typing for all domain models and state actions.
-   **Atomic UI Components**: Reusable, unstyled components (radix-based) for accessibility and Tailwind-styled shells for aesthetics.
