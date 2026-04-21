
export interface ComparisonSpec {
  [key: string]: {
    'Max Throughput': string;
    'Bands': string;
    'Key Feature': string;
    'Channel Width': string;
    'Modulation': string;
    'MIMO': string;
  };
}

export const COMPARISON_DATA: ComparisonSpec = {
  'Wi-Fi 5 (802.11ac)': {
    'Max Throughput': '6.9 Gbps',
    'Bands': '5 GHz',
    'Key Feature': 'MU-MIMO (Downlink)',
    'Channel Width': '160 MHz',
    'Modulation': '256-QAM',
    'MIMO': '4x4',
  },
  'Wi-Fi 6 (802.11ax)': {
    'Max Throughput': '9.6 Gbps',
    'Bands': '2.4 / 5 GHz',
    'Key Feature': 'OFDMA, TWT',
    'Channel Width': '160 MHz',
    'Modulation': '1024-QAM',
    'MIMO': '8x8',
  },
  'Wi-Fi 6E (802.11ax)': {
    'Max Throughput': '9.6 Gbps',
    'Bands': '2.4 / 5 / 6 GHz',
    'Key Feature': '6 GHz Band Access',
    'Channel Width': '160 MHz',
    'Modulation': '1024-QAM',
    'MIMO': '8x8',
  },
  'Wi-Fi 7 (802.11be)': {
    'Max Throughput': '46 Gbps',
    'Bands': '2.4 / 5 / 6 GHz',
    'Key Feature': 'Multi-Link Operation (MLO)',
    'Channel Width': '320 MHz',
    'Modulation': '4096-QAM',
    'MIMO': '16x16',
  },
};

export const WIFI7_TALKING_POINTS = {
  technical: {
    title: "Engineer & Architect Perspective",
    points: [
      "MLO (Multi-Link Operation): The 'Bonding' of Wi-Fi. Aggregates multiple bands to reduce latency and increase reliability for critical streaming.",
      "320 MHz Channels: Doubles the widest possible channel from 6E. Essential for true multigigabit wireless backhaul.",
      "4096-QAM: Peak throughput increased by 20% over 6/6E, allowing for faster bursts in clean RF environments.",
      "Multi-RU Puncturing: Allows the network to 'carve out' interference in a wide channel rather than losing the whole channel."
    ]
  },
  executive: {
    title: "Executive & Business Perspective",
    points: [
      "Investment Protection: Wi-Fi 7 is the 'North Star'. Upgrading now ensures a 7-10 year lifecycle for your edge infrastructure.",
      "Wired-Level Reliability: MLO provides the reliability required to replace physical ethernet for mission-critical industrial and medical tools.",
      "Cost Efficiency: Dense environments require fewer Wi-Fi 7 APs than Wi-Fi 5 or 6 to achieve the same capacity, reducing cabling costs.",
      "User Experience: Significantly reduces 'jitter' and lag in high-density video conferencing, directly impacting employee productivity."
    ]
  }
};
    