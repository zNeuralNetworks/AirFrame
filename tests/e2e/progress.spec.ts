import { expect, test } from '@playwright/test';
import { enterAcademy } from './helpers';

test('saved progress survives page reload and remains visible in the learning flow', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'airframe_progress_v3',
      JSON.stringify({
        state: {
          currentUser: {
            id: 'e2e-user',
            uid: 'e2e-user',
            email: 'e2e@arista.com',
          },
          lessons: [
            { id: '1.1', completed: true, simCompleted: true, locked: false },
          ],
          user: {
            totalXp: 100,
            streakDays: 1,
            completedLessonIds: ['1.1'],
            level: 1,
            quizHistory: [
              { lessonId: '1.1', score: 1, maxScore: 1, date: '2026-04-27T12:00:00.000Z' },
            ],
            achievements: [],
            isApproved: true,
          },
        },
        version: 0,
      })
    );
  });

  await enterAcademy(page);
  await page.getByRole('button', { name: 'Airframe Academy', exact: true }).click();
  await expect(page.getByRole('button', { name: /1\.1 The Decibel Code/i })).toContainText('Applied');

  await page.reload();
  await expect(page.getByRole('heading', { name: /wireless mastery/i })).toBeVisible();
  await page.getByRole('button', { name: /start training/i }).click();
  await page.getByRole('button', { name: 'Airframe Academy', exact: true }).click();
  await expect(page.getByRole('button', { name: /1\.1 The Decibel Code/i })).toContainText('Applied');
});
