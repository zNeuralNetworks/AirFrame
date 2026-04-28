# Airframe Wireless Content Expansion Plan

## Purpose

This document is an implementation plan for expanding Airframe's wireless learning content and supporting data. It covers course lessons, labs, simulations, scenarios, glossary terms, cheatsheets, comparison data, demo-support content, and the Refresher page.

Airframe should stay focused on wireless reasoning: helping users understand RF behavior, client behavior, authentication, roaming, security, operations, wired dependencies, and demo-ready explanations through lessons, labs, field scenarios, and quick-reference tools.

Use the Airframe repo as the source of truth for app structure and placement. Use PolymathKB as the source for wireless concepts, workflows, operational examples, and realistic enterprise scenarios.

## Current App Surfaces

| Surface | Primary file or area | User-facing location | Role |
|---|---|---|---|
| Academy lessons | `src/content/lessons.ts` | Academy lesson flow | Briefings, quizzes, XP rewards, and simulation mapping. |
| Lab specs | `src/content/labs.ts` | Lesson lab tab | Lab objectives, baseline state, challenge text, and observation copy. |
| Interactive simulations | `src/features/simulations/*` and `src/features/simulations/SimulationRegistry.ts` | Lesson lab tab | Hands-on learning environments tied to lesson `simulationId` values. |
| Glossary | `src/content/glossary.ts` | Databank, search, and lesson-linked references | Definitions, misconceptions, aliases, and optional visual or lesson links. |
| Applied scenarios | `src/content/scenarios.ts` | Field assessment-style exercises | Realistic decision questions and troubleshooting cases. |
| Cheatsheets | `src/content/cheatsheets.ts` | Databank and search | Quick field playbooks and reference checklists. |
| Comparisons | `src/content/comparisons.ts` | Refresher | Wi-Fi generation/spec comparisons and audience-specific talking points. |
| Refresher UI | `src/features/demo/QuickRefresher.tsx` | Academy sidebar: Refresher, shown as Field Notes | Pre-call study, comparison, differentiator, and quick-drill interface. |
| Demo Co-Pilot tracks | `src/content/copilot.ts` | Demo Co-Pilot | Guided demo scripts, actions, traps, and relevant learning links. |

## Recommended Content Enhancements

### 1. Wireless Troubleshooting Methodology

Add a capstone-style troubleshooting track that teaches users to isolate wireless problems in the right operational order.

| Placement | User sees it as |
|---|---|
| `src/content/lessons.ts` | Advanced/capstone lesson in Academy. |
| `src/content/scenarios.ts` | Applied assessment cases with symptoms and next-best-action choices. |
| `src/content/cheatsheets.ts` | Databank troubleshooting checklist. |
| Optional future sim in `src/features/simulations/*` | Interactive diagnostic lab. |

Recommended content:

- Five-layer diagnostic path: physical/PoE, RF, association, policy/authentication, application.
- Failure signatures: AP online but underpowered, SSID visible but no DHCP, RADIUS reject, 4-way handshake timeout, high retry rate, sticky client, poor app experience despite good RF.
- Wired-wireless handoff: when to move from AP/client troubleshooting to switch VLAN, trunk, DHCP, routing, ACL, or application checks.
- Field habit: start with the lowest layer that can explain the symptom, then advance only when that layer passes.

### 2. Client Journey And CV-CUE Diagnosis

Expand the existing observability material so users can reason from user symptom to root cause.

| Placement | User sees it as |
|---|---|
| Module 9 content in `src/content/lessons.ts` | A deeper AIOps and observability lesson. |
| `src/content/scenarios.ts` | Client journey interpretation cases. |
| `src/content/glossary.ts` | Searchable terms for connection stages and failure types. |
| Existing `cv-cue-dashboard` lab data in `src/content/labs.ts` | More precise RCA challenge text. |

Recommended content:

- Client stages: probe, authentication, association, EAPOL, 802.1X, DHCP, DNS, captive portal, data path, roam event, and application check.
- Failure interpretation examples: "association succeeds but DHCP fails" points away from RF and toward VLAN/DHCP reachability; "4-way timeout" points to key exchange or RF loss; "Access-Reject" points to identity or RADIUS policy.
- CV-CUE-oriented learning: Client Journey, Client Detail, Spectrum Analyzer, AP Event Log, and Active Network Assurance as tools for different layers.
- Mean Time to Innocence framing: proving whether Wi-Fi is or is not the failing domain.

