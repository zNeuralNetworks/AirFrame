import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { enterAcademy } from './helpers';

const checkA11y = async (pageName: string, page: Parameters<typeof AxeBuilder>[0]) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const seriousViolations = results.violations.filter((violation) =>
    violation.impact === 'serious' || violation.impact === 'critical'
  );

  test.expect(
    seriousViolations,
    `${pageName} has serious or critical accessibility violations`
  ).toEqual([]);
};

test('core pages have no serious or critical axe violations', async ({ page }) => {
  await enterAcademy(page);

  await checkA11y('dashboard', page);

  for (const label of ['Airframe Academy', 'Databank', 'Settings']) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await checkA11y(label, page);
  }
});

test('lesson briefing view has no serious or critical axe violations', async ({ page }) => {
  await enterAcademy(page);

  await page.getByRole('button', { name: 'Airframe Academy', exact: true }).click();

  // Open the first available lesson
  await page.getByRole('button', { name: /the decibel code/i }).first().click();

  // BriefingView is active by default
  await expect(page.getByRole('button', { name: /initialize lab/i })).toBeVisible();
  await checkA11y('LessonView/briefing', page);
});

test('Demo Co-Pilot view has no serious or critical axe violations', async ({ page }) => {
  await enterAcademy(page);

  await page.getByRole('button', { name: 'Demo Co-Pilot', exact: true }).click();
  await checkA11y('DemoCopilot', page);
});
