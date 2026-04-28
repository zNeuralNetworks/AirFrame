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