### 3. Roaming And Mobility

Deepen Module 5 from roaming basics into operational decision-making for client movement.

| Placement | User sees it as |
|---|---|
| Module 5 in `src/content/lessons.ts` | Expanded roaming lessons. |
| `src/content/glossary.ts` | Definitions for k/v/r, BTM, OKC, PMKSA, sticky client, and FT. |
| `src/content/scenarios.ts` | VoWiFi and sticky-client decision cases. |
| `src/content/cheatsheets.ts` | VoWiFi and roaming quick checklist. |

Recommended content:

- 802.11k as neighbor reports, 802.11v as BSS Transition Management, and 802.11r as Fast Transition.
- Client-driven roaming caveat: APs can encourage but not fully control most clients.
- PMKSA caching and OKC as intermediate roaming mechanisms.
- Client-type behavior: VoWiFi handsets, iOS/macOS, Windows, Android, IoT sensors, printers, and warehouse scanners.
- Roam latency expectations: voice/video needs sub-50 ms to avoid user-visible disruption; full re-authentication can be too slow.

### 4. Channel Policy And Survey Interpretation

Add content that teaches users how to interpret design numbers and avoid channel-planning traps.

| Placement | User sees it as |
|---|---|
| Module 3 or advanced design lesson in `src/content/lessons.ts` | Design and capacity education. |
| `src/content/scenarios.ts` | Venue and channel-policy cases. |
| `src/content/cheatsheets.ts` | High-density and survey validation playbooks. |
| `src/content/comparisons.ts` | Refresher design-number cards. |

Recommended content:

- Channel width rules: 2.4 GHz at 20 MHz, careful 5 GHz width decisions, and 6 GHz capacity planning.
- DFS tradeoffs: expanded 5 GHz channel pool versus radar/channel move considerations.
- PSC behavior for 6 GHz discovery and roam performance.
- Design metrics: RSSI, SNR, noise floor, retry rate, channel utilization, MCS, and minimum data-rate implications.
- Passive vs active validation: passive survey for RF coverage/channel overlap; active testing for throughput, latency, roaming, voice/video, and real client behavior.

### 5. Wireless Security Expansion

Expand Modules 4 and 8 so authentication and WIPS learning includes modern security mechanisms and common failure modes.

| Placement | User sees it as |
|---|---|
| Module 4 and Module 8 in `src/content/lessons.ts` | Connection and security lessons. |
| `src/content/glossary.ts` | Searchable security terms. |
| `src/content/scenarios.ts` | Security and authentication failure cases. |
| Existing `wips-guard` lab in `src/content/labs.ts` | More complete threat-classification lab language. |

Recommended content:

- WPA2 4-way handshake, WPA3/SAE, OWE, PMF, and MAC randomization.
- 802.1X/EAP, RADIUS, RadSec, certificate failures, Access-Reject, and VLAN assignment failures.
- UPSK/MPSK and IoT onboarding tradeoffs.
- WIPS distinction: authorized AP, external AP, rogue AP, honeypot, SoftAP, misassociation, and DoS.
- Correct containment behavior: only contain confirmed threats, not neighboring external APs.

### 6. Venue-Specific Design Scenarios

Add field-realistic scenario banks so users learn how wireless design changes by environment.

| Placement | User sees it as |
|---|---|
| `src/content/scenarios.ts` | Field assessments and applied exercises. |
| `src/content/cheatsheets.ts` | Databank playbooks. |
| Optional applied lesson sections in `src/content/lessons.ts` | Design judgment examples inside Academy. |
| `src/content/copilot.ts` | Demo tracks matched to customer context. |

Recommended scenario families:

- Classroom: predictable client counts, 2.4 GHz containment, 5/6 GHz readiness, mixed client support.
- Lecture hall/auditorium: high density, association storms, directional antennas, load balancing, VoWiFi/video use.
- Dormitory: in-room AP requirement, high wall attenuation, 6 GHz attenuation, channel reuse constraints.
- Lab/clean room: RF-sensitive equipment, metal surfaces, restricted access, remote packet capture, IoT sensors.
- Warehouse: barcode scanners, legacy clients, roaming, high ceilings, directional coverage, industrial interference.
- High-density event: temporary scale, channel reuse, onboarding load, client diversity, application validation.
- VoWiFi: RSSI/SNR targets, 802.11r, WMM/QoS, roaming interruption, retry rates, and call-quality symptoms.

