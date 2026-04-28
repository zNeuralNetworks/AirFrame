import { expect, Page } from '@playwright/test';

export const appConsoleErrors = (page: Page) => {
  const messages: string[] = [];

  page.on('console', (message) => {
    if (message.type() !== 'error') return;

    const text = message.text();
    if (/favicon|ResizeObserver loop/i.test(text)) return;
    messages.push(text);
  });

  page.on('pageerror', (error) => {
    messages.push(error.message);
  });

  return messages;
};

export const enterAcademy = async (page: Page) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /wireless mastery/i })).toBeVisible();
  await page.getByRole('button', { name: /start training/i }).click();
  await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
};

export const expectVisibleContent = async (page: Page) => {
  const printArea = page.locator('#print-area');
  await expect(printArea).toBeVisible();
  await expect(printArea).not.toBeEmpty();
};
