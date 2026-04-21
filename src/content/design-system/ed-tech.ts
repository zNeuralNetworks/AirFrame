
export const ED_TECH_SECTIONS = [
  {
    id: 'cognitive-load',
    title: 'Cognitive Load Optimization',
    description: 'Managing the amount of information the working memory can process at once.',
    patterns: [
      {
        id: 'signaling',
        title: 'Signaling Principle',
        icon: 'Eye',
        color: 'bg-rose-50 text-rose-600',
        appRef: 'LessonView',
        description: 'Highlighting key information (bolding, highlighting, circling) to reduce the searching process.'
      },
      {
        id: 'progressive-disclosure',
        title: 'Progressive Disclosure',
        icon: 'Layout',
        color: 'bg-slate-50 text-slate-800',
        appRef: 'AcademyApp',
        description: 'Showing only what is necessary at the current moment to prevent user overwhelm.'
      },
      {
        id: 'dual-coding',
        title: 'Dual Coding',
        icon: 'Layers',
        color: 'bg-teal-50 text-teal-600',
        appRef: 'Simulations',
        description: 'Using both visual and verbal information to reinforce learning.'
      }
    ]
  },
  {
    id: 'engagement',
    title: 'Engagement & Motivation',
    description: 'Intrinsic and extrinsic triggers to keep the learner moving.',
    patterns: [
      {
        id: 'gamification',
        title: 'Gamified Progress',
        icon: 'Trophy',
        color: 'bg-orange-50 text-orange-600',
        appRef: 'Dashboard',
        description: 'XP, streaks, and levels to provide constant extrinsic feedback.'
      },
      {
        id: 'flow-state',
        title: 'Flow State Management',
        icon: 'Activity',
        color: 'bg-fuchsia-50 text-fuchsia-600',
        appRef: 'Challenges',
        description: 'Balancing task difficulty with the learner\'s skill level to maintain deep focus.'
      },
      {
        id: 'direct-manipulation',
        title: 'Direct Manipulation',
        icon: 'MousePointer2',
        color: 'bg-sky-50 text-sky-600',
        appRef: 'Sandbox Labs',
        description: 'The ability to immediately interact with the object of study (e.g., sliding a wave).'
      }
    ]
  }
];
