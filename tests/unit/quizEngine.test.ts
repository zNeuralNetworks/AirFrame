import { describe, expect, it } from 'vitest';
import { hasPassed, calcXpForScore } from '../../src/features/curriculum/quizLogic';

describe('hasPassed', () => {
  it('passes at exactly 50% (half correct)', () => {
    expect(hasPassed(2, 4)).toBe(true);
    expect(hasPassed(3, 6)).toBe(true);
  });

  it('passes at 100%', () => {
    expect(hasPassed(5, 5)).toBe(true);
    expect(hasPassed(1, 1)).toBe(true);
  });

  it('fails below 50%', () => {
    expect(hasPassed(1, 4)).toBe(false);
    expect(hasPassed(0, 3)).toBe(false);
  });

  it('fails at 0%', () => {
    expect(hasPassed(0, 5)).toBe(false);
  });
});

describe('calcXpForScore', () => {
  it('awards full XP on a passing score', () => {
    expect(calcXpForScore(3, 4, 100)).toBe(100);
    expect(calcXpForScore(5, 5, 50)).toBe(50);
  });

  it('awards XP at exactly 50%', () => {
    expect(calcXpForScore(2, 4, 75)).toBe(75);
  });

  it('awards 0 XP on a failing score', () => {
    expect(calcXpForScore(1, 4, 100)).toBe(0);
    expect(calcXpForScore(0, 5, 200)).toBe(0);
  });
});
