export interface Cheatsheet {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
  content: {
    title: string;
    points: string[];
  }[];
}

export const CHEATSHEETS: Cheatsheet[] = [
  {
    id: 'cs-biotech',
    title: 'Biotech & Lab Environments Playbook',
    description: 'Key talking points for research labs, pharmaceutical manufacturing, and vivariums.',
    icon: 'Beaker', // New Icon
    content: [
      {
        title: '1. What They Care About (Their Pains)',
        points: [
          'Extreme RF Sensitivity: Scientific equipment (mass spectrometers, PCR machines) can be disrupted by 2.4 GHz interference.',
          'Lab IoT & Data Integrity: Hundreds of sensors (temperature, humidity) are critical for GxP compliance and cannot lose connection.',
          'Challenging Physical Environments: Clean rooms with metal walls create unpredictable RF dead zones.',
          'Seamless Mobility for Researchers: Scientists need uninterrupted access to datasets and equipment controls while moving between labs.',
        ],
      },
      {
        title: '2. Key Arista Features to Demo (The Solutions)',
        points: [
          'Granular RF Control: Show how to create an RF template that disables 2.4 GHz radios in a specific lab zone.',
          'Multi-PSK (MPSK): Demonstrate "one key per sensor" for secure, auditable onboarding of headless devices.',
          'Live Packet Capture: Frame as a non-intrusive tool. "Prove network innocence without setting foot in the clean room."',
          '802.11r (Fast Roaming): Ensure researchers don\'t drop sessions with critical datasets when moving between labs.',
        ],
      },
      {
        title: '3. Buzzwords & Language to Use',
        points: [
          '"GxP / FDA compliance"',
          '"Data integrity"',
          '"RF-sensitive equipment"',
          '"Clean room" & "Vivarium"',
          '"Mean Time to Innocence (MTTI)"',
        ],
      },
    ],
  },
  {
    id: 'cs-biotech-manufacturing',
    title: 'Life Sciences Manufacturing Playbook',
    description: 'Specialized strategies for GMP/GxP manufacturing floors, clean rooms, and distribution centers.',
    icon: 'Factory',
    content: [
      {
        title: '1. What They Care About (Compliance & Continuity)',
        points: [
          'GxP Validation & Drift: Any change to the network must be validated. They care about "Zero-Touch Alignment" and configuration auditing.',
          'Sterile Environments (Clean Rooms): APs must be housed in IP67-rated or non-porous enclosures that can withstand chemical wipe-downs.',
          'AGV & Robotics Mobility: Material handling robots (AGVs) cannot tolerate a single dropped packet or high roaming latency (>100ms).',
          '24/7 Uptime (Line Downtime Costs): A 10-minute Wi-Fi outage can result in millions in discarded pharmaceutical batches.',
        ],
      },
      {
        title: '2. Key Arista Features to Demo (The Solutions)',
        points: [
          'Cognitive Unified Edge (CUE): Show how AI identifies a roaming bottleneck before an AGV disconnects.',
          'Configuration Auditing: Demonstrate how Arista verifies that every AP in a validated zone is running the exact mandated software.',
          'Simplified Enclosure Options: Discuss Arista\'s certified partners for clean-room and C1D2 (Hazardous) enclosures.',
          'Automated Packet Capture: Remote troubleshooting in clean rooms where human entry is restricted/expensive.',
        ],
      },
      {
        title: '3. Strategic Language',
        points: [
          '"Validated state"',
          '"IP67 / NEMA ratings"',
          '"RO (Robotic Orchestration)"',
          '"Batch integrity"',
          '"Non-disruptive visibility"',
        ],
      },
    ],
  },
  {
    id: 'cs-vowifi',
    title: 'VoWiFi Troubleshooting Checklist',
    description: 'A rapid, step-by-step guide to diagnosing voice quality issues over Wi-Fi.',
    icon: 'Phone',
    content: [
      {
        title: '1. RF Health Check',
        points: [
          'Is client RSSI > -67 dBm?',
          'Is client SNR > 25 dB?',
          'Is channel utilization < 50%?',
          'Are retry rates < 10%?',
        ],
      },
      {
        title: '2. Roaming Path Analysis',
        points: [
          'Is 802.11r (Fast Transition) enabled on the WLAN?',
          'Does the client support 802.11r?',
          'Is roam time < 150ms (ideally < 50ms)?',
        ],
      },
      {
        title: '3. QoS & Wired Path',
        points: [
          'Is WMM enabled on the WLAN?',
          'Is traffic being marked correctly (DSCP EF 46)?',
          'Is there QoS configured on the upstream switch/router?',
        ],
      },
    ],
  },
  {
    id: 'cs-high-density',
    title: 'High-Density Design Rules',
    description: 'Core principles for designing Wi-Fi in stadiums, auditoriums, and lecture halls.',
    icon: 'Users',
    content: [
      {
        title: '1. Reduce Transmit Power',
        points: [
          'Goal is to create many small cells, not a few large ones.',
          'Set power to the lowest possible level that meets coverage needs.',
          'Aim for cell overlap of -67 dBm.',
        ],
      },
      {
        title: '2. Disable Low Data Rates',
        points: [
          'Disable rates below 12 Mbps (or 24 Mbps for very high density).',
          'This forces slow/distant clients off the network, preserving airtime.',
        ],
      },
      {
        title: '3. Use Directional Antennas',
        points: [
          'Focus RF energy where users are, and away from where they are not.',
          'Under-seat patch antennas or sector antennas are common.',
        ],
      },
    ],
  },
  {
    id: 'cs-acronyms',
    title: 'Key Acronyms Debrief',
    description: 'A quick reference for the most important wireless standards and terms.',
    icon: 'BookText',
    content: [
        {
            title: 'The Roaming Alphabet',
            points: [
                '802.11k (Knowledge): Provides a "neighbor report" to clients.',
                '802.11v (Vision): Allows the network to "suggest" a roam.',
                '802.11r (Rapid): Pre-caches keys for a "fast transition" (<50ms).',
            ]
        },
        {
            title: 'Wi-Fi 6/7 Features',
            points: [
                'OFDMA (Orthogonal F-D Multiple Access): Splits a channel to serve multiple users at once.',
                'TWT (Target Wake Time): Allows devices to schedule wake-up times, saving battery.',
                'MLO (Multi-Link Operation): Wi-Fi 7 feature to use multiple bands simultaneously.',
            ]
        }
    ]
  }
];