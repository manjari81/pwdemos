// npx playwright codegen --output tests/codegentest.spec.ts --viewport-size "720,720" 
// npx playwright codegen --output tests/codegentest.spec.ts --viewport-size "1280,720"  - default

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 720,
    width: 720
  }
});

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
});