/**
 * Pure pass/fail and XP logic for QuizEngine.
 * Extracted so it can be unit-tested without a React environment.
 */

/** A quiz passes when the score is at least half the total questions. */
export const hasPassed = (score: number, total: number): boolean =>
  score >= total / 2;

/** XP is awarded only on a passing score. */
export const calcXpForScore = (
  score: number,
  total: number,
  xpReward: number
): number => (hasPassed(score, total) ? xpReward : 0);