### 7. Wired Foundation For Wireless

Expand Module 12 so users see Wi-Fi as dependent on the access layer, not isolated RF.

| Placement | User sees it as |
|---|---|
| Module 12 in `src/content/lessons.ts` | Wired foundation lessons. |
| `src/content/labs.ts` | More precise PoE, mGig, and MTU lab challenges. |
| `src/content/scenarios.ts` | Wired-wireless failure isolation cases. |
| `src/content/cheatsheets.ts` | Databank handoff checklist. |

Recommended content:

- PoE class and switch budget planning.
- AP brownout symptoms: AP online but radios reduced, 6 GHz unavailable, WIPS radio inactive, or downstream PoE disabled.
- mGig uplinks for Wi-Fi 6E/7 APs and when 1 GbE becomes the bottleneck.
- Switchport trunk validation: management VLAN, allowed SSID VLANs, native VLAN, DHCP reachability.
- VXLAN and MTU overhead: why encapsulation can create fragmentation and performance loss.
- Handoff test: wired client on the same VLAN as the wireless client to isolate whether the issue is wireless-specific.

## Recommended Data Enhancements

### Glossary Additions

Add these terms to `src/content/glossary.ts`, each with a concise definition, misconception, and relevant lesson link where practical:

- BTM
- PMKSA
- OKC
- Fast Transition
- SAE
- OWE
- PMF
- EAPOL
- 802.1X
- RADIUS
- RadSec
- UPSK
- MPSK
- PSC
- DFS
- BSS Coloring
- Resource Unit
- TWT
- Retry Rate
- Channel Utilization
- Noise Floor
- AP Brownout
- Client Journey
- Smart Steering
- Marker Packet

### Scenario Additions

Add new `src/content/scenarios.ts` groups aligned to lesson modules:

- Client cannot connect: distinguish RF, PSK, 802.1X, RADIUS, VLAN, DHCP, DNS, and captive portal causes.
- Sticky client: choose between more APs, lower power, BTM/Smart Steering, minimum data rates, or 802.11r.
- VoWiFi call drop: compare RSSI/SNR, roam latency, 802.11r, WMM/QoS, and retry-rate causes.
- Rogue AP alert: distinguish rogue, external AP, honeypot, SoftAP, and authorized AP.
- 6 GHz design: WPA3 requirement, PSC, client support, AP placement, and channel width decisions.
- AP underpowered: identify reduced radio behavior or WIPS degradation from PoE class mismatch.
- Wired handoff: identify missing VLAN, DHCP scope exhaustion, routing/ACL issue, or MTU fragmentation.

### Cheatsheet Additions

Add or expand `src/content/cheatsheets.ts` with:

- Wireless Troubleshooting First Moves.
- Client Journey Failure Decoder.
- VoWiFi Validation Checklist.
- High-Density Channel Policy.
- 6 GHz Readiness Checklist.
- Wired-Wireless Handoff Checklist.
- WIPS Classification Guide.

### Comparison Data Additions

Expand `src/content/comparisons.ts` beyond max PHY rates:

- Client support.
- 6 GHz readiness.
- WPA3 requirement.
- PoE/mGig impact.
- MLO relevance.
- Channel planning implications.
- Operational value: capacity, latency, reliability, onboarding, and troubleshooting impact.

## Refresher Recommendations

### Current State

The Refresher page is the Academy `Refresher` nav item rendered by `src/features/demo/QuickRefresher.tsx`. It currently includes:

- Wi-Fi generation comparison from `src/content/comparisons.ts`.
- Wi-Fi 7 technical and executive talking points.
- OFDMA visualizer.
- WIPS and Mean Time to Innocence differentiator cards.
- 802.11k/v/r quick reminder.
- Study Mode for hiding/revealing comparison values.

### Recommended Data Placement

Keep UI state and layout behavior in `src/features/demo/QuickRefresher.tsx`, but make more of the displayed content data-driven from `src/content/comparisons.ts` or a future `src/content/refresher.ts`.

