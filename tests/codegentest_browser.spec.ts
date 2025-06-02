// npx playwright codegen --output tests/codegentest.spec.ts --browser firefox

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('#nava')).toMatchAriaSnapshot(`
    - link "PRODUCT STORE":
      - /url: index.html
      - img
    `);
  await page.getByRole('link', { name: 'Log out' }).click();
});