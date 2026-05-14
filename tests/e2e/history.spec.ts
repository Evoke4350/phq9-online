import { test, expect } from '@playwright/test';

test('opt-in history persists across navigation', async ({ page }) => {
  await page.goto('/history');
  await page.getByLabel(/save my attempts/i).check();
  await page.goto('/');
  for (let i = 0; i < 9; i++) {
    await page.locator(`input[name="q${i}"][value="1"]`).check();
  }
  await page.getByRole('button', { name: /see result/i }).click();
  await page.goto('/history');
  await expect(page.getByRole('cell', { name: 'phq-9' })).toBeVisible();
});
