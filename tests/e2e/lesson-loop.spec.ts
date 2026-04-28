import { expect, test } from '@playwright/test';
import { enterAcademy } from './helpers';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const clickDbMove = async (page: import('@playwright/test').Page, label: string) => {
  await page.getByRole('button', { name: new RegExp(`^${escapeRegExp(label)}`) }).click();
};

test('briefing to lab to quiz completion persists progress', async ({ page }) => {
  await enterAcademy(page);
  await page.getByRole('button', { name: 'Airframe Academy', exact: true }).click();
  await page.keyboard.press('Home');
  await expect(page.getByRole('button', { name: /Module 1: The Physics/i })).toBeVisible();
  const firstLesson = page.getByRole('button', { name: /1\.1 The Decibel Code/i });
  await firstLesson.focus();
  await page.keyboard.press('Enter');

  await expect(page.getByRole('heading', { name: /The Decibel Code/i })).toBeVisible();
  await page.getByRole('button', { name: /Initialize Lab/i }).click();

  await expect(page.getByText(/RF Math Challenge/i)).toBeVisible();
  await expect(page.getByText('Lvl 1/4')).toBeVisible();

  await clickDbMove(page, '-3 dB');
  await expect(page.getByText('Lvl 2/4')).toBeVisible({ timeout: 3000 });

  await clickDbMove(page, '+10 dB');
  await clickDbMove(page, '+3 dB');
  await expect(page.getByText('Lvl 3/4')).toBeVisible({ timeout: 3000 });

  await clickDbMove(page, '-3 dB');
  await clickDbMove(page, '-3 dB');
  await expect(page.getByText('Lvl 4/4')).toBeVisible({ timeout: 3000 });

  await clickDbMove(page, '-3 dB');
  await clickDbMove(page, '-3 dB');

  const completeLab = page.getByRole('button', { name: /Complete Lab/i });
  await expect(completeLab).toBeEnabled({ timeout: 3000 });
  await completeLab.click();

  await expect(page.getByText(/Question 1 \/ 1/i)).toBeVisible();
  await page.getByRole('button', { name: /It is cut in half \(50%\)/i }).click();
  await page.getByRole('button', { name: /Submit Answer/i }).click();
  await expect(page.getByText(/Explanation/i)).toBeVisible();
  await page.getByRole('button', { name: /Finish/i }).click();

  await expect(page.getByRole('heading', { name: /Mission Accomplished/i })).toBeVisible();
  await page.getByRole('button', { name: /Return to Base/i }).click();
  await expect(page.getByRole('button', { name: /1\.1 The Decibel Code/i })).toContainText('Applied');

  await page.reload();
  await expect(page.getByRole('heading', { name: /wireless mastery/i })).toBeVisible();
  await page.getByRole('button', { name: /start training/i }).click();
  await page.getByRole('button', { name: 'Airframe Academy', exact: true }).click();
  await expect(page.getByRole('button', { name: /1\.1 The Decibel Code/i })).toContainText('Applied');
});
