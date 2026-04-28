import { expect, test } from '@playwright/test';
import { appConsoleErrors, enterAcademy, expectVisibleContent } from './helpers';

test('Airframe loads and every primary view renders visible content', async ({ page }) => {
  const consoleErrors = appConsoleErrors(page);

  await enterAcademy(page);
  await expectVisibleContent(page);

  for (const label of [
    'Airframe Academy',
    'Databank',
    'Refresher',
    'Demo Co-Pilot',
    'Demo Scorecard',
    'Settings',
    'CMS',
    'Dashboard',
  ]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await expectVisibleContent(page);
  }

  expect(consoleErrors).toEqual([]);
});
