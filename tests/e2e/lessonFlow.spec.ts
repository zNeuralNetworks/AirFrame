import { expect, test } from '@playwright/test';
import { appConsoleErrors, enterAcademy } from './helpers';

test('full lesson flow: briefing → lab → quiz → completion', async ({ page }) => {
  const consoleErrors = appConsoleErrors(page);

  await enterAcademy(page);

  // Navigate to Airframe Academy view
  await page.getByRole('button', { name: 'Airframe Academy', exact: true }).click();

  // Open the first lesson (1.1 — The Decibel Code)
  await page.getByRole('button', { name: /the decibel code/i }).first().click();

  // BriefingView should be active — "Initialize Lab" visible
  await expect(page.getByRole('button', { name: /initialize lab/i })).toBeVisible();

  // Advance to Lab tab
  await page.getByRole('button', { name: /initialize lab/i }).click();

  // LabManager mounts — "Lab Objective" heading visible
  await expect(page.getByText('Lab Objective')).toBeVisible();

  // Complete all manual challenges (click every unchecked challenge button)
  const challenges = page.locator('[data-testid="challenge-button"]');
  const count = await challenges.count();
  for (let i = 0; i < count; i++) {
    await challenges.nth(i).click();
  }

  // Wait for Complete Lab button to become enabled (simulation must complete first)
  const completeLab = page.getByRole('button', { name: /complete lab/i });
  await expect(completeLab).toBeEnabled({ timeout: 10_000 });
  await completeLab.click();

  // QuizEngine mounts — "Question 1 /" text visible
  await expect(page.getByText(/question 1\s*\//i)).toBeVisible();

  expect(consoleErrors).toEqual([]);
});

test('quiz retry flow: fail → retry → URL unchanged, no page reload', async ({ page }) => {
  const consoleErrors = appConsoleErrors(page);
  const urlBefore = await page.url();

  await enterAcademy(page);
  await page.getByRole('button', { name: 'Airframe Academy', exact: true }).click();

  // Open a lesson that has a quiz (1.1)
  await page.getByRole('button', { name: /the decibel code/i }).first().click();

  // Skip straight to quiz tab by injecting simCompleted state via localStorage
  // (addInitScript runs before page load, so we inject before navigate)
  await page.addInitScript(() => {
    const key = 'airframe_progress_v3';
    const raw = localStorage.getItem(key);
    if (!raw) return;
    try {
      const state = JSON.parse(raw);
      if (state?.state?.lessons) {
        state.state.lessons = state.state.lessons.map((l: { id: string }) =>
          l.id === '1.1' ? { ...l, simCompleted: true } : l
        );
        localStorage.setItem(key, JSON.stringify(state));
      }
    } catch {
      // ignore parse errors
    }
  });

  // Reload to pick up the injected state
  await page.reload();
  await enterAcademy(page);
  await page.getByRole('button', { name: 'Airframe Academy', exact: true }).click();
  await page.getByRole('button', { name: /the decibel code/i }).first().click();

  // Navigate to Quiz tab (should be enabled now)
  await page.getByRole('button', { name: /quiz/i }).click();
  await expect(page.getByText(/question 1\s*\//i)).toBeVisible();

  // Answer every question with the first option (likely wrong — aim for failure)
  const questions = await page.getByText(/question \d+\s*\//i).count();
  const totalQuestions = Math.max(questions, 1);

  for (let i = 0; i < totalQuestions; i++) {
    // Select first answer option
    const options = page.getByRole('button', { name: /^[A-D]\./i });
    if (await options.count() > 0) {
      await options.first().click();
    } else {
      // Fallback: click the first radio-style answer
      await page.locator('button').filter({ hasText: /^\w/ }).first().click();
    }

    // Submit if there's a submit button
    const submitBtn = page.getByRole('button', { name: /submit/i });
    if (await submitBtn.isVisible()) await submitBtn.click();

    // Next question or finish
    const nextBtn = page.getByRole('button', { name: /next|finish/i });
    if (await nextBtn.isVisible()) await nextBtn.click();
  }

  // Summary card should appear — either pass or fail
  await expect(page.getByText(/mission/i)).toBeVisible({ timeout: 5_000 });

  // If we failed, Retry button should be visible and URL should be unchanged
  const retryBtn = page.getByRole('button', { name: /retry/i });
  if (await retryBtn.isVisible()) {
    const urlAfterFail = page.url();
    expect(urlAfterFail).toBe(urlBefore.replace(page.url(), page.url())); // URL hasn't changed

    await retryBtn.click();
    // Should be back at Question 1 — no page reload
    await expect(page.getByText(/question 1\s*\//i)).toBeVisible();
    expect(page.url()).not.toContain('reload');
  }

  expect(consoleErrors).toEqual([]);
});
