# Product Design: Airframe

Airframe is a high-fidelity learning environment designed to transform how wireless engineers internalize complex system behaviors.

## 1. Product Vision

**"Understanding by Design, not Intuition by Accident."**

Airframe moves beyond traditional "slides and lectures" EdTech. It is a **Reasoning Environment** where theory is immediately followed by hands-on experimentation. The goal is to build a "mental model" of invisible wireless phenomena (RF, Packet flows, Roaming thresholds) into a tangible, observable reality.

---

## 2. Target Audience & Personas

### 2.1 The Field Engineer (The Practitioner)
- **Goal**: Needs to troubleshoot complex client-side roaming issues in high-density environments.
- **Pain Point**: Wireless is "invisible"; they can't see why a client is sticky.
- **Value**: Use the **Roam Lab** to visualize signal thresholds and drive decision logic.

### 2.2 The Sales Engineer (The Advisor)
- **Goal**: Demonstrating the technical superiority of Arista's distributed control plane.
- **Pain Point**: Explaining "distributed vs centralized" is abstract and dry.
- **Value**: Use the **Distributed Sim** to show live WAN failure resilience in a visually compelling way.

---

## 3. Core Product Pillars

### 3.1 The Learning Loop
The product experience is built on a tight feedback loop:
1.  **Consume (Theory)**: Short, punchy Markdown lessons.
2.  **Experiment (Lab)**: Immediate transition to a simulation.
3.  **Verify (Quiz)**: Quick assessment to solidify the concept.
4.  **Reflect (Log)**: Capturing the "Aha!" moment in the Engineer's Log.

### 3.2 Information Density
Unlike consumer apps, Airframe respects the professional's time. We prioritize **Data Density** over excessive whitespace. A single screen should provide enough context to understand a relationship between multiple variables (e.g., RSSI vs. Throughput vs. Retry rates).

### 3.3 Pluggable Simulations
The platform is a "Simulation OS." Every concept has a dedicated interactive component (Wave Matching, Spectrum Analysis, PoE Budgeting) that shares a common UI framework (The Lab Manager).

---

## 4. Visual Language & Brand Identity

### 4.1 Aesthetic: "Engineering Glassmorphism"
- **Surface**: Translucent, blurred cards that suggest depth and high-tech precision.
- **Color Palette**: 
    - **Primary**: Arista Deep Blue & Slate (Trust, Stability).
    - **Accent**: Brand Indigo & Teal (Focus, Innovation).
    - **Success/Warning**: High-contrast Emerald and Amber for state updates.

### 4.2 Typography: The Dual-Font System
- **Inter (Sans)**: For narration, UI labels, and instruction flow. It provides warmth and legibility.
- **Fira Code (Mono)**: For technical data (MAC addresses, IP configs, Metrics). This signals a "Technical Context" to the user and ensures tabular alignment.

---

## 5. UX & Interaction Patterns

### 5.1 The "Mission-First" Dashboard
The dashboard isn't just a list; it’s a progress engine. It highlights the "Next Step," recent achievements, and XP trajectory to encourage daily engagement.

### 5.2 Lab Layout Consistency
The Lab Manager uses a split-pane layout:
- **Left Panel (The Guide)**: Constant reference for objectives and challenges.
- **Right Panel (The Canvas)**: The interactive simulator.
This ensures the student never gets "lost" in the simulation; their goals are always visible.

### 5.3 Gamification with Purpose
XP and Levels are used not as hollow rewards, but as markers of "System Mastery."
- **XP**: Earned for lesson completion and perfect quiz scores.
- **Badges**: Awarded for qualitative milestones (e.g. "Module Master").

---

## 6. Future Roadmap (Product Design)

- **Collaborative Labs**: Shared canvases where two engineers can troubleshoot a joint environment.
- **AI Tutors**: Integrating Gemini to provide real-time hints based on the current state of a simulation.
- **Mobile Companion**: A "flashcard" mode for the Databank to allow learning on-the-go.