Near-term, expand `src/content/comparisons.ts` because Refresher already consumes it. If the page grows beyond comparison and talking-point data, create `src/content/refresher.ts` for reusable card groups.

### Recommended Refresher Cards

| Card | Placement | User sees it as | Content |
|---|---|---|---|
| Before A Wireless Call | `src/content/comparisons.ts` or future `src/content/refresher.ts` | Refresher pre-call checklist | Audience, site type, client mix, applications, authentication, PoE/mGig readiness, known pain. |
| Troubleshooting First Move | Same as above | Refresher quick drill | Symptom-to-first-check matrix for slow, cannot connect, roaming drops, voice choppy, DHCP failure, and rogue AP. |
| Wi-Fi 6 vs 6E vs 7 Operational Tradeoffs | `src/content/comparisons.ts` | Enhanced spec comparison | Client support, 6 GHz readiness, WPA3, PoE/mGig, MLO, channel planning, and when upgrade matters. |
| Roaming Quick Drill | Same as above | Refresher study card | k/v/r, BTM, OKC, sticky clients, VoWiFi thresholds, client-driven caveat. |
| Security Quick Drill | Same as above | Refresher study card | WPA2 vs WPA3, SAE, OWE, PMF, UPSK/MPSK, rogue vs external AP. |
| Design Numbers To Remember | Same as above | Refresher memory card | RSSI/SNR targets, retry/channel utilization thresholds, 24 Mbps minimum-rate concept, PoE classes, common roam latency targets. |
| Demo Proof Points | `src/content/copilot.ts` and Refresher data | Refresher and Demo Co-Pilot bridge | One issue path from symptom to root cause, Client Journey, MTTI, WIPS classification, AP onboarding tied to PoE/switch readiness. |

### Where Users See Refresher Improvements

- Academy sidebar: `Refresher`.
- Page title: Field Notes.
- Spec comparison: enhanced Wi-Fi generation and operational tradeoff table.
- Differentiator cards: more precise WIPS, Client Journey, and wired-wireless proof points.
- Study Mode: reveal/hide quick drills for pre-call practice.
- Optional future Databank visibility: mirror selected refresher cards into `src/content/cheatsheets.ts` if they should be searchable.

## Demo Co-Pilot Recommendations

Demo Co-Pilot should connect the course and Refresher surfaces to real customer-facing narratives.

| Placement | User sees it as |
|---|---|
| `src/content/copilot.ts` | Demo Co-Pilot tracks and steps. |
| `src/content/design-system/demo.ts` | Design-system demo suggestions and anti-pattern references. |
| Lesson links in `DemoCopilot` | Related learning buttons in the right-side context panel. |

Recommended content:

- Add scenario-specific tracks: high-density campus, life sciences/lab, VoWiFi troubleshooting, wired-wireless RCA, security/WIPS proof, and 6 GHz modernization.
- Keep each demo track focused on one proof path instead of a feature tour.
- Add stronger traps to avoid: leading with max PHY rates, doing live auth configuration, overclaiming Wi-Fi 7 benefits when WAN or client support is the bottleneck, and treating all rogue-looking SSIDs as containable threats.
- Add relevant concept links for each step so users can jump from a demo talking point back into Academy lessons.

## Implementation Priority

1. Add glossary and scenario expansions first. These improve search, Databank, assessments, and lesson comprehension with low implementation risk.
2. Improve Refresher data next. It has a clear app surface and high value for pre-call learning.
3. Expand Module 9 and Client Journey content to strengthen Airframe's operational and CV-CUE learning value.
4. Add troubleshooting methodology and wired-wireless handoff as capstone material.
5. Add deeper security, roaming, and channel policy lessons.
6. Add or revise Demo Co-Pilot tracks to align demos with the enhanced content.
7. Add new simulations only after lesson, lab, and scenario data are stable.

## Verification

Run focused checks after content or data edits:

```bash
npm run test:unit
npm run lint
```

Run a production build if lesson, lab, simulation, registry, or Refresher UI wiring changes:

```bash
npm run build
```

Manually inspect these app paths after implementation:

- Academy lesson flow for updated lessons and lab gates.
- Databank/search for glossary and cheatsheet discovery.
- Field assessments for new scenario groups.
- Refresher for comparison cards, quick drills, and Study Mode behavior.
- Demo Co-Pilot for track selection, related concept links, and exported scripts.
