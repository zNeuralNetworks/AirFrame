# VXLAN/EVPN Academy: Build Strategy & Prompt Sequence

This document outlines the blueprints and the precise sequence of prompts required to build a world-class, interactive learning platform for VXLAN/EVPN, mirroring the architecture and pedagogy of the Arista Wi-Fi Academy.

---

## 1. Required Documents at Outset

Before issuing the first prompt, ensure the following core concepts are defined. You can provide these to the AI as context files.

### A. Information Architecture (IA)
*   **The Curriculum Tree**: Define the 5-7 core modules (e.g., *Level 1: The Overlay/Underlay Concept*, *Level 2: BGP EVPN Control Plane*, *Level 3: Multi-Homing & ESI*, *Level 4: Integrated Routing & Bridging (IRB)*).
*   **Glossary & Cheatsheets**: A mapping of technical terms (VNI, VTEP, RT/RD, Type-2/Type-5 Routes) to be used in the "Databank."

### B. Product Design Doc (PDD)
*   **Aesthetic Goal**: Define the "vibe" (e.g., "Swiss-Technical," "Industrial-Brutalist," or "Modern-Arista"). Use the `frontend-design` skill for specific recipes.
*   **Core Loop**: User enters Dashboard -> Picks a Protocol Layer -> Engages with a Packet-Flow Simulation -> Validates via Quiz -> Earns a "BGP Peer" or "VTEP Master" Achievement.
*   **UX Pattern**: Desktop-first with a high-density sidebar, fluid transitions between theory and labs.

### C. Technical Design Doc (TDD)
*   **Stack**: React (Vite) + Tailwind CSS + Framer Motion (animations) + Zustand (state) + Express/lowdb (backend).
*   **Simulation Engine**: D3.js or SVG-based interactive models for packet forwarding visualizations.
*   **Auth Model**: JWT-based custom auth for progress persistence.

---

## 2. The Build Sequence (Prompt Steps)

### Phase 1: Identity & Shell
**Prompt 1**: 
> "Initialize a new React + Vite + Tailwind application named 'EVPN Academy'. Use the `frontend-design` [Swiss Modern] recipe. Create a dashboard-centric layout with a sidebar containing: Dashboard, Protocol Labs, VSync Databank, and Progress Scorecard. Set up the typography with 'Space Grotesk' for technical headings. Ensure a high-density, professional network-engineering aesthetic."

### Phase 2: Curriculum & Content Seeding
**Prompt 2**: 
> "Define the curriculum for VXLAN/EVPN. Create a `content/lessons.ts` file with 5 modules. Each module should have: Title, Category, XP Reward, a Markdown description, and an interactive 'Objective'. Include a glossary of 20 EVPN terms in `content/glossary.ts`. Seed initial lesson 1.1: 'The Case for VXLAN - Why VLANs aren't enough'."

### Phase 3: The Interactive Component Architecture
**Prompt 3**: 
> "Implement a 'SimulationView' component that renders based on a `SimulationType`. Create a specialized lab for 'VTEP Packet Flow'. Use Framer Motion to animate a packet moving from an Underlay IP network into a VXLAN Encap state. Include interactive buttons to 'Step Through' the BGP Route Type 2 advertisement process."

### Phase 4: Gamification & State
**Prompt 4**: 
> "Set up a Zustand `userStore` to track: total XP, completed lessons, and a 'Quiz History'. Implement a `recordQuizAttempt` action. Create a Quiz component that takes a lesson's quiz data and awards 'Protocol Badges' (e.g., 'Type 2 Master') for 100% scores. Ensure state is persisted to localStorage for now."

### Phase 5: The "Databank" Feature
**Prompt 5**: 
> "Create a 'Databank' feature. It should include a searchable Glossary and a 'Cheatsheet' section for BGP EVPN Communities and Route Targets. Use a 'high-density data' layout. Allow users to click a term in the glossary and see a 'Visual Highlight' of how that term fits into an EVPN topology."

### Phase 6: Full-Stack Persistence
**Prompt 6**: 
> "Convert the app to full-stack. Create an Express server with SQLite/lowdb. Implement JWT-based registration and login. Create endpoints to 'Save Progress' and 'Fetch Progress'. Update the frontend `userStore` to sync with the backend every time a lesson or quiz is completed."

---

## 3. Key Success Factors

1.  **Visual Consistency**: Always reference the "Swiss Modern" or "Technical Editorial" style in every prompt to prevent visual drift.
2.  **Pedagogical Order**: Ensure the labs get progressively harder (Introduction -> L2 VNI -> L3 VNI -> Multi-homing).
3.  **No Mock Infrastructure**: Use real JSON-based routing for the curriculum so the app feels "heavy" and authoritative.
