
export const MASCOT_PERSONAS = [
  {
    id: 'packet-standard',
    title: 'Standard Packet',
    name: 'Packet the Corgi',
    role: 'Primary Learning Guide',
    description: 'The standard "Packet" who helps users through basic concepts. Welcoming, curious, and low-ego.',
    voice: 'Friendly, encouraging, clear',
    icon: 'Heart',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600',
    outfit: 'Standard blue collar'
  },
  {
    id: 'packet-engineer',
    title: 'Senior Architect',
    name: 'Senior Architect Packet',
    role: 'Advanced Content Guide',
    description: 'Packet wearing a lab coat or safety vest. Appears in Module 8+ (Security/Resilience) to signal increased complexity.',
    voice: 'Precise, authoritative, slightly technical',
    icon: 'HardHat',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    outfit: 'Safety vest & Hard hat'
  }
];

export const MASCOT_WARDROBE = [
  {
    id: 'default',
    title: 'Classic Arista Blue',
    name: 'Classic Arista Blue Collar',
    usage: 'General guidance',
    icon: 'Briefcase',
    color: 'bg-blue-500',
    xpCost: 'Free',
    mascotOutfit: 'none',
    mascotExpression: 'happy',
    description: 'The starting kit for every Airframe cadet.'
  },
  {
    id: 'lab-coat',
    title: 'WIPS Specialist',
    name: 'Security Lab Coat',
    usage: 'Security & WIPS modules',
    icon: 'Beaker',
    color: 'bg-slate-400',
    xpCost: '1,200 XP',
    mascotOutfit: 'lab',
    mascotExpression: 'neutral',
    description: 'Signifies data forensic capability and intrusion detection.'
  },
  {
    id: 'engineer-vest',
    title: 'Field Engineer',
    name: 'Standard Engineer Vest',
    usage: 'Installation & RF Math',
    icon: 'HardHat',
    color: 'bg-orange-500',
    xpCost: '2,500 XP',
    mascotOutfit: 'engineer',
    mascotExpression: 'excited',
    description: 'Optimized for outdoor surveys and complex hardware installs.'
  }
];

export const MASCOT_EXPRESSIONS = [
  {
    id: 'happy',
    label: 'Standard Happy',
    subtext: 'Success state',
    expression: 'happy',
    outfit: 'none',
    trigger: 'Lesson Completion',
    visual: 'Wagging tail, bright eyes'
  },
  {
    id: 'thinking',
    label: 'Analytical',
    subtext: 'In-progress state',
    expression: 'thinking',
    outfit: 'none',
    trigger: 'Quiz in Progress',
    visual: 'One ear cocked, head tilt'
  },
  {
    id: 'alarmed',
    label: 'Critical Alert',
    subtext: 'Security breach',
    expression: 'alarmed',
    outfit: 'lab',
    trigger: 'Security Breach Sim',
    visual: 'Standing at attention, alert'
  },
  {
    id: 'confused',
    label: 'Hidden Node',
    subtext: 'Collision state',
    expression: 'confused',
    outfit: 'none',
    trigger: 'Dropped Packets',
    visual: 'Tilted head, one eye closed'
  }
];
