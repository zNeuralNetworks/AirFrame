# Simulation Development Guide

Interactive simulations are the heart of Airframe. This guide explains how to build, register, and link a new simulation to a curriculum lesson.

## 1. Simulation Architecture Overview

A simulation in Airframe is a self-contained React component. It lives in the `LabManager`'s "Simulation Viewport" and communicates status back to the parent via an `onComplete` callback.

### The Lifecycle
1.  **Selection**: User clicks "Start Lab" in a lesson.
2.  **Lookup**: `LabManager` looks up the `simulationId` in the `VisualRegistry`.
3.  **Loading**: The component is lazily loaded and rendered.
4.  **Interaction**: User tinkers with the simulation.
5.  **Completion**: When success criteria are met, the simulation executes `onComplete()`.
6.  **Progress**: The `LabManager` marks all `isAuto: true` challenges as complete and enables the "Complete Lab" button.

---

## 2. Step-by-Step: Creating a New Simulation

### Step 1: Create the Component
Create a new file in `src/features/curriculum/visuals/`.

```tsx
// src/features/curriculum/visuals/SignalFlowSim.tsx
import React, { useState } from 'react';

interface SignalFlowSimProps {
  onComplete?: () => void;
}

const SignalFlowSim: React.FC<SignalFlowSimProps> = ({ onComplete }) => {
  const [locked, setLocked] = useState(true);

  const handleBypass = () => {
    setLocked(false);
    if (onComplete) onComplete(); // Trigger lab completion logic
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-bold mb-4">Signal Flow Bypass</h3>
      {/* Simulation Logic Here */}
      <button 
        onClick={handleBypass}
        className="px-6 py-2 bg-brand-600 text-white rounded-lg"
      >
        Bypass Attenuator
      </button>
    </div>
  );
};

export default SignalFlowSim;
```

### Step 2: Register the Visual
Add your component to the `VisualRegistry.tsx`. This maps the internal ID to the component.

```tsx
// src/features/curriculum/visuals/VisualRegistry.tsx
import SignalFlowSim from './SignalFlowSim';

const VisualRegistry: Record<string, React.FC<any>> = {
  // ... existing visuals
  'signal-flow-sim': SignalFlowSim, 
};
```

### Step 3: Define the Lab Specification
Provide metadata and challenges for your lab in `src/content/labs.ts`.

```typescript
// src/content/labs.ts
'signal-flow-sim': {
  id: 'signal-flow-sim',
  title: 'Bypass Analysis',
  objective: 'Understand how bypass circuitry impacts signal integrity.',
  baseline: 'Transmitter is isolated.',
  challenges: [
    { id: 'c1', text: 'Locate the attenuator.', isAuto: false }, // Manual check
    { id: 'c2', text: 'Engage the bypass switch.', isAuto: true }  // Checked via onComplete
  ],
  observation: 'Notice the 10dB gain spike when bypassed.'
}
```

### Step 4: Link to a Lesson
Update a lesson in `src/content/lessons.ts` to use your new simulation. Ensure you add your simulation ID to the `SimulationType` union in `src/types.ts` first.

```typescript
// src/content/lessons.ts
{
  id: 'X.Y',
  title: 'X.Y Signal Bypassing',
  // ...
  simulationId: 'signal-flow-sim',
  // ...
}
```

---

## 3. Best Practices

### Animation Performance
Use `motion` (Framer Motion) for UI transitions. For complex physics (e.g., thousands of packets), use `canvas` or `requestAnimationFrame` to avoid React reconciliation overhead.

### State Reset
The `LabManager` provides a "Reset to Baseline" button. Ensure your simulation component handles being "re-mounted" cleanly if the user resets the lab.

### Auto-Check Logic
Avoid complex challenge detection inside the simulation if possible. The `onComplete` trigger is a "global success" signal. It is best used for "Mission Accomplished" moments that satisfy the primary goal of the lab.

### Responsive Design
Simulations are rendered in a flexible container. Use relative units (`%`, `vw/vh`) or `flex/grid` to ensure the lab is functional on different screen sizes.
