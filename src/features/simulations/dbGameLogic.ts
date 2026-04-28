/**
 * Pure logic for the DbGame simulation.
 * Extracted so it can be unit-tested without a React environment.
 */

/**
 * Apply a dB step to a milliwatt value using the Rule of 3s and 10s.
 * Accepts only ±3 or ±10 dB — any other value returns mw unchanged.
 */
export const applyDb = (mw: number, db: number): number => {
  if (db === 3) return mw * 2;
  if (db === -3) return mw / 2;
  if (db === 10) return mw * 10;
  if (db === -10) return mw / 10;
  return mw;
};

/**
 * Check whether the current power is within the success tolerance of the target.
 */
export const isLevelComplete = (currentMw: number, targetMw: number): boolean =>
  Math.abs(currentMw - targetMw) < 0.1;
