import { describe, expect, it } from 'vitest';
import { INITIAL_LESSONS } from '../../src/content/lessons';
import { MOCK_USER } from '../../src/content/user';
import { mergePersistedUserState, mergeProgress, UserState } from '../../src/state/userStore';
import { GLOSSARY } from '../../src/content/glossary';
import type { UserProgress } from '../../src/types';

const currentState = (): UserState => ({
  lessons: INITIAL_LESSONS,
  glossary: GLOSSARY,
  user: {
    ...MOCK_USER,
    completedLessonIds: [],
    quizHistory: [],
    achievements: [],
  },
  isLoading: false,
  isAuthReady: false,
  currentUser: null,
  actions: {} as UserState['actions'],
});

describe('progress persistence merge', () => {
  it('preserves completed lessons, simulation completion, and saved user progress', () => {
    const merged = mergePersistedUserState(
      {
        currentUser: {
          id: 'learner-1',
          uid: 'learner-1',
          email: 'learner@arista.com',
        },
        lessons: [
          { id: '1.1', completed: true, simCompleted: true, locked: false },
          { id: '1.assessment', completed: false, simCompleted: false, locked: false },
        ],
        user: {
          totalXp: 250,
          streakDays: 3,
          completedLessonIds: ['1.1'],
          level: 2,
          quizHistory: [
            { lessonId: '1.1', score: 1, maxScore: 1, date: '2026-04-27T12:00:00.000Z' },
          ],
          achievements: [
            {
              id: 'first-quiz',
              title: 'First Steps',
              description: 'Completed your first quiz!',
              icon: 'Trophy',
              dateEarned: '2026-04-27T12:00:00.000Z',
            },
          ],
          isApproved: true,
        },
      },
      currentState()
    );

    expect(merged.currentUser?.email).toBe('learner@arista.com');
    expect(merged.user.totalXp).toBe(250);
    expect(merged.user.completedLessonIds).toEqual(['1.1']);
    expect(merged.user.quizHistory).toHaveLength(1);
    expect(merged.user.achievements).toHaveLength(1);
    expect(merged.user.isApproved).toBe(true);

    expect(merged.lessons.find((lesson) => lesson.id === '1.1')).toMatchObject({
      completed: true,
      simCompleted: true,
      locked: false,
    });
    expect(merged.lessons.find((lesson) => lesson.id === '1.assessment')).toMatchObject({
      completed: false,
      locked: false,
    });
  });

  it('does not let persisted locks override source lessons that are intentionally unlocked', () => {
    const merged = mergePersistedUserState(
      {
        lessons: [
          { id: '1.1', completed: false, simCompleted: false, locked: true },
        ],
      },
      currentState()
    );

    expect(merged.lessons.find((lesson) => lesson.id === '1.1')?.locked).toBe(false);
  });
});

// ─── mergeProgress (Firebase sync direction) ───────────────────────────────

const baseProgress = (): UserProgress => ({
  ...MOCK_USER,
  totalXp: 100,
  level: 1,
  streakDays: 2,
  completedLessonIds: ['1.1'],
  quizHistory: [{ lessonId: '1.1', score: 3, maxScore: 4, date: '2026-01-01T00:00:00.000Z' }],
  achievements: [{ id: 'first-quiz', title: 'First Steps', description: 'desc', icon: 'Trophy', dateEarned: '2026-01-01T00:00:00.000Z' }],
  isApproved: false,
});

describe('mergeProgress', () => {
  it('remote XP wins when higher', () => {
    const result = mergeProgress(baseProgress(), { totalXp: 500 });
    expect(result.totalXp).toBe(500);
  });

  it('local XP wins when remote is lower', () => {
    const result = mergeProgress(baseProgress(), { totalXp: 50 });
    expect(result.totalXp).toBe(100);
  });

  it('unions completedLessonIds with no duplicates', () => {
    const result = mergeProgress(baseProgress(), { completedLessonIds: ['1.2', '1.1'] });
    expect(result.completedLessonIds).toHaveLength(2);
    expect(result.completedLessonIds).toContain('1.1');
    expect(result.completedLessonIds).toContain('1.2');
  });

  it('deduplicates achievements by id', () => {
    const extraAchievement = { id: 'streak-3', title: 'On a Roll', description: 'desc', icon: 'Flame', dateEarned: '2026-01-02T00:00:00.000Z' };
    const result = mergeProgress(baseProgress(), {
      achievements: [
        { id: 'first-quiz', title: 'First Steps', description: 'desc', icon: 'Trophy', dateEarned: '2026-01-01T00:00:00.000Z' },
        extraAchievement,
      ],
    });
    expect(result.achievements).toHaveLength(2);
    expect(result.achievements.map(a => a.id)).toContain('streak-3');
  });

  it('deduplicates quizHistory by composite key', () => {
    const duplicate = { lessonId: '1.1', score: 3, maxScore: 4, date: '2026-01-01T00:00:00.000Z' };
    const result = mergeProgress(baseProgress(), { quizHistory: [duplicate] });
    expect(result.quizHistory).toHaveLength(1);
  });

  it('isApproved is true if either local or remote is true', () => {
    expect(mergeProgress(baseProgress(), { isApproved: true }).isApproved).toBe(true);
    const approved = { ...baseProgress(), isApproved: true };
    expect(mergeProgress(approved, { isApproved: false }).isApproved).toBe(true);
  });

  it('returns local unchanged when remote is null', () => {
    const local = baseProgress();
    const result = mergeProgress(local, null);
    expect(result).toEqual(local);
  });

  it('returns local unchanged when remote is undefined', () => {
    const local = baseProgress();
    const result = mergeProgress(local, undefined);
    expect(result).toEqual(local);
  });
});
