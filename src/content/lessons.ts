
import { Lesson, Difficulty, ContentStatus } from '../types';

const defaultQuiz = [
  {
    id: 'q1',
    text: 'What is the primary takeaway from this lesson?',
    options: ['Power is everything', 'Efficiency beats raw speed', 'Legacy support is priority', 'More antennas = better'],
    correctIndex: 1,
    explanation: 'Modern wireless engineering prioritizes airtime efficiency and client experience over raw power or theoretical top speeds.'
  }
];

const INITIAL_LESSONS_DATA: Partial<Lesson>[] = [
  // --- MODULE 1: THE PHYSICS OF INVISIBLE LIGHT ---
  {
    id: '1.1',
    title: '1.1 The Decibel Code: Rules of 3s & 10s',
    description: 'Stop thinking linearly. Master the Rule of 3s and 10s.',
    category: 'Module 1: The Physics of Invisible Light',
    difficulty: Difficulty.Beginner,
    durationMinutes: 10,
    xpReward: 100,
    completed: false,
    locked: false,
    simulationId: 'db-game',
    content: `
# The Decibel Code

Ever wondered why a client with "full bars" still has terrible performance? Or why moving just a few feet can be the difference between a perfect video call and a dropped one?

It's because you're reading the wrong language. Your phone's UI displays signal linearly, but RF physics operates on a logarithmic scale. To understand Wi-Fi, you need to learn **The Decibel Code**.

## The Mental Model
RF does not scale linearly. A 3 dB change is not “a little weaker.” It is **half the power**.

This is why engineers think in decibels instead of milliwatts: RF problems are about ratios, not absolute numbers.

### The Rule of 3s and 10s
[[BentoGrid]]
* **+3 dB** ≈ **Double** the power
* **-3 dB** ≈ **Half** the power
* **+10 dB** = **10x** the power
* **-10 dB** = **1/10th** the power

### Why This Breaks Wi-Fi: The Symmetry Problem
Wi-Fi is a two-way conversation. An AP might be powerful enough to shout at a client through a wall, but if that wall costs the signal **-10 dB**, the client's weak radio (a phone) doesn't have 10x the power to shout back.

* **This is "one-way audio" in RF.** The client has full bars (it can hear the AP), but the AP can't hear the client. The connection is useless.
[[KillShot: Your job isn't to design for coverage; it's to design for symmetry.]]

Once you think in dB, this stops being mysterious and becomes predictable.
    `,
    quiz: [
      {
        id: '1.1q1',
        text: 'If you reduce transmit power by -3dB, what happens to the wattage?',
        options: ['It reduces slightly (97%)', 'It is cut in half (50%)', 'It divides by 10 (10%)', 'It stays the same'],
        correctIndex: 1,
        explanation: 'dB is logarithmic. -3dB represents a halving of the physical energy.'
      },
      {
        id: '1.1q2',
        text: 'An AP transmits at 100 mW. After applying +10 dB then -3 dB, what is the final power?',
        options: ['500 mW', '1000 mW', '50 mW', '200 mW'],
        correctIndex: 0,
        explanation: '+10 dB multiplies by 10 (100 mW → 1000 mW). -3 dB halves the result (1000 mW → 500 mW). Applying the Rule of 3s and 10s in sequence gives 500 mW.'
      }
    ]
  },
  {
    id: '1.2',
    title: '1.2 The Price of Passage: Attenuation',
    description: 'How the physical environment shapes the cell.',
    category: 'Module 1: The Physics of Invisible Light',
    difficulty: Difficulty.Beginner,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'material-lab',
    content: `
# The Price of Passage: Attenuation

## The Mental Model

The Environment IS the Network.

You're not sending signals *through* walls; you're fighting a battle against physics. Every material has a cost, and your job is to know the price.

### The Toll Booth
Every signal that passes through a material pays a "toll" in dB.

*   **Drywall:** A cheap toll (-4 dB).
*   **Brick:** An expensive toll (-10 dB).
*   **Metal Elevator:** A dead end (-25 dB).

[[Visual:AbsorptionChart]]

### Failure Mode: Ignoring the Cost
Placing an AP in a concrete stairwell is a classic mistake. The signal pays such a high toll to get out that it arrives weak and unusable. The metal shaft acts as a Faraday cage, blocking what little signal is left.

### Common Misconception
**"I can blast through this wall with more power."**
**Correction:** You might get the signal *through*, but the client device can't pay the toll to get back. You've created an asymmetric link, and the connection is useless.
    `,
    quiz: [
      {
        id: '1.2q1',
        text: 'Which material causes the most significant signal loss?',
        options: ['Drywall', 'Glass', 'Metal', 'Wood'],
        correctIndex: 2,
        explanation: 'Metal reflects or absorbs nearly all RF energy, causing roughly -20dB or more attenuation.'
      }
    ]
  },
  {
    id: '1.3',
    title: '1.3 The Dinner Party Problem: SNR',
    description: 'Distinguishing between Wi-Fi and raw interference.',
    category: 'Module 1: The Physics of Invisible Light',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'spectrum-analyzer',
    content: `
# The Dinner Party Problem: SNR

## The Mental Model

Signal-to-Noise Ratio (SNR) is the only thing that matters.

Imagine a dinner party.
*   **Signal Strength (RSSI)** is how loud you're talking.
*   **The Noise Floor** is how loud everyone else is.

If you're whispering (-80 RSSI) in a library (-95 Noise Floor), you can be heard perfectly (15 SNR).
If you're shouting (-50 RSSI) at a rock concert (-60 Noise Floor), you're just noise (10 SNR).

### Polite vs. Rude Guests
*   **Co-Channel Interference:** Other Wi-Fi devices. Polite. They follow the same dinner party etiquette (CSMA/CA) and wait for a pause in the conversation.
*   **Non-Wi-Fi Interference:** Microwaves, Bluetooth. Rude. They just scream over everyone, corrupting the conversation.

[[Visual:InterferenceGraph]]

### Failure Mode: The Microwave
A microwave oven is a rude guest that shouts for 30 seconds, then goes silent for 30 seconds (50% duty cycle). While it's shouting, it destroys all Wi-Fi conversations in the 2.4 GHz band.
    `,
    quiz: [
        {
          id: '1.3q1',
          text: 'Why is non-Wi-Fi interference (Microwaves) worse than Co-Channel interference?',
          options: ['It is louder', 'It does not follow Wi-Fi collision avoidance rules (CSMA/CA)', 'It uses more electricity', 'It is encrypted'],
          correctIndex: 1,
          explanation: 'Wi-Fi devices wait for silence before talking. Microwaves just blast energy, causing packet corruption.'
        }
      ]
  },
  {
    id: '1.assessment',
    title: 'Field Assessment: RF Physics',
    description: 'Test your judgment with real-world scenarios.',
    category: 'Module 1: The Physics of Invisible Light',
    difficulty: Difficulty.Advanced,
    durationMinutes: 10,
    xpReward: 300,
    completed: false,
    locked: true, // Should be locked in real flow
    simulationId: null,
    content: '# Module 1 Assessment\n\nApply your knowledge of RF physics to solve field problems.',
    quiz: []
  },

  // --- MODULE 2: AIRTIME ECONOMICS ---
  {
    id: '2.1',
    title: '2.1 The Gearbox: SNR & MCS Rates',
    description: 'Why signal strength (RSSI) determines speed (MCS).',
    category: 'Module 2: Airtime Economics',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 10,
    xpReward: 100,
    completed: false,
    locked: false,
    simulationId: 'signal-thermometer',
    content: `
# The Gearbox: SNR & MCS Rates

## The Mental Model

Wi-Fi doesn't have one speed. It has a gearbox.

The network is constantly shifting gears based on the clarity of the signal (SNR). This gear is called the Modulation and Coding Scheme (MCS).

### The Gears
*   **High SNR (>25dB):** 6th gear on an open highway. Fast, complex modulation (256-QAM).
*   **Low SNR (<10dB):** 1st gear in a traffic jam. Slow, simple modulation (BPSK).

[[Visual:SignalNoiseRatio]]

### Why "5 Bars" is a Lie
"5 Bars" just means the signal is loud (high RSSI). If you're at a rock concert (high noise floor), it doesn't matter how loud you shout; the message won't be clear (low SNR). Your phone will shift into first gear.

### The Design Insight
Your job isn't to provide "coverage" (RSSI). It's to provide "clarity" (SNR).
    `,
    quiz: [
        {
          id: '2.1q1',
          text: 'What actually determines the data rate (speed) of a client?',
          options: ['RSSI (Signal Strength)', 'SNR (Signal to Noise Ratio)', 'The AP model', 'The SSID name'],
          correctIndex: 1,
          explanation: 'SNR determines which Modulation and Coding Scheme (MCS) can be used. Higher SNR = More complex modulation = Faster speed.'
        }
      ]
  },
  {
    id: '2.2',
    title: '2.2 The Walkie-Talkie Problem: Half-Duplex',
    description: 'Visualizing the "Single Lane Highway" problem.',
    category: 'Module 2: Airtime Economics',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'airtime-highway',
    content: `
# The Walkie-Talkie Problem: Half-Duplex

## The Mental Model

Wi-Fi is a walkie-talkie, not a telephone. You can talk, or you can listen, but you can't do both at the same time. "Over."

This is called **Half-Duplex**. Only one device can transmit on a channel at any given instant.

### The Collision Domain
If two devices try to talk at once, their packets "collide" and are destroyed. The entire group of devices that can hear each other forms a single "collision domain." They must all share the same airtime.

[[Visual:HalfDuplexVisual]]

### Failure Mode: The Slow Talker
Airtime is a shared resource. If you allow a very slow device to talk at 1 Mbps, it holds the microphone for hundreds of times longer than a fast device. It's like being stuck behind a slow truck on a single-lane highway. Everyone else has to wait.
    `,
    quiz: [
        {
          id: '2.2q1',
          text: 'Why is Wi-Fi "Half Duplex"?',
          options: ['To save battery', 'It can only transmit OR receive, not both at once', 'It uses half the power', 'It is broken'],
          correctIndex: 1,
          explanation: 'Radios cannot listen while they shout. They must switch between TX and RX, meaning only one direction of traffic flows at a time.'
        }
    ]
  },
  {
    id: '2.3',
    title: '2.3 The Legacy Tax: Protection Overhead',
    description: 'How one old device destroys the performance of the cell.',
    category: 'Module 2: Airtime Economics',
    difficulty: Difficulty.Advanced,
    durationMinutes: 20,
    xpReward: 200,
    completed: false,
    locked: false,
    simulationId: 'bottleneck-sim',
    content: `
# The Legacy Tax: Protection Overhead

## The Mental Model

The network moves at the speed of its slowest member.

Imagine a business meeting with 10 people who speak English, and one person who only speaks ancient Latin. To be polite and ensure the Latin speaker isn't confused, everyone has to announce their intention to speak before every sentence.

This is the **Legacy Tax**.

### The Cost of Translation
If a single 802.11b device from 1999 joins your network, the AP must enable "Protection Mode." It wraps every modern Wi-Fi 6 frame with an old-fashioned header (RTS/CTS) that the legacy client can understand.

[[Visual:LegacyTaxChart]]

This "translation" overhead destroys up to 40% of your network's total capacity.

### The Design Insight
Your job is to protect the fast. By disabling legacy data rates (1, 2, 5.5, 11 Mbps), you are effectively banning these slow talkers from the dinner table. This recovers massive amounts of airtime for your modern clients.
    `,
    quiz: [
        {
          id: '2.3q1',
          text: 'What happens when an 802.11b client joins a Wi-Fi 6 network?',
          options: ['Nothing', 'The network speeds up', 'Protection mechanisms engage, slowing down all users', 'The AP reboots'],
          correctIndex: 2,
          explanation: 'To prevent collisions, the AP must use RTS/CTS headers that the legacy client can understand, adding massive overhead.'
        }
    ]
  },
  {
    id: '2.assessment',
    title: 'Field Assessment: Airtime Economics',
    description: 'Test your judgment with real-world scenarios.',
    category: 'Module 2: Airtime Economics',
    difficulty: Difficulty.Advanced,
    durationMinutes: 10,
    xpReward: 300,
    completed: false,
    locked: true,
    simulationId: null,
    content: '# Module 2 Assessment\n\nApply your knowledge of Airtime Economics.',
    quiz: []
  },

  // --- MODULE 3: SPATIAL DESIGN LOGIC ---
  {
    id: '3.1',
    title: '3.1 The Echo Chamber: Co-Channel Interference',
    description: 'Why "More APs" often means "Less Speed".',
    category: 'Module 3: Spatial Design & Capacity',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'channel-hex',
    content: `
# The Echo Chamber: Co-Channel Interference

## The Mental Model

Access Points on the same channel are in the same room.

You added more APs to "improve" coverage, but now the Wi-Fi is even slower. This isn't a bug; it's a trap called Co-Channel Interference (CCI).

### The Echo Chamber
If AP-A and AP-B are on Channel 6 and can hear each other, they are now shouting in the same room. They must follow the walkie-talkie rule and take turns talking.

*   **Result:** You doubled your hardware cost but just cut your capacity in half.

[[Visual:ChannelInterference]]

### The Design Insight
Your job as an architect is to build rooms with thick enough walls. You must separate APs on the same channel by enough distance (or attenuation) that they cannot hear each other above the noise floor (typically -85 dBm). This allows you to reuse the channel, creating a new, separate room for conversation.
    `,
    quiz: [
        {
          id: '3.1q1',
          text: 'What is Co-Channel Interference (CCI)?',
          options: ['Hacker attack', 'Two APs on different channels', 'Two APs on the same channel hearing each other and competing for airtime', 'Microwave interference'],
          correctIndex: 2,
          explanation: 'CCI occurs when APs share a frequency. The 802.11 protocol forces them to take turns, effectively sharing the bandwidth.'
        }
    ]
  },
  {
    id: '3.2',
    title: '3.2 The Capacity Paradox: Why Less Power is More',
    description: 'Designing for user count, not just square footage.',
    category: 'Module 3: Spatial Design & Capacity',
    difficulty: Difficulty.Advanced,
    durationMinutes: 20,
    xpReward: 200,
    completed: false,
    locked: false,
    simulationId: 'network-planner',
    content: `
# The Capacity Paradox: Why Less Power is More

## The Mental Model

To serve more people, you turn the power *down*.

This is the most counter-intuitive rule in wireless. It seems wrong, but it's based on physics and economics.

### The Megaphone vs. The Stadium
One AP with a megaphone (high power) can cover a 500-seat auditorium. But it creates one giant, noisy room where only one person can talk.

A stadium needs hundreds of small, quiet conversations, not one person shouting.

### Small Cells = More Conversations
By lowering AP power, you shrink the cell size (the "room"). This allows you to reuse your channels much sooner.

*   **More Rooms:** Channel 6 can be used in Section 101 and again in Section 104.
*   **More Conversations:** With more rooms, more devices can talk simultaneously.
*   **More Capacity:** This is how you support 500 active video streams.

[[Visual:CapacityParadoxVisual]]

### The Design Insight
Coverage is easy. Capacity is hard. Never use full power unless you have to. Design for the lowest power capable of meeting the need.
    `,
    quiz: [
       {
        id: '3.2q1',
        text: 'How do you increase network capacity in a high-density area?',
        options: ['Increase transmit power', 'Add more APs and reduce transmit power to create smaller cells', 'Use older antennas', 'Disable 5GHz'],
        correctIndex: 1,
        explanation: 'Creating smaller cells allows for frequency reuse. More unique collision domains equals more total capacity.'
      }
    ]
  },
  {
    id: '3.assessment',
    title: 'Field Assessment: Design & Capacity',
    description: 'Test your judgment with real-world scenarios.',
    category: 'Module 3: Spatial Design & Capacity',
    difficulty: Difficulty.Advanced,
    durationMinutes: 10,
    xpReward: 300,
    completed: false,
    locked: true,
    simulationId: null,
    content: '# Module 3 Assessment\n\nApply your knowledge of Spatial Design.',
    quiz: []
  },

  // --- MODULE 4: THE CONNECTION STATE MACHINE ---
  {
    id: '4.1',
    title: '4.1 The Secret Handshake',
    description: 'How devices prove they know a password without saying it.',
    category: 'Module 4: The Connection State Machine',
    difficulty: Difficulty.Advanced,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'handshake-sequencer',
    content: `
# The Secret Handshake

## The Mental Model

Before you can talk, you must prove you know the secret password. But you can never say the password out loud. This is the cryptographic dance of the 4-Way Handshake.

### The Dance Steps
It's a call-and-response to generate a unique, one-time-use encryption key.

*   **M1: The Challenge.** AP to Client: "Here is a random number (ANonce)."
*   **M2: The Proof.** Client to AP: "Okay, I've mixed your number with my own random number (SNonce) and the password. Here is the result (MIC). Does it match your copy?"
*   **M3: The Group Key.** AP to Client: "It matches. You're in. Here is the key for broadcast traffic (GTK)."
*   **M4: The Confirmation.** Client to AP: "Got it. Let's talk."

[[Visual:HandshakeVisualizer]]

### Failure Mode
*   **M2 Failure:** The MIC doesn't match. This is a **Bad Password** 99% of the time.
*   **M3/M4 Failure:** The messages are lost. This is almost always an **RF problem**. The signal is too weak for the final steps to complete.
    `,
    quiz: [
        {
          id: '4.1q1',
          text: 'If a client fails at Message 2 (M2) of the handshake, what is the most likely cause?',
          options: ['Bad Driver', 'Interference', 'Incorrect Password / PSK', 'AP Failure'],
          correctIndex: 2,
          explanation: 'M2 contains the Message Integrity Code (MIC) derived from the password. If the AP cannot validate it, the password is wrong.'
        }
    ]
  },
  {
    id: '4.2',
    title: '4.2 The Key vs. The Bouncer',
    description: 'Comparing PSK (what you have) vs 802.1X (who you are).',
    category: 'Module 4: The Connection State Machine',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'timeline-puzzle', // Repurposing to sort auth types security levels
    content: `
# The Key vs. The Bouncer

## The Mental Model

There are two ways to get into a secure building: with a key, or by showing your ID to a bouncer.

### WPA2-PSK (The Key)
Everyone gets the same key.
*   **Mechanism:** A Pre-Shared Key (PSK) is configured on the AP and given to all users. It's based on **what you have**.
*   **Risk:** If one person loses the key (or an employee leaves), you have to re-key the entire building. There is no individual accountability.

### 802.1X (The Bouncer)
A bouncer checks your ID at the door.
*   **Mechanism:** The AP (the door) sends your credentials to a RADIUS server (the bouncer). The bouncer checks your ID against a database. It's based on **who you are**.
*   **Benefit:** Granular control. Alice from Engineering goes to VLAN 10. Bob the guest goes to the Guest VLAN. If Alice leaves the company, you just deactivate her ID.

[[Visual:AuthRealmsVisual]]
    `,
    quiz: [
        {
          id: '4.2q1',
          text: 'What is the primary benefit of 802.1X over WPA2-PSK?',
          options: ['Faster speed', 'Individual user identity and dynamic policy assignment', 'Better range', 'Simpler configuration'],
          correctIndex: 1,
          explanation: '802.1X allows the network to know *who* is connecting and assign them specific rights (VLAN/ACL) based on their identity.'
        }
    ]
  },

  // --- MODULE 5: ROAMING & MOBILITY ---
  {
    id: '5.1',
    title: '5.1 The Client is the Quarterback',
    description: 'The APs are just receivers. The client makes the throw.',
    category: 'Module 5: Roaming & Mobility',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'roam-lab',
    content: `
# The Client is the Quarterback

## The Mental Model

The client is the quarterback. The APs are just wide receivers running their routes.

It's the client who decides where to throw the ball (associate). The network can't force the client to roam.

### The Playbook
*   **The Network** can suggest a route (802.11v) or show the open receivers (802.11k).
*   **The Client** makes the final decision based on its internal "roaming algorithm."

[[Visual:RoamingDecisionVisual]]

### Failure Mode: The Sticky Client
This is why "sticky clients" are a driver problem, not an AP problem. A bad driver (a bad quarterback) will hold onto the ball too long, clinging to a weak signal (-80 dBm) even when a better receiver is wide open nearby.
    `,
    quiz: [
        {
          id: '5.1q1',
          text: 'Who makes the final decision to roam to a new AP?',
          options: ['The Controller', 'The Old AP', 'The New AP', 'The Client Device'],
          correctIndex: 3,
          explanation: 'The 802.11 standard dictates that the Station (Client) is responsible for monitoring RSSI and deciding when to re-associate.'
        }
    ]
  },
  {
    id: '5.2',
    title: '5.2 The 150ms Cliff',
    description: 'Why voice calls drop during a roam.',
    category: 'Module 5: Roaming & Mobility',
    difficulty: Difficulty.Advanced,
    durationMinutes: 20,
    xpReward: 200,
    completed: false,
    locked: false,
    simulationId: 'voip-walker',
    content: `
# The 150ms Cliff

## The Mental Model

For web browsing, a 400ms roam is a minor hiccup. For a voice call, it's a cliff.

Anything over **150 milliseconds** of latency and the human ear perceives a drop. Your call turns into robotic gibberish. This isn't a performance issue; it's a real-time budget.

### The Roam Gap
A standard roam involves a full re-authentication and key exchange. This can take 200-400ms.

[[Visual:RoamingTimeline]]

### The Fast Lane: 802.11r
802.11r (Fast Transition) is the fix. It allows the client to pre-negotiate the keys with the next AP *before* it roams. This cuts the roam time to under 50ms, well below the 150ms cliff.
    `,
    quiz: [
        {
          id: '5.2q1',
          text: 'What is the maximum acceptable latency for high-quality voice calls?',
          options: ['500ms', '150ms', '1 second', '50ms'],
          correctIndex: 1,
          explanation: 'ITU G.114 states that one-way latency should be kept below 150ms for acceptable voice quality.'
        }
    ]
  },
  {
    id: '5.3',
    title: '5.3 The Roaming Playbook: k, v, & r',
    description: 'The map, the nudge, and the keys.',
    category: 'Module 5: Roaming & Mobility',
    difficulty: Difficulty.Advanced,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'protocol-match',
    content: `
# The Mental Model

These aren't just random letters. They are the client's playbook for a perfect handoff. They work together to make roaming seamless.

### 802.11k (Knowledge)
**The Map.** The network gives the client a "neighbor report" listing all nearby APs and their channels. This saves the client from having to blindly scan every single channel in the band, which saves battery and time.

### 802.11v (Vision)
**The Nudge.** The network can send a "BSS Transition Management" frame to suggest a roam. "Hey, you're on a crowded AP. Please consider moving to AP-B over there; it's empty." The client can choose to ignore this suggestion.

### 802.11r (Rapid)
**The Keys.** This is the "Fast Transition" mechanism. It lets the client pre-authenticate with neighboring APs so the key exchange is already done when it's time to roam. This is the most critical piece for fast, seamless roaming.

[[Visual:RoamingProtocolsVisual]]
    `,
    quiz: defaultQuiz
  },

  // --- MODULE 6: EFFICIENCY STANDARDS ---
  {
    id: '6.1',
    title: '6.1 The Carpool Lane: OFDMA',
    description: 'How Wi-Fi 6 groups small packets for efficiency.',
    category: 'Module 6: Efficiency Standards',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 20,
    xpReward: 200,
    completed: false,
    locked: false,
    simulationId: 'ofdma-tetris',
    content: `
# The Carpool Lane: OFDMA

## The Mental Model

Legacy Wi-Fi was like a highway where every person, no matter how small, took up a whole bus. OFDMA is the carpool lane.

### Solving Small Packet Inefficiency
A voice call is just a tiny trickle of small packets. In legacy Wi-Fi (OFDM), each tiny packet required a full transmission frame (a whole bus). This was incredibly wasteful.

### The Wi-Fi 6 Solution
OFDMA (Orthogonal Frequency-Division Multiple Access) divides a single transmission frame into smaller sub-carriers called Resource Units (RUs). It can then assign these RUs to multiple users simultaneously.

[[Visual:OFDMAVisual]]

Instead of sending one bus for one person, it fills the bus with people (packets) going to different destinations (users). This isn't about top speed; it's about reducing traffic jams and improving latency for everyone.
    `,
    quiz: [
       {
        id: '6.1q1',
        text: 'What is the primary benefit of OFDMA?',
        options: ['Higher top speed', 'Lower latency for multiple users', 'Longer range', 'Better encryption'],
        correctIndex: 1,
        explanation: 'OFDMA allows the AP to communicate with multiple clients in a single time slot, reducing the queue time (latency) for everyone.'
      }
    ]
  },
  {
    id: '6.2',
    title: '6.2 The Redundant Bridge: MLO',
    description: 'Wi-Fi 7\'s killer feature for reliability.',
    category: 'Module 6: Efficiency Standards',
    difficulty: Difficulty.Advanced,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'multi-link-racer',
    content: `
# The Redundant Bridge: MLO

## The Mental Model

Imagine driving to work, and you can take two bridges at the same time. If there's a crash on Bridge A (5GHz band), your car instantly continues its journey on Bridge B (6GHz band) without stopping.

### Beyond Speed
Multi-Link Operation (MLO) is the flagship feature of Wi-Fi 7. While it can aggregate bands for higher peak speeds, its true value for the enterprise is **unprecedented reliability**.

### Simultaneous Transmit/Receive (STR)
A Wi-Fi 7 client can connect to the 5GHz and 6GHz bands of an AP at the same time. The AP can then send packets down both lanes. If a packet gets corrupted by interference on one band, the copy on the other band still gets through.

[[Visual:MLOVisual]]

For critical applications like medical devices or industrial robotics, this is a game-changer. It provides wired-like reliability over the air.
    `,
    quiz: [
       {
        id: '6.2q1',
        text: 'How does MLO improve reliability?',
        options: ['It uses more power', 'It sends data across multiple bands redundancy', 'It disconnects slower clients', 'It predicts the future'],
        correctIndex: 1,
        explanation: 'If one band encounters interference, MLO ensures the data can still flow instantly over the alternative link.'
      }
    ]
  },
  {
    id: '6.3',
    title: '6.3 The 6 GHz Frontier',
    description: 'Welcome to the massive, clean expansion of the Wi-Fi spectrum.',
    category: 'Module 6: Efficiency Standards',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'signal-thermometer',
    content: `
# The 6 GHz Frontier

## The Mental Model
Imagine you've lived in a crowded city (2.4 GHz and 5 GHz) all your life. Suddenly, a massive, empty continent is discovered right next door. This is **6 GHz**.

### The Scope of 1200 MHz
Wi-Fi 6E and 7 tap into the 6 GHz band, which provides 1200 MHz of contiguous spectrum. In the US, this means:
*   **59 new 20 MHz channels**
*   **14 new 80 MHz channels** (compared to only 6 in 5 GHz)
*   **7 new 160 MHz channels**

### No Legacy Baggage
The biggest "hidden" feature of 6 GHz is that **legacy devices are banned**. There are no 802.11b/g/n/ac devices allowed. This means the 25% "Legacy Tax" we learned about in Module 2 is gone. Every device speaks the modern, efficient language of Wi-Fi 6 (HE) or Wi-Fi 7 (EHT).
    `,
    quiz: [
      {
        id: '6.3q1',
        text: 'How many 80 MHz channels are available in the 6 GHz band (US)?',
        options: ['6', '14', '25', '59'],
        correctIndex: 1,
        explanation: 'The 1200 MHz of spectrum in 6 GHz allows for 14 non-overlapping 80 MHz channels.'
      }
    ]
  },
  {
    id: '6.4',
    title: '6.4 AFC: The Digital Guard',
    description: 'How Wi-Fi shares its new home without crashing into satellites.',
    category: 'Module 6: Efficiency Standards',
    difficulty: Difficulty.Advanced,
    durationMinutes: 15,
    xpReward: 200,
    completed: false,
    locked: false,
    simulationId: 'wips-guard',
    content: `
# AFC: The Digital Guard

## The Mental Model
The 6 GHz band wasn't empty; it was already used by "Incumbents" like fixed satellite services and microwave links. To share the space, Wi-Fi 7 uses a "Digital Guard" called **Automated Frequency Coordination (AFC)**.

### Low Power vs. Standard Power
*   **Low Power Indoor (LPI):** APs that stay inside and use lower power levels don't need AFC because they are unlikely to interfere with satellites.
*   **Standard Power (SP):** Outdoor APs or high-power indoor APs **MUST** check with an AFC database.

### How it Works
1.  **Registry:** The AP reports its location (GPS) and antenna height to a central AFC database.
2.  **Calculation:** The database looks for nearby incumbents.
3.  **Permission:** The database tells the AP which channels and at what power levels it is allowed to operate.

This allows Wi-Fi to coexist legally and safely with critical infrastructure while still using high-power radios for maximum range.
    `,
    quiz: [
      {
        id: '6.4q1',
        text: 'Which type of 6 GHz AP requires communication with an AFC database?',
        options: ['Low Power Indoor (LPI)', 'Very Low Power (VLP)', 'Standard Power (SP)', 'Temporary Mobile'],
        correctIndex: 2,
        explanation: 'Standard Power APs use higher power levels and can operate outdoors, necessitating AFC to prevent interference with fixed satellite incumbents.'
      }
    ]
  },

  // --- MODULE 7: ARCHITECTURE ---
  {
    id: '7.1',
    title: '7.1 Survive the Apocalypse',
    description: 'Why the data plane must survive the control plane.',
    category: 'Module 7: Infrastructure Architecture',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'distributed-sim',
    content: `
# Survive the Apocalypse

## The Mental Model

Legacy networks have a single point of failure: the controller. If the WAN link to the controller dies, the entire network dies.

### Controller-Based (Legacy)
All traffic is tunneled to a central box. The controller is the brain, the heart, and the lungs. If it goes down, everything stops. SSIDs disappear. Users are disconnected.

### Distributed (Arista)
Arista separates the control plane (the brain, in the cloud) from the data plane (the local switching, on the AP).

*   **Scenario:** The WAN link is cut. The AP can't talk to the cloud.
*   **Result:** Management is down. You can't make config changes. But the AP keeps switching traffic locally. Existing users stay connected. New users can even join using cached credentials. The business stays up.

[[Visual:ControlPlaneVisual]]
    `,
    quiz: [
        {
          id: '7.1q1',
          text: 'In a distributed architecture, what happens to client traffic if the cloud connection is lost?',
          options: ['It stops', 'It continues locally', 'It is buffered', 'It is redirected to 4G'],
          correctIndex: 1,
          explanation: 'The data plane logic resides on the edge (AP). It does not need the cloud to forward packets.'
        }
    ]
  },
  {
    id: '7.2',
    title: '7.2 The Watchtower',
    description: 'The purpose of the dedicated 3rd radio.',
    category: 'Module 7: Infrastructure Architecture',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 10,
    xpReward: 100,
    completed: false,
    locked: false,
    simulationId: 'ghost-hunter',
    content: `
# The Mental Model

A 2-radio AP is like a security guard who has to leave his post to patrol the perimeter. A 3-radio AP has a dedicated guard in a watchtower who scans for threats 24/7 without ever abandoning his post.

### The Timeslicing Problem
A standard AP has two radios: one for 2.4GHz clients, one for 5GHz. To scan for rogue APs or interference, one of those radios must briefly stop serving clients and go "off-channel" to listen. For a voice call, that 100ms gap is a noticeable stutter.

### The Dedicated Sensor
Arista's tri-radio APs have a third, dedicated radio.
*   **Radio 1 & 2:** Serve clients full-time. No interruptions.
*   **Radio 3 (The Watchtower):** Scans the spectrum 24/7 for security threats (WIPS) and RF interference, and runs client connectivity tests.

You get full-time security with zero performance impact on users.

[[Visual:TriRadioVisual]]
    `,
    quiz: defaultQuiz
  },

  // --- MODULE 8: DEFENSE & SECURITY ---
  {
    id: '8.1',
    title: '8.1 The Fingerprint: Deterministic WIPS',
    description: 'Proof vs. Guesswork in rogue detection.',
    category: 'Module 8: Defense & Security',
    difficulty: Difficulty.Advanced,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'wips-guard',
    content: `
# The Mental Model

Other systems *guess* if an AP is a rogue. Arista *proves* it.

### Probabilistic vs. Deterministic
Legacy WIPS systems use heuristics. "Is the signal very strong? Is the MAC address weird?" This leads to false positives, where you accidentally block your neighbor's network (which is illegal).

### The Marker Packet
Arista's patented method is deterministic.
1.  Our sensor AP injects a secret "marker packet" onto your **wired network**.
2.  The sensor then listens on **the air**.
3.  If it hears that exact packet being broadcast, we have a cryptographic fingerprint. It is, with 100% certainty, an unauthorized device plugged into your secure wire.

No false positives. Just proof.

[[Visual:MarkerPacketVisual]]
    `,
    quiz: defaultQuiz
  },

  // --- MODULE 9: MEAN TIME TO INNOCENCE ---
  {
    id: '9.1',
    title: '9.1 Mean Time to Innocence',
    description: 'How to prove it\'s not the Wi-Fi.',
    category: 'Module 9: Mean Time to Innocence',
    difficulty: Difficulty.Advanced,
    durationMinutes: 20,
    xpReward: 200,
    completed: false,
    locked: false,
    simulationId: 'cv-cue-dashboard',
    content: `
# The Mental Model

The #1 job of a wireless engineer is to prove it's not the Wi-Fi.

The blame game between the network team, the server team, and the application team costs millions in wasted hours. "Mean Time to Innocence" (MTTI) is about ending that argument with data.

### The Four Failure Domains
When a user says "the Wi-Fi is broken," the failure is almost always in one of four places:
1.  **Association (RF):** Can the client even hear the AP?
2.  **Authentication (RADIUS/PSK):** Is the password wrong?
3.  **Network (DHCP/DNS):** Can the client get an IP address?
4.  **Application (Cloud):** Is the upstream application server down?

The Client Journey view is your evidence. It's a timeline that shows exactly where the breakdown occurred. You aren't guessing; you are presenting irrefutable proof.

[[Visual:FailureDomainVisual]]
    `,
    quiz: [
        {
          id: '9.1q1',
          text: 'If a client is associated and authenticated but cannot browse the web, where should you look?',
          options: ['RF Signal', 'WPA Keys', 'Network Services (DHCP/DNS)', 'Roaming logs'],
          correctIndex: 2,
          explanation: 'The wireless link is established. The issue is logically higher up the stack (obtaining an IP or resolving names).'
        }
    ]
  },

  // --- MODULE 10: APPLIED JUDGMENT ---
  {
    id: '10.1',
    title: '10.1 Speaking CIO',
    description: 'Translating technical metrics to business outcomes.',
    category: 'Module 10: Synthesis',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 10,
    xpReward: 100,
    completed: false,
    locked: false,
    simulationId: 'cv-cue-dashboard',
    content: `
# The Mental Model

Your CIO doesn't care about dBm, MCS rates, or channel utilization. They care about business outcomes.

You must learn to translate engineering metrics into business value.

### The Translation
*   **Don't Say:** "Channel utilization is down 20%."
*   **Say:** "We reduced user-reported trouble tickets by 40% because the air is cleaner."

*   **Don't Say:** "We have 99.99% AP uptime."
*   **Say:** "We have a 98% success rate for users connecting to the network on their first try."

Your value as an engineer is not just in fixing the network, but in proving its value to the business.

[[Visual:ExperienceTrendVisual]]
    `,
    quiz: defaultQuiz
  },
  {
    id: '10.2',
    title: '10.2 Win the Bake-Off',
    description: 'How to structure a successful Proof of Concept.',
    category: 'Module 10: Synthesis',
    difficulty: Difficulty.Advanced,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'network-planner',
    content: `
# The Mental Model

A Proof of Concept (POC) is not a "test." It's a performance where you define the rules.

Never start a POC without defining the success criteria first. If you let the customer define success as "running a speed test," you will lose to the competitor with the flashiest marketing numbers.

### Define Success on Your Terms
*   **Don't Promise:** "Faster speeds."
*   **Promise:** "Zero dropped voice calls in the warehouse."

*   **Don't Promise:** "More coverage."
*   **Promise:** "Root cause for 100% of connection failures in under 5 minutes."

You win by proving business value and operational efficiency, not by having the highest number on a speed test app.

[[Visual:POVSuccessVisual]]
    `,
    quiz: defaultQuiz
  },
  // --- MODULE 11: HARDWARE & DIRECTIVITY ---
  {
    id: '11.1',
    title: '11.1 Omni vs. Directional',
    description: 'Choosing the right tool for the geometry of the space.',
    category: 'Module 11: Hardware & Directivity',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'antenna-lab',
    content: `
# Omni vs. Directional

## The Mental Model
An **Omni-directional** antenna is like a lightbulb; it sends light in every direction. A **Directional** antenna is like a flashlight; it focuses the light into a beam.

### The Patterns
[[BentoGrid]]
*   **Omni:** Best for open offices. It provides a circular "donut" shaped coverage.
*   **Patch/Directional:** Best for high ceilings, warehouses, or outdoor walls. It shoots a focused cone of energy.

### Why Directivity Matters
In high-density areas (like a stadium), you don't want an Omni. An Omni hears EVERYONE, which increases Co-Channel Interference (CCI). A Directional antenna only "hears" and "talks to" the users in its focused beam, effectively blocking out the noise from the rest of the room.
    `,
    quiz: [
      {
        id: '11.1q1',
        text: 'In a high-density stadium design, why is a directional antenna preferred over an Omni?',
        options: ['It is cheaper', 'It reduces Co-Channel Interference by focusing the cell', 'It uses less power', 'It is easier to mount'],
        correctIndex: 1,
        explanation: 'Directional antennas limit the size of the collision domain, allowing for more aggressive frequency reuse and higher capacity.'
      }
    ]
  },
  {
    id: '11.2',
    title: '11.2 Gain & EIRP',
    description: 'The math behind antenna focus.',
    category: 'Module 11: Hardware & Directivity',
    difficulty: Difficulty.Advanced,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'db-game',
    content: `
# Gain & EIRP

## The Mental Model
Antennas do not "create" power. They **redistribute** it. Imagine a balloon. If you squeeze the sides, it gets longer in the middle. This is **Antenna Gain**.

### The Formula
**EIRP (Effective Isotropic Radiated Power)** is the final "loudness" of the signal coming out of the antenna.

$$EIRP = Tx Power (dBm) - Cable Loss (dB) + Antenna Gain (dBi)$$

### The Trade-off
*   **Higher Gain:** A narrower beam that reaches further.
*   **Lower Gain:** A wider beam that covers more immediate area but doesn't reach as far.

Understanding EIRP is critical for legal compliance. Every country has a maximum EIRP limit to prevent your AP from becoming a "rude guest" that shouts too loud for its neighbors.
    `,
    quiz: [
      {
        id: '11.2q1',
        text: 'If an AP has a transmit power of 20 dBm and a 5 dBi gain antenna, what is the EIRP (ignoring cable loss)?',
        options: ['15 dBm', '20 dBm', '25 dBm', '100 dBm'],
        correctIndex: 2,
        explanation: 'EIRP is the sum of the transmit power and the antenna gain. 20 + 5 = 25 dBm.'
      }
    ]
  },

  // --- MODULE 12: THE WIRED FOUNDATION ---
  {
    id: '12.1',
    title: '12.1 The PoE Budgeting Crisis',
    description: 'Calculate switch overhead when deploying 30W+ Wi-Fi 7 APs.',
    category: 'Module 12: The Wired Foundation',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'poe-budget-sim',
    content: `
# The Mental Model

Your new Wi-Fi 7 AP is a Ferrari, but you've plugged it into a switch with an empty gas tank.

### Power is Not a Given
Modern APs are power-hungry. A Wi-Fi 6E AP can require over 30 watts (PoE+). If your switch port only provides 15 watts (PoE), the AP will enter a low-power state.

### Failure Mode
The AP might seem to boot, but it will silently disable its 6GHz radio, or lower the transmit power on all radios. The user ticket will say "Wi-Fi is slow," but the root cause is a Layer 1 power issue on the wire, not an RF problem in the air. Always check the switch's PoE budget and the AP's power draw.
    `,
    quiz: [
      {
        id: '12.1q1',
        text: 'What is a common symptom of exceeding a switch\'s PoE budget?',
        options: ['Increased RF interference', 'APs powering off or disabling radios', 'Slower internet speeds for all users', 'VLAN tagging errors'],
        correctIndex: 1,
        explanation: 'When the PoE budget is depleted, the switch cannot provide enough power for new devices, often causing them to fail to boot properly or operate in a low-power state.'
      }
    ]
  },
  {
    id: '12.2',
    title: '12.2 Uplink Bottleneck Analysis',
    description: 'Visualize why 1Gbps ports throttle Wi-Fi 6E/7 performance.',
    category: 'Module 12: The Wired Foundation',
    difficulty: Difficulty.Advanced,
    durationMinutes: 20,
    xpReward: 250,
    completed: false,
    locked: false,
    simulationId: 'uplink-bottleneck-sim',
    content: `
# The Mental Model

For the first time in history, Wi-Fi is faster than the standard wired network. Connecting a Wi-Fi 7 AP to a 1Gbps switch port is like attaching a fire hydrant to a garden hose.

### The Funnel Problem
A single Wi-Fi 7 client can push over 4 Gbps of traffic. If the AP's uplink to the switch is only 1 Gbps, the AP's internal buffers will overflow, leading to dropped packets and massive latency.

### The Solution: Multi-Gigabit
To realize the full potential of modern Wi-Fi, the wired infrastructure must be upgraded. This means multi-gigabit switch ports (2.5GbE, 5GbE) and appropriate cabling (Cat6a) are no longer optional luxuries; they are requirements.
    `,
    quiz: [
      {
        id: '12.2q1',
        text: 'What is the primary bottleneck for a Wi-Fi 7 AP connected to a standard 1Gbps switch port?',
        options: ['The AP processor', 'The client device', 'The wired uplink speed', 'The number of antennas'],
        correctIndex: 2,
        explanation: 'Modern Wi-Fi standards can generate more traffic than a 1Gbps link can handle, making the wired uplink the choke point for performance.'
      }
    ]
  },
  {
    id: '12.3',
    title: '12.3 The Overstuffed Suitcase: MTU',
    description: 'Why tunnel overhead causes fragmentation.',
    category: 'Module 12: The Wired Foundation',
    difficulty: Difficulty.Intermediate,
    durationMinutes: 15,
    xpReward: 150,
    completed: false,
    locked: false,
    simulationId: 'mtu-fragmentation-sim',
    content: `
# The Mental Model

Every network packet is like a suitcase with a strict size limit (the MTU, typically 1500 bytes). When you use network tunnels like VXLAN or GRE, you're adding extra "wrapping paper" (headers) to the outside of the suitcase.

### The Fragmentation Tax
If your 1500-byte suitcase now has 50 bytes of wrapping paper, its total size is 1550 bytes. To cross a network link that only accepts 1500-byte bags, the switch has to unpack your suitcase and repack it into two smaller bags (fragmentation).

This process is computationally expensive, burning CPU on network devices and adding significant latency. Enabling "jumbo frames" on the wired network is the solution, allowing larger suitcases to pass through without being repacked.
    `,
    quiz: [
      {
        id: '12.3q1',
        text: 'What is the negative consequence of packet fragmentation?',
        options: ['It increases security risks', 'It consumes router/switch CPU and adds latency', 'It requires more bandwidth', 'It is not supported by Wi-Fi'],
        correctIndex: 1,
        explanation: 'Breaking down and reassembling packets is computationally intensive and adds delay to the transmission, hurting application performance.'
      }
    ]
  }
];

const ARISTA_CERT_LESSONS_DATA: Partial<Lesson>[] = [
  {
    id: 'ace-1',
    title: 'ACE:A Exam Prep',
    description: 'Final Certification Exam Simulation.',
    category: 'Certification',
    difficulty: Difficulty.Advanced,
    durationMinutes: 60,
    xpReward: 500,
    completed: false,
    locked: false,
    simulationId: 'cv-cue-dashboard',
    content: `# Final Exam\n\nThis module aggregates all previous learnings into a timed challenge.`,
    quiz: defaultQuiz
  }
];

export const INITIAL_LESSONS: Lesson[] = INITIAL_LESSONS_DATA.map(l => ({ ...l, status: ContentStatus.Active } as Lesson));
export const ARISTA_CERT_LESSONS: Lesson[] = ARISTA_CERT_LESSONS_DATA.map(l => ({ ...l, status: ContentStatus.Active } as Lesson));
