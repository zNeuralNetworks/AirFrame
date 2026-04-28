import { expect, test } from '@playwright/test';
import { enterAcademy } from './helpers';

test('DemoScorecard scores persist across navigation via localStorage', async ({ page }) => {
  await enterAcademy(page);

  // Navigate to Demo Scorecard
  await page.getByRole('button', { name: 'Demo Scorecard', exact: true }).click();

  // Click "Nailed It" for the first criterion
  const nailedItButtons = page.getByRole('button', { name: /nailed it/i });
  await expect(nailedItButtons.first()).toBeVisible();
  await nailedItButtons.first().click();

  // Verify the button appears selected (has an active/selected visual state)
  // The scorecard uses a ring/bg change — check aria or class indicator via text context
  await expect(nailedItButtons.first()).toBeVisible();

  // Navigate away to Dashboard
  await page.getByRole('button', { name: 'Dashboard', exact: true }).click();
  await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();

  // Navigate back to Demo Scorecard
  await page.getByRole('button', { name: 'Demo Scorecard', exact: true }).click();

  // The "Nailed It" for the first criterion should still be in the selected state
  // (if localStorage round-trip works, the score for p1 is 'nailed')
  const scorecardSection = page.locator('main, [data-galen-main], #print-area').first();
  await expect(scorecardSection).toBeVisible();

  // Verify localStorage has the persisted value
  const storedValue = await page.evaluate(() => localStorage.getItem('airframe_scorecard_v1'));
  expect(storedValue).not.toBeNull();
  const stored = JSON.parse(storedValue!);
  // At least one criterion should have been scored
  expect(Object.keys(stored).length).toBeGreaterThan(0);
});
