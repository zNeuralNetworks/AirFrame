
export interface ScenarioQuestion {
  id: string;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const SCENARIOS: Record<string, ScenarioQuestion[]> = {
  '1.assessment': [
    {
      id: 's1',
      scenario: 'You are designing Wi-Fi for a historic building with 1 meter thick stone walls. The client wants 5GHz coverage in every room, but drilling is not allowed. They suggest placing APs in the hallway to blast through the doors.',
      options: [
        'Agree. High power APs will penetrate the stone.',
        'Agree, but use 2.4GHz only for better penetration.',
        'Disagree. This will cause the "Hidden Node" problem. APs must be in-room (mesh or discreet) because stone attenuation (>15dB) is too high for reliable return traffic.',
        'Suggest using external directional antennas pointed at the windows.'
      ],
      correctIndex: 2,
      explanation: 'Stone is a major attenuator. Even if the AP screams loud enough to get in, the client device (phone) cannot shout back through the wall (Link Asymmetry). You need line-of-sight.'
    },
    {
      id: 's2',
      scenario: 'A warehouse uses barcode scanners that only support 2.4GHz 802.11b/g. You install new Wi-Fi 6 APs. The scanners connect, but the network is extremely slow for everyone, including the new laptops.',
      options: [
        'The APs are defective.',
        'There is a rogue AP nearby.',
        'The 802.11b devices forced the network into "Protection Mode" (RTS/CTS), adding massive overhead to every frame.',
        'You need more APs.'
      ],
      correctIndex: 2,
      explanation: 'Legacy devices trigger protection mechanisms that force all devices (even fast ones) to announce transmission intent, cutting throughput by 40-50%.'
    },
    {
      id: 's3',
      scenario: 'You increase the Transmit Power on all APs to 100% (30dBm) to fix a coverage hole. Users now report "full bars" but cannot load webpages.',
      options: [
        'DNS failure.',
        'One-Way Audio / Link Asymmetry. The client hears the AP, but the AP cannot hear the weak client whisper back.',
        'Interference from microwaves.',
        'The backhaul is saturated.'
      ],
      correctIndex: 1,
      explanation: 'High power creates a "Large Cell" visually, but if the client transmit power (15dBm) is lower than the AP (30dBm), the link is unbalanced and frames drop.'
    }
  ],
  '2.assessment': [
    {
      id: '2s1',
      scenario: 'A high-density auditorium design requires 4 APs in a small space. Which channel plan minimizes Co-Channel Interference (CCI) on 2.4GHz?',
      options: [
        '1, 2, 3, 4',
        '1, 6, 11, 1',
        '1, 1, 6, 6',
        'Use only channel 6'
      ],
      correctIndex: 1,
      explanation: 'Channels 1, 6, and 11 are the only non-overlapping channels in 2.4GHz. You must reuse one, but spatially separate the two "Channel 1" APs as much as possible.'
    },
    {
      id: '2s2',
      scenario: 'You are deploying VoWiFi handsets. The manufacturer spec says "Roaming transition must be under 150ms". Which standard is most critical to enable?',
      options: [
        '802.11ac',
        '802.11r (Fast Transition)',
        '802.11w (Protected Frames)',
        'WPA3'
      ],
      correctIndex: 1,
      explanation: '802.11r allows the client to cache keys with the next AP before it roams, reducing the handshake time from ~200ms to ~50ms.'
    },
    {
      id: '2s3',
      scenario: 'Users in a cafeteria complain of slow speeds at lunch. The spectrum analyzer shows high utilization (90%) but low noise floor. What is happening?',
      options: [
        'Microwave interference',
        'Airtime Congestion. Too many devices competing for the medium.',
        'Coverage hole',
        'DNS latency'
      ],
      correctIndex: 1,
      explanation: 'High utilization with low noise means the air is filled with valid Wi-Fi packets. The medium is saturated. Solution: More radios/cells or disable low data rates.'
    }
  ],
  '3.assessment': [
    {
      id: '3s1',
      scenario: 'A client reports "Cannot connect". The logs show: Association Success, Authentication Success, DHCP Request... DHCP Timeout. Where is the problem?',
      options: [
        'The Wi-Fi Password is wrong',
        'The RF environment is noisy',
        'The wired switch VLAN is missing or the DHCP server is unreachable',
        'The client driver is old'
      ],
      correctIndex: 2,
      explanation: 'If Auth succeeds, the Wi-Fi part is mostly done. A DHCP timeout typically means Layer 2 (VLAN) connectivity to the gateway is broken.'
    },
    {
      id: '3s2',
      scenario: 'Security team detects a "Rogue AP" alert. It is broadcasting "Free Wi-Fi" on Channel 6 at -40dBm. It is NOT seen on the wire side. Action?',
      options: [
        'Block it immediately via WIPS',
        'Ignore it. It is an external neighbor / honeypot, but not physically connected to your network.',
        'Unplug the nearest corporate AP',
        'Change WPA2 passwords'
      ],
      correctIndex: 1,
      explanation: 'Blocking a neighbor (FCC violation) is dangerous. If the rogue is not "On Wire", it is just pollution. WIPS should only block if it sees the marker packet on the wire.'
    },
    {
      id: '3s3',
      scenario: 'An Executive demands Wi-Fi 7 immediately for "faster email". Your current WAN link is 500Mbps. What do you tell them?',
      options: [
        'Deploy it immediately.',
        'Explain that Wi-Fi 7 is faster than the WAN, so they won\'t see a speed difference for internet traffic. Pitch latency/reliability (MLO) instead.',
        'Tell them email uses UDP and doesn\'t benefit.',
        'Upgrade the WAN to 10Gbps first.'
      ],
      correctIndex: 1,
      explanation: 'The bottleneck is the WAN. Wi-Fi 7 is great, but marketing "speed" when the pipe is small is a recipe for disappointment. Sell MLO/Reliability.'
    }
  ]
};
