
export const LAYOUT_SYSTEMS = [
  {
    id: 'bento',
    title: 'The Modern Bento',
    usage: 'Dashboards',
    description: 'A modular, high-density grid system that aggregates disparate technical metrics into a cohesive visual unit.'
  },
  {
    id: 'split',
    title: 'Focus Split',
    usage: 'Simulations',
    description: 'Separating pedagogical briefing from active experimentation using a vertical 35/65 split to minimize eye movement.'
  },
  {
    id: 'z-pattern',
    title: 'Z-Pattern Scannability',
    usage: 'Landing Pages',
    description: 'Leveraging natural eye movement patterns to ensure core value propositions are captured in the first 2 seconds.'
  }
];

export const COLOR_SYSTEMS = [
  {
    id: 'rule-60-30-10',
    title: 'The 60-30-10 Rule',
    subtitle: 'Chromatic Balance',
    description: 'A mathematical approach to color distribution: 60% neutral background, 30% brand secondary, and 10% high-contrast accent.'
  },
  {
    id: 'semantic',
    title: 'Semantic Feedback',
    subtitle: 'Functional Color',
    description: 'Using color as a communication tool. Success (Green), Warning (Amber), and Failure (Red) mapped to real-time RF states.'
  },
  {
    id: 'elevation',
    title: 'Elevation & Shadow',
    subtitle: 'Depth System',
    description: 'Using subtle shadows and layered white-on-white surfaces to create visual hierarchy and suggest clickability.'
  }
];

export const SUGGESTED_PALETTES = [
  {
    name: 'Airframe Core',
    description: 'The standard Arista-inspired professional palette.',
    c60: { name: 'Slate Gray', hex: '#64748b', class: 'bg-slate-50' },
    c30: { name: 'Brand Indigo', hex: '#6366f1', class: 'bg-brand-500' },
    c10: { name: 'Alert Orange', hex: '#f97316', class: 'bg-orange-500' }
  },
  {
    name: 'Midnight Lab',
    description: 'For low-light technical environments.',
    c60: { name: 'Deep Navy', hex: '#0f172a', class: 'bg-slate-900' },
    c30: { name: 'Cyan Glow', hex: '#06b6d4', class: 'bg-cyan-500' },
    c10: { name: 'Pulse Magenta', hex: '#d946ef', class: 'bg-fuchsia-500' }
  },
  {
    name: 'Paper & Ink',
    description: 'High-contrast editorial approach.',
    c60: { name: 'Warm White', hex: '#fafaf9', class: 'bg-stone-50' },
    c30: { name: 'Coal Black', hex: '#1c1917', class: 'bg-stone-900' },
    c10: { name: 'Highlight Teal', hex: '#14b8a6', class: 'bg-teal-500' }
  }
];

export const METAPHORS = [
  {
    id: 'cosmic',
    title: 'The Cosmic Ocean',
    theme: 'Dark / Ethereal',
    status: 'Proposed',
    description: 'Wi-Fi waves as invisible light in a vast, dark spectrum. Professional but perhaps too disconnected from the hardware.'
  },
  {
    id: 'blueprint',
    title: 'The Blueprint',
    theme: 'Technical / Architectural',
    status: 'Selected',
    description: 'Celebrating the engineering nature of Arista. Grids, blueprints, and clean schematics. Feels authentic to the user base.'
  },
  {
    id: 'arcade',
    title: 'The Arcade',
    theme: 'Retro / Playful',
    status: 'Alternate',
    description: 'Converting network troubleshooting into an 8-bit game. High engagement but potentially lowers perceived authority.'
  }
];
