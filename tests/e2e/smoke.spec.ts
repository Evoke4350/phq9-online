import { test, expect } from '@playwright/test';

test('home page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/PHQ-9/);
  await expect(page.locator('h1').first()).toBeVisible();
});
