import { test, expect } from '@playwright/test';

test('PHQ-9 Q9 >= 1 triggers crisis banner and suppresses ads', async ({ page }) => {
  await page.goto('/');
  for (let i = 0; i < 8; i++) {
    await page.locator(`input[name="q${i}"][value="0"]`).check();
  }
  await page.locator('input[name="q8"][value="2"]').check();
  await page.getByRole('button', { name: /see result/i }).click();

  await expect(page.getByRole('alert')).toContainText(/help is available now/i);
  await expect(page.locator('ins.adsbygoogle')).toHaveCount(0);
});
