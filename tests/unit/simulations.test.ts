import { describe, expect, it } from 'vitest';
import { applyDb, isLevelComplete } from '../../src/features/simulations/dbGameLogic';
import { calcRssiA, calcRssiB, shouldRoam } from '../../src/features/simulations/roamLabLogic';

// ─── DbGame logic ──────────────────────────────────────────────────────────

describe('applyDb', () => {
  it('+3 dB doubles the power', () => {
    expect(applyDb(100, 3)).toBe(200);
    expect(applyDb(10, 3)).toBe(20);
  });

  it('-3 dB halves the power', () => {
    expect(applyDb(100, -3)).toBe(50);
    expect(applyDb(4, -3)).toBe(2);
  });

  it('+10 dB multiplies power by ten', () => {
    expect(applyDb(10, 10)).toBe(100);
    expect(applyDb(1, 10)).toBe(10);
  });

  it('-10 dB divides power by ten', () => {
    expect(applyDb(100, -10)).toBe(10);
    expect(applyDb(10, -10)).toBe(1);
  });

  it('chains correctly: 10 mW +10dB +3dB = 200 mW', () => {
    expect(applyDb(applyDb(10, 10), 3)).toBe(200);
  });

  it('chains correctly: 100 mW -3dB -3dB = 25 mW', () => {
    expect(applyDb(applyDb(100, -3), -3)).toBe(25);
  });

  it('leaves power unchanged for an unrecognised dB value', () => {
    expect(applyDb(50, 6)).toBe(50);
    expect(applyDb(50, 0)).toBe(50);
  });
});

describe('isLevelComplete', () => {
  it('returns true when within 0.1 mW tolerance', () => {
    expect(isLevelComplete(50, 50)).toBe(true);
    expect(isLevelComplete(50.09, 50)).toBe(true);
    expect(isLevelComplete(49.91, 50)).toBe(true);
  });

  it('returns false when outside tolerance', () => {
    expect(isLevelComplete(50.1, 50)).toBe(false);
    expect(isLevelComplete(49.9, 50)).toBe(false);
    expect(isLevelComplete(100, 50)).toBe(false);
  });
});

// ─── RoamLab logic ─────────────────────────────────────────────────────────

describe('calcRssiA', () => {
  it('returns -30 at position 0 (client right next to AP-A)', () => {
    expect(calcRssiA(0)).toBe(-30);
  });

  it('returns -90 at position 100 (client at the far end)', () => {
    expect(calcRssiA(100)).toBe(-90);
  });

  it('returns -60 at position 50 (midpoint)', () => {
    expect(calcRssiA(50)).toBe(-60);
  });
});

describe('calcRssiB', () => {
  it('returns -90 at position 0 (client far from AP-B)', () => {
    expect(calcRssiB(0)).toBe(-90);
  });

  it('returns -30 at position 100 (client right next to AP-B)', () => {
    expect(calcRssiB(100)).toBe(-30);
  });

  it('returns -60 at position 50 (midpoint — symmetric)', () => {
    expect(calcRssiB(50)).toBe(-60);
  });
});

describe('shouldRoam', () => {
  it('roams from A to B when A is weak and B is significantly stronger', () => {
    // clientPos ≈ 80: rssiA ≈ -78, rssiB ≈ -42
    const rssiA = calcRssiA(80); // -78
    const rssiB = calcRssiB(80); // -42
    expect(shouldRoam('A', rssiA, rssiB, -75)).toBe('B');
  });

  it('roams from B to A when B is weak and A is significantly stronger', () => {
    // clientPos ≈ 20: rssiA ≈ -42, rssiB ≈ -78
    const rssiA = calcRssiA(20); // -42
    const rssiB = calcRssiB(20); // -78
    expect(shouldRoam('B', rssiA, rssiB, -75)).toBe('A');
  });

  it('stays on A when A signal is above threshold (no need to roam)', () => {
    const rssiA = calcRssiA(10); // -36
    const rssiB = calcRssiB(10); // -84
    expect(shouldRoam('A', rssiA, rssiB, -75)).toBe('A');
  });

  it('suppresses roam when hysteresis margin is not met (< 5 dBm delta)', () => {
    // Both APs at similar strength — delta < 5 dBm, should not roam
    const rssiA = -80; // at threshold
    const rssiB = -78; // only 2 dBm better, not enough
    expect(shouldRoam('A', rssiA, rssiB, -80)).toBe('A');
  });

  it('at midpoint (pos 50), both APs are equal — no roam', () => {
    const rssiA = calcRssiA(50); // -60
    const rssiB = calcRssiB(50); // -60
    // rssiA is not < threshold (-75), so no roam trigger
    expect(shouldRoam('A', rssiA, rssiB, -75)).toBe('A');
  });
});
