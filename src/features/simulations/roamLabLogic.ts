/**
 * Pure logic for the RoamLab simulation.
 * Extracted so it can be unit-tested without a React environment.
 */

/** RSSI experienced at AP-A from a client at `clientPos` (0–100). */
export const calcRssiA = (clientPos: number): number =>
  Math.round(-30 - clientPos * 0.6);

/** RSSI experienced at AP-B from a client at `clientPos` (0–100). */
export const calcRssiB = (clientPos: number): number =>
  Math.round(-30 - (100 - clientPos) * 0.6);

/**
 * Decide whether the client should roam.
 * Returns the new connected AP ('A' or 'B') based on roaming logic:
 * - Current AP's RSSI must fall below `threshold`
 * - The other AP must be at least 5 dBm stronger (hysteresis guard)
 */
export const shouldRoam = (
  ap: 'A' | 'B',
  rssiA: number,
  rssiB: number,
  threshold: number
): 'A' | 'B' => {
  if (ap === 'A' && rssiA < threshold && rssiB > rssiA + 5) return 'B';
  if (ap === 'B' && rssiB < threshold && rssiA > rssiB + 5) return 'A';
  return ap;
};
