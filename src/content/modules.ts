
import { Module, ContentStatus, Difficulty } from '../types';
import { INITIAL_LESSONS } from './lessons';

export const MODULES: Module[] = [
  {
    id: 'm1',
    title: 'The Physics of Invisible Light',
    subtitle: 'Quantitative Wireless',
    tag: 'Module 1',
    description: 'Moving from "bars" to decibels. The logarithmic nature of signal strength and the Rule of 3s and 10s.',
    icon: 'Radio',
    color: 'bg-amber-50 text-amber-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 1'))
  },
  {
    id: 'm2',
    title: 'Airtime Economics',
    subtitle: 'RF Fundamentals',
    tag: 'Module 2',
    description: 'How waves interact with the physical world and the economics of shared airtime.',
    icon: 'Wifi',
    color: 'bg-blue-50 text-blue-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 2'))
  },
  {
    id: 'm3',
    title: 'Spatial Design & Capacity',
    subtitle: 'L2 Design Logic',
    tag: 'Module 3',
    description: 'Frequency reuse, Co-Channel Interference (CCI), and the capacity paradox.',
    icon: 'Layers',
    color: 'bg-emerald-50 text-emerald-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 3'))
  },
  {
    id: 'm4',
    title: 'Connection State Machine',
    subtitle: 'L2 Handshake',
    tag: 'Module 4',
    description: 'The invisible handshake. Management, Control, and Data frames.',
    icon: 'Lock',
    color: 'bg-indigo-50 text-indigo-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 4'))
  },
  {
    id: 'm5',
    title: 'Roaming & Mobility',
    subtitle: 'Client Steering',
    tag: 'Module 5',
    description: 'How devices decide when to switch APs and the protocols that help (K, V, R).',
    icon: 'Activity',
    color: 'bg-purple-50 text-purple-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 5'))
  },
  {
    id: 'm6',
    title: 'Efficiency Standards',
    subtitle: 'From N to BE',
    tag: 'Module 6',
    description: 'The evolution from High Throughput to Extremely High Throughput.',
    icon: 'Zap',
    color: 'bg-amber-50 text-amber-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 6'))
  },
  {
    id: 'm7',
    title: 'Infrastructure Architecture',
    subtitle: 'Campus Design',
    tag: 'Module 7',
    description: 'Centralized vs. Distributed control planes and resilient data paths.',
    icon: 'Server',
    color: 'bg-slate-50 text-slate-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 7'))
  },
  {
    id: 'm8',
    title: 'Defense & Security',
    subtitle: 'WIPS / WIDS',
    tag: 'Module 8',
    description: 'Detecting and mitigating rogue APs, honey pots, and DoS attacks.',
    icon: 'Shield',
    color: 'bg-rose-50 text-rose-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 8'))
  },
  {
    id: 'm9',
    title: 'AIOps & Observability',
    subtitle: 'Mean Time to Innocence',
    tag: 'Module 9',
    description: 'Leveraging AI-driven telemetry to identify root causes in seconds, not hours.',
    icon: 'Brain',
    color: 'bg-purple-50 text-purple-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 9'))
  },
  {
    id: 'm10',
    title: 'Applied Judgment',
    subtitle: 'Business Outcomes',
    tag: 'Module 10',
    description: 'Translating technical metrics to business outcomes and mastering the bake-off.',
    icon: 'Target',
    color: 'bg-indigo-50 text-indigo-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 10'))
  },
  {
    id: 'm11',
    title: 'Hardware & Directivity',
    subtitle: 'Antenna Theory',
    tag: 'Module 11',
    description: 'Omni vs. Directional patterns. Understanding gain, polarization, and EIRP.',
    icon: 'Radio',
    color: 'bg-orange-50 text-orange-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 11'))
  },
  {
    id: 'm12',
    title: 'The Wired Foundation',
    subtitle: 'The 10GbE Reality',
    tag: 'Module 12',
    description: 'Integrating Wi-Fi 7 APs into high-performance switching backplanes. Power (PoE), MTU, and Multi-Gig uplinks.',
    icon: 'Server',
    color: 'bg-emerald-50 text-emerald-600',
    status: ContentStatus.Active,
    lessons: INITIAL_LESSONS.filter(l => l.category.includes('Module 12'))
  }
];
