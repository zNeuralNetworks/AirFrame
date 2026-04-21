
import { Zap, MonitorPlay, Search, Wifi, Shield, BarChart3, Target, FileText, LucideIcon } from 'lucide-react';
import { Lesson } from '../types';

export interface DemoStep {
  id: string;
  title: string;
  duration: string;
  icon: LucideIcon;
  whatToSay: string[];
  whatToDo: string[];
  keyInsight: string;
  trap?: {
    title: string;
    content: string;
  } | null;
  relevantConcepts: {
    lessonId: string;
    term: string;
  }[];
  roles: ('se' | 'am')[];
}

export interface DemoTrack {
  id: number;
  title: string;
  audience: string;
  focus: string;
  icon: LucideIcon;
  description: string;
  roles: ('se' | 'am')[];
  steps: DemoStep[];
}

export const DEMO_TRACKS: DemoTrack[] = [
  {
    id: 0,
    title: "The Golden Path",
    audience: "General / Mixed",
    focus: "The Core Narrative",
    icon: Zap,
    description: "The standard 15-minute winning narrative that proves Arista's value through visibility and root cause analysis.",
    roles: ['se', 'am'],
    steps: [
      {
        id: 'gp-1',
        title: "1. The Hook: The Morning Coffee View",
        duration: "2 mins",
        icon: MonitorPlay,
        whatToSay: [
          "Start at the 'Connectivity Dashboard'. Don't dive into charts yet.",
          "Ask the customer: 'How do you currently know if your users are happy with the Wi-Fi?'",
          "Explain that Arista's primary focus is on measuring and proving **Client Experience**, not just AP up/down status."
        ],
        whatToDo: [
          "From the Dashboard, highlight the 'Connectivity' SLA widget.",
          "Click the widget to drill down into the list of failing clients."
        ],
        keyInsight: "We surface the 'Why' (user experience), not just the 'What' (hardware status).",
        trap: null,
        relevantConcepts: [
          { lessonId: '9.1', term: 'Mean Time to Innocence' }
        ],
        roles: ['se', 'am']
      },
      {
        id: 'gp-2',
        title: "2. The Investigation: From Macro to Micro",
        duration: "3 mins",
        icon: Search,
        whatToSay: [
          "You are now looking at a list of all clients with a poor experience.",
          "Say: 'In a traditional controller, your next step would be to SSH into an AP and grep logs. Here, we just click.'"
        ],
        whatToDo: [
          "Select a specific client MAC address to open the 'Client Journey' view.",
          "Point out the client details (Device Type, OS, etc.)."
        ],
        keyInsight: "One click takes you from a global view to a single user's root cause.",
        trap: null,
        relevantConcepts: [],
        roles: ['se', 'am']
      },
      {
        id: 'gp-3',
        title: "3. The Crown Jewel: Client Journey",
        duration: "5 mins",
        icon: Zap,
        whatToSay: [
          "Walk the timeline from left to right, like a story.",
          "'Here is where the client Associated (Wi-Fi is fine), here is where they Authenticated (RADIUS is fine), but **HERE** is where they failed DHCP.'",
          "This is the proof. The problem isn't the Wi-Fi; it's the DHCP server."
        ],
        whatToDo: [
          "Hover over the red failure event bubble.",
          "Show the raw reason code and latency measurement."
        ],
        keyInsight: "This is Mean Time to Innocence (MTTI). We prove it's not the Wi-Fi in seconds.",
        trap: {
          title: "The Technical Trap",
          content: "Don't just show the failure. Explain the business impact. 'This DHCP failure meant the point-of-sale terminal couldn't process transactions for 15 minutes.'"
        },
        relevantConcepts: [
            { lessonId: '9.1', term: 'Client Journey' }
        ],
        roles: ['se', 'am']
      },
      {
        id: 'gp-4',
        title: "4. The Impossible Feature: Live PCAP",
        duration: "2 mins",
        icon: Wifi,
        whatToSay: [
          "Ask: 'What if you need deeper proof?'",
          "Explain that the AP is always buffering packets. You can grab the PCAP for that specific failure event without trying to reproduce it.",
          "This is your incontrovertible evidence to send to the server team."
        ],
        whatToDo: [
          "Point to (don't click) the 'Download Packet Trace' icon."
        ],
        keyInsight: "No truck rolls. No handheld testers. Instant, retroactive evidence.",
        trap: null,
        relevantConcepts: [],
        roles: ['se']
      },
      {
        id: 'gp-5',
        title: "5. The Differentiator: WIPS Security",
        duration: "3 mins",
        icon: Shield,
        whatToSay: [
          "Switch to the Security dashboard and find a Rogue AP.",
          "Explain the 'Marker Packet' patent. 'We don't guess if it's a rogue. We inject a packet on the wire and listen on the air. It's deterministic.'",
          "This means zero false positives, so you can safely enable auto-blocking."
        ],
        whatToDo: [
          "Show the 'Rogue AP' classification and the 'Block' button."
        ],
        keyInsight: "Automatic classification with zero false positives.",
        trap: null,
        relevantConcepts: [
          { lessonId: '8.1', term: 'WIPS Security' }
        ],
        roles: ['se']
      }
    ]
  },
  {
    id: 1,
    title: "The Executive Briefing",
    audience: "CIO / VP Infra",
    focus: "Business Outcomes",
    icon: BarChart3,
    description: "A 5-minute, high-level narrative focused on business outcomes, operational efficiency, and ROI.",
    roles: ['am'],
    steps: [
      {
        id: 'eb-1',
        title: "1. The High-Level SLA View",
        duration: "2 mins",
        icon: MonitorPlay,
        whatToSay: [
          "Start at the main Dashboard.",
          "Explain that the primary widgets (Connectivity, Performance) are not measuring hardware status, but rather **user happiness**.",
          "Say: 'This tells you if your investment in wireless is actually paying off for your employees and customers.'"
        ],
        whatToDo: [
          "Hover over the main SLA widgets to show the descriptions.",
          "Avoid clicking into any deep technical menus."
        ],
        keyInsight: "We measure ROI and User Satisfaction, not just technical metrics.",
        trap: null,
        relevantConcepts: [],
        roles: ['am']
      },
      {
        id: 'eb-2',
        title: "2. The Cost of Blame (MTTI)",
        duration: "2 mins",
        icon: Target,
        whatToSay: [
          "Explain the cost of escalations and finger-pointing.",
          "Say: 'When Wi-Fi is blamed for an outage, it often takes your expensive engineers hours to prove it was actually the DHCP server. We reduce that time to seconds.'",
          "This is Mean Time to Innocence."
        ],
        whatToDo: [
          "Briefly show a screenshot or a static view of the Client Journey timeline.",
          "Point to the Root Cause Analysis text bubble."
        ],
        keyInsight: "We increase Operational Efficiency by eliminating the blame game.",
        trap: null,
        relevantConcepts: [
          { lessonId: '9.1', term: 'Mean Time to Innocence' }
        ],
        roles: ['am']
      },
      {
        id: 'eb-3',
        title: "3. Visibility Without Effort",
        duration: "1 min",
        icon: FileText,
        whatToSay: [
          "Show the scheduled reports feature.",
          "Say: 'You don't need to log in to know the network is healthy. We can email you or your team a summary every Monday morning.'"
        ],
        whatToDo: [
          "Navigate to 'Reports' and show an example 'Executive Summary' report."
        ],
        keyInsight: "We provide automated visibility, freeing up your team's time.",
        trap: null,
        relevantConcepts: [],
        roles: ['am']
      }
    ]
  }
];
