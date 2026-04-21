
import { SimulationType, GlossaryTerm } from '../types';

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "RSSI",
    definition: "Received Signal Strength Indicator. A measurement of the power present in a received radio signal.",
    misconception: "Higher RSSI always equals better performance. In reality, High RSSI with high noise (low SNR) yields poor performance.",
    visualId: 'signal-thermometer',
    lessonId: '1.3'
  },
  {
    term: "SNR",
    definition: "Signal-to-Noise Ratio. The difference in decibels between the received signal and the background noise floor.",
    misconception: "You can ignore the noise floor. In reality, a -65dBm signal is useless if the noise floor is -70dBm (only 5dB SNR).",
    visualId: 'signal-thermometer',
    lessonId: '1.3'
  },
  {
    term: "CCI",
    definition: "Co-Channel Interference. Occurs when two or more APs in the same area operate on the same frequency, forcing them to share airtime.",
    misconception: "It's just 'noise'. Actually, it's 'congestion'. Wi-Fi devices politely wait for each other, halving throughput.",
    visualId: 'channel-hex',
    lessonId: '3.1'
  },
  {
    term: "MIMO",
    definition: "Multiple-Input Multiple-Output. Using multiple antennas to send multiple data streams simultaneously.",
    misconception: "MIMO increases range. Primarily it increases throughput/capacity via spatial multiplexing.",
    lessonId: '2.1'
  },
  {
    term: "Roaming",
    definition: "The process where a client device decides to disconnect from one AP and reassociate with another.",
    misconception: " The Network/AP moves the client. In reality, the Client driver makes 100% of the decision.",
    visualId: 'roam-lab',
    lessonId: '5.1'
  },
  {
    term: "DFS",
    definition: "Dynamic Frequency Selection. A mechanism to detect radar signals on 5GHz channels and switch channels to avoid interference.",
    misconception: "DFS channels are bad. They are actually the cleanest channels, but require APs to be 'polite' to radar.",
    visualId: 'spectrum-analyzer',
    lessonId: '1.2'
  },
  {
    term: "OFDMA",
    definition: "Orthogonal Frequency-Division Multiple Access. Splits a channel into smaller sub-carriers (Resource Units) to serve multiple clients at once.",
    misconception: "It increases top speed. Actually, it reduces latency and improves efficiency for small packets (Voice/IoT).",
    visualId: 'ofdma-tetris',
    lessonId: '6.1'
  },
  {
    term: "RTS/CTS",
    definition: "Request to Send / Clear to Send. A handshake mechanism to reserve the RF medium and prevent hidden node collisions.",
    misconception: "It should be on by default. It adds significant overhead and should only be used in specific legacy/outdoor scenarios.",
    lessonId: '2.3'
  },
  {
    term: "WIPS",
    definition: "Wireless Intrusion Prevention System. A security system that monitors the radio spectrum for unauthorized access points.",
    misconception: "It just scans. A true WIPS must be able to automatically block threats without disrupting legitimate neighbors.",
    visualId: 'wips-guard',
    lessonId: '8.1'
  },
  {
    term: "PoE",
    definition: "Power over Ethernet. Passing electric power along with data on twisted pair Ethernet cabling.",
    misconception: "All PoE is the same. Modern Wi-Fi 6E/7 APs often require 802.3bt (60W) or high-power 802.3at to enable all radios."
  },
  {
    term: "Gain",
    definition: "A measure of an antenna's ability to direct or focus radio energy in a specific direction.",
    misconception: "High gain adds power. It doesn't create energy; it shapes it (squishing the balloon), often creating dead zones underneath."
  },
  {
    term: "dBm",
    definition: "Decibel-milliwatts. An absolute unit of power (logarithmic). 0 dBm = 1 milliwatt.",
    misconception: "0 dBm is no signal. Actually, 0 dBm is quite strong (1mW). -100 dBm is effectively silence.",
    visualId: 'db-game',
    lessonId: '1.1'
  },
  {
    term: "SLA",
    definition: "Service Level Agreement. In Wi-Fi, a baseline metric (e.g., 'Time to Connect < 2s') used to measure user happiness.",
    misconception: "Up/Down status is an SLA. Real SLAs measure the quality of experience, not just hardware availability."
  },
  {
    term: "Latency",
    definition: "The time it takes for a packet to travel from source to destination.",
    misconception: "Bandwidth fixes latency. You can have a 10Gbps pipe with 500ms latency. Real-time apps care about latency, not speed."
  },
  {
    term: "MCS",
    aliases: ["Modulation and Coding Scheme"],
    definition: "Modulation and Coding Scheme. The 'gear' a Wi-Fi device uses. A higher MCS rate (e.g., MCS 9) uses more complex modulation (256-QAM) to achieve faster speeds, but requires a very clear signal (high SNR).",
    misconception: "You can set the MCS rate manually. The client and AP negotiate the best possible MCS rate for the current RF conditions on a per-packet basis.",
    lessonId: '2.1'
  }
];
