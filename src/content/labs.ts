
import { SimulationType } from '../types';

export interface LabChallenge {
  id: string;
  text: string;
  isAuto?: boolean; // If true, automatically checked when simulation triggers onComplete
}

export interface LabSpec {
  id: SimulationType;
  title: string;
  objective: string;
  baseline: string;
  challenges: LabChallenge[];
  observation: string;
}

export const LAB_SPECS: Record<string, LabSpec> = {
  'db-game': {
    id: 'db-game',
    title: 'The Logarithmic Scale',
    objective: 'Internalize the Rule of 3s (+3dB = 2x) and 10s (+10dB = 10x).',
    baseline: 'Start at Level 1 with 100mW power.',
    challenges: [
      { id: 'c1', text: 'Use +3dB to double power output.', isAuto: true },
      { id: 'c2', text: 'Use -10dB to reduce power by a factor of 10.', isAuto: true },
      { id: 'c3', text: 'Complete all 4 levels.', isAuto: true }
    ],
    observation: 'Notice how small dB adjustments result in massive wattage changes.'
  },
  'material-lab': {
    id: 'material-lab',
    title: 'Attenuation Lab',
    objective: 'Observe how different materials impact Received Signal Strength Indicator (RSSI).',
    baseline: 'Clear line of sight. Signal is strong (-50 dBm).',
    challenges: [
      { id: 'c1', text: 'Place a "Brick Wall" in the signal path.', isAuto: true },
      { id: 'c2', text: 'Add an "Elevator Shaft" (Metal) and observe the signal death.', isAuto: true },
      { id: 'c3', text: 'Reduce signal to "Dead Zone" status.', isAuto: true }
    ],
    observation: 'Metal reflects almost all energy (-25dB), whereas drywall is mostly transparent (-4dB).'
  },
  'spectrum-analyzer': {
    id: 'spectrum-analyzer',
    title: 'Interference Identification',
    objective: 'Distinguish between Wi-Fi traffic and non-Wi-Fi interference sources.',
    baseline: 'Spectrum shows normal Wi-Fi activity on channels 1, 6, and 11.',
    challenges: [
      { id: 'c1', text: 'Analyze the duty cycle (width and frequency) of the noise.', isAuto: true },
      { id: 'c2', text: 'Determine if the source is "Polite" (Wi-Fi) or "Rude" (Raw Energy).', isAuto: true },
      { id: 'c3', text: 'Correctly identify the interference source.', isAuto: true }
    ],
    observation: 'Microwaves span the whole band, while Radar is a sweeping pulse.'
  },
  'signal-thermometer': {
    id: 'signal-thermometer',
    title: 'RSSI Calibration',
    objective: 'Find the "Goldilocks Zone" for Voice over Wi-Fi.',
    baseline: 'Signal is currently unstable.',
    challenges: [
      { id: 'c1', text: 'Move slider out of the "Too Loud" zone (>-40dBm).', isAuto: true },
      { id: 'c2', text: 'Avoid the "Dead Zone" (<-75dBm).', isAuto: true },
      { id: 'c3', text: 'Hold signal in the Voice Quality zone (-65 to -67 dBm).', isAuto: true }
    ],
    observation: 'More power isn\'t always better. Too loud causes radio distortion.'
  },
  'airtime-highway': {
    id: 'airtime-highway',
    title: 'Legacy Impact Analysis',
    objective: 'Visualize the impact of "Slow Talkers" (802.11b) on network aggregate speed.',
    baseline: 'Legacy Mode is ENABLED. Traffic is moving slowly.',
    challenges: [
      { id: 'c1', text: 'Observe the "1 Mbps Beacon" trucks blocking the highway.', isAuto: true },
      { id: 'c2', text: 'Disable Legacy Support.', isAuto: true },
      { id: 'c3', text: 'Achieve aggregate throughput > 100 Mbps.', isAuto: true }
    ],
    observation: 'Removing legacy rates frees up airtime for faster clients.'
  },
  'bottleneck-sim': {
    id: 'bottleneck-sim',
    title: 'Protection Overhead',
    objective: 'Understand RTS/CTS protection mechanisms triggered by legacy devices.',
    baseline: 'Mixed environment with Wi-Fi 7 and Legacy clients.',
    challenges: [
      { id: 'c1', text: 'Identify the legacy device forcing protection mode.', isAuto: true },
      { id: 'c2', text: 'Remove the legacy device compatibility.', isAuto: true },
      { id: 'c3', text: 'Observe the removal of "Slowed by Prot" status.', isAuto: true }
    ],
    observation: 'One old device forces the entire cell to speak slowly (RTS/CTS headers).'
  },
  'roam-lab': {
    id: 'roam-lab',
    title: 'Roaming Thresholds',
    objective: 'Fix a "Sticky Client" by adjusting its roam aggressiveness.',
    baseline: 'Client is stuck to AP-A despite being closer to AP-B.',
    challenges: [
      { id: 'c1', text: 'Move client to the middle (50%). Observe it does not roam.', isAuto: true },
      { id: 'c2', text: 'Adjust Roam Threshold from -90 (Sticky) to -70 (Balanced).', isAuto: true },
      { id: 'c3', text: 'Successfully roam to AP-B.', isAuto: true }
    ],
    observation: 'The Network cannot force a roam; it can only encourage it. The Driver decides.'
  },
  'channel-hex': {
    id: 'channel-hex',
    title: 'Cellular Planning',
    objective: 'Design a channel reuse pattern with zero Co-Channel Interference (CCI).',
    baseline: 'All cells are unassigned.',
    challenges: [
      { id: 'c1', text: 'Assign channels 1, 6, and 11.' },
      { id: 'c2', text: 'Ensure no two touching cells share a channel.' },
      { id: 'c3', text: 'Complete the honeycomb without collisions.', isAuto: true }
    ],
    observation: 'Physical separation is required to reuse the same frequency.'
  },
  'network-planner': {
    id: 'network-planner',
    title: 'Coverage Planner',
    objective: 'Place APs to achieve 70% coverage without excessive overlap.',
    baseline: 'Floor plan is empty.',
    challenges: [
      { id: 'c1', text: 'Place routers to cover the dark zones.' },
      { id: 'c2', text: 'Avoid placing APs too close (causing CCI).' },
      { id: 'c3', text: 'Achieve >70% coverage.', isAuto: true }
    ],
    observation: 'Strategic placement beats simply adding more hardware.'
  },
  'handshake-sequencer': {
    id: 'handshake-sequencer',
    title: 'WPA2 4-Way Handshake',
    objective: 'Reconstruct the encryption key exchange process.',
    baseline: 'Frames are scrambled.',
    challenges: [
      { id: 'c1', text: 'Identify Message 1 (Anonce).' },
      { id: 'c2', text: 'Order the frames chronologically.' },
      { id: 'c3', text: 'Install the keys.', isAuto: true }
    ],
    observation: 'If M2 fails, the password is wrong. If M3/M4 fails, it\'s usually RF loss.'
  },
  'voip-walker': {
    id: 'voip-walker',
    title: 'Fast Transition (802.11r)',
    objective: 'Maintain voice MOS score while roaming.',
    baseline: '802.11r is Disabled.',
    challenges: [
      { id: 'c1', text: 'Walk between APs and observe the call drop (MOS dip).' },
      { id: 'c2', text: 'Enable 802.11r (Fast Transition).' },
      { id: 'c3', text: 'Complete the walk with >80% Call Quality.', isAuto: true }
    ],
    observation: 'Standard roaming takes 200ms+. 11r reduces this to <50ms, saving the call.'
  },
  'wips-guard': {
    id: 'wips-guard',
    title: 'Threat Classification',
    objective: 'Correctly identify and mitigate wireless threats.',
    baseline: 'Scanning active. Threats detected.',
    challenges: [
      { id: 'c1', text: 'Distinguish "External" hotspots from "Rogue" APs.' },
      { id: 'c2', text: 'Block the Rogue AP connected to the wire.' },
      { id: 'c3', text: 'Achieve 3/3 correct classifications.', isAuto: true }
    ],
    observation: 'Blocking a neighbor\'s Wi-Fi is illegal. Only block APs on your wire.'
  },
  'cv-cue-dashboard': {
    id: 'cv-cue-dashboard',
    title: 'Root Cause Analysis',
    objective: 'Drill down from a high-level alert to a specific packet failure.',
    baseline: 'Dashboard shows a "Connectivity" alert.',
    challenges: [
      { id: 'c1', text: 'Click "Connectivity" to see failing clients.' },
      { id: 'c2', text: 'Identify the specific failure stage (DHCP/DNS/Auth).' },
      { id: 'c3', text: 'Complete the analysis.', isAuto: true }
    ],
    observation: 'Mean Time to Innocence is improved by visualizing the client journey.'
  },
  'distributed-sim': {
    id: 'distributed-sim',
    title: 'Control Plane Resilience',
    objective: 'Compare centralized vs. distributed data plane behavior during an outage.',
    baseline: 'Network is healthy. WAN Link is Up.',
    challenges: [
      { id: 'c1', text: 'Cut the WAN Link.' },
      { id: 'c2', text: 'Switch to "Arista Distributed" mode.' },
      { id: 'c3', text: 'Verify data plane stays active during outage.', isAuto: true }
    ],
    observation: 'Distributed control planes survive WAN failures. Tunnel-based controllers do not.'
  },
  'ghost-hunter': {
    id: 'ghost-hunter',
    title: 'Tri-Radio Sensing',
    objective: 'Scan for threats without interrupting client traffic.',
    baseline: '2-Radio mode. Scanning is off.',
    challenges: [
      { id: 'c1', text: 'Activate the 3rd Radio Sensor.' },
      { id: 'c2', text: 'Wait for the full spectrum scan.' },
      { id: 'c3', text: 'Detect the rogue AP.', isAuto: true }
    ],
    observation: 'Dedicated sensors allow 24/7 WIPS without timeslicing client radios.'
  },
  'multi-link-racer': {
    id: 'multi-link-racer',
    title: 'Multi-Link Operation',
    objective: 'Use MLO to bypass congestion.',
    baseline: 'Single Link (5GHz) active. Speeds are inconsistent.',
    challenges: [
      { id: 'c1', text: 'Observe congestion on the 5GHz band.' },
      { id: 'c2', text: 'Enable Wi-Fi 7 MLO.' },
      { id: 'c3', text: 'Download 500MB of data.', isAuto: true }
    ],
    observation: 'MLO aggregates bandwidth and provides redundancy against interference.'
  },
  'ofdma-tetris': {
    id: 'ofdma-tetris',
    title: 'OFDMA Efficiency',
    objective: 'Compare OFDM (Legacy) vs OFDMA (Wi-Fi 6) frame packing.',
    baseline: 'Legacy OFDM mode.',
    challenges: [
      { id: 'c1', text: 'Run the simulation in Legacy mode. Note the waste.' },
      { id: 'c2', text: 'Switch to Wi-Fi 6 (OFDMA).' },
      { id: 'c3', text: 'Achieve high packing efficiency.', isAuto: true }
    ],
    observation: 'OFDMA reduces latency by serving multiple small packets simultaneously.'
  },
  'protocol-match': {
    id: 'protocol-match',
    title: 'Standard Definitions',
    objective: 'Map the 802.11 amendment to its common name/function.',
    baseline: 'Cards are shuffled.',
    challenges: [
      { id: 'c1', text: 'Match 802.11r to "Fast Transition".' },
      { id: 'c2', text: 'Match 802.11k to "Neighbor Reports".' },
      { id: 'c3', text: 'Clear the board.', isAuto: true }
    ],
    observation: 'K, V, and R are the "Roaming Triad".'
  },
  'timeline-puzzle': {
    id: 'timeline-puzzle',
    title: 'Wi-Fi Generations',
    objective: 'Order the standards chronologically.',
    baseline: 'Timeline is scrambled.',
    challenges: [
      { id: 'c1', text: 'Place 802.11b (Legacy) at the top.' },
      { id: 'c2', text: 'Place 802.11be (Wi-Fi 7) at the bottom.' },
      { id: 'c3', text: 'Correctly sort all generations.', isAuto: true }
    ],
    observation: 'Each generation brings efficiency gains, not just speed.'
  },
  'wave-match': {
    id: 'wave-match',
    title: 'Phase & Frequency',
    objective: 'Synchronize the transmitter with the receiver.',
    baseline: 'Signal is out of sync.',
    challenges: [
      { id: 'c1', text: 'Adjust Frequency (Hz) to match the ghost wave.' },
      { id: 'c2', text: 'Adjust Amplitude to match power levels.' },
      { id: 'c3', text: 'Achieve Signal Lock.', isAuto: true }
    ],
    observation: 'MIMO relies on precise phase synchronization.'
  },
  'poe-budget-sim': {
    id: 'poe-budget-sim',
    title: 'The Hungry Switch',
    objective: 'Understand 802.3af vs at vs bt and what happens when an AP is underpowered.',
    baseline: 'You have a 740W PoE budget and 48 empty ports.',
    challenges: [
      { id: 'c1', text: 'Connect APs that require 20W of power each.' },
      { id: 'c2', text: 'Observe the switch log when the PoE budget is exceeded.' },
      { id: 'c3', text: 'Identify the port where power is first denied.', isAuto: true }
    ],
    observation: 'The last few APs will be denied power or boot-loop, demonstrating the budget limit.'
  },
  'uplink-bottleneck-sim': {
    id: 'uplink-bottleneck-sim',
    title: 'The Funnel',
    objective: 'Visualize why a 1Gbps uplink is a bottleneck for Wi-Fi 6E/7 APs.',
    baseline: 'A Wi-Fi 7 AP is connected via a Cat5e (1Gbps) cable. Data is spilling over.',
    challenges: [
      { id: 'c1', text: 'Observe the high number of dropped packets due to the bottleneck.' },
      { id: 'c2', text: 'Change the cable type to Cat6a (5Gbps).' },
      { id: 'c3', text: 'Verify that packet drop stops and the bottleneck is resolved.', isAuto: true }
    ],
    observation: 'Upgrading the cable allows the uplink to match the APs potential, eliminating dropped packets.'
  },
  'mtu-fragmentation-sim': {
    id: 'mtu-fragmentation-sim',
    title: 'Packet Tetris',
    objective: 'See the performance impact of packet fragmentation caused by tunnel overhead.',
    baseline: 'A standard 1500-byte packet is trying to pass through a tunnel with a 1400-byte MTU.',
    challenges: [
      { id: 'c1', text: 'Attempt to transmit the packet and observe the fragmentation process.' },
      { id: 'c2', text: 'Note the spike in CPU usage required to fragment and reassemble the packet.' },
      { id: 'c3', text: 'Reduce the packet payload size so it fits without fragmentation.', isAuto: true }
    ],
    observation: 'Adding tunnel headers (VXLAN, etc.) reduces the effective MTU, forcing fragmentation and increasing latency.'
  },
  'antenna-lab': {
    id: 'antenna-lab',
    title: 'Radiation Patterns',
    objective: 'Visualize the geometry of Omni vs. Directional antennas.',
    baseline: 'Omni-directional antenna selected. 360° coverage active.',
    challenges: [
      { id: 'c1', text: 'Select the "Patch (Directional)" antenna hardware.' },
      { id: 'c2', text: 'Observe the focused cone of energy and its impact on gain.' },
      { id: 'c3', text: 'Complete the hardware comparison.', isAuto: true }
    ],
    observation: 'Directional antennas reduce Co-Channel Interference by focusing energy only where it\'s needed.'
  }
};
