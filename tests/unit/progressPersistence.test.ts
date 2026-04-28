import { describe, expect, it } from 'vitest';
import { INITIAL_LESSONS } from '../../src/content/lessons';
import { MOCK_USER } from '../../src/content/user';
import { mergePersistedUserState, UserState } from '../../src/state/userStore';
import { GLOSSARY } from '../../src/content/glossary';

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
