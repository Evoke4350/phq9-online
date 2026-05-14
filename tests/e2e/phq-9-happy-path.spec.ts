import { test, expect } from '@playwright/test';

test('PHQ-9 happy path: answer all 9 → see result', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('PHQ-9');
  for (let i = 0; i < 9; i++) {
    await page.locator(`input[name="q${i}"][value="1"]`).check();
  }
  await page.getByRole('button', { name: /see result/i }).click();
  await expect(page.locator('#result-heading')).toBeVisible();
  await expect(page.locator('#result-heading')).toContainText('9');
});
