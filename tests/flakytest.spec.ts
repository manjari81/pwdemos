/* 
flaky test - passed sometimes and fails sometimes
1.passed - no retry - retieve - rerun the test 
2.failed - yes retry  - failed - issue with code
3.failed - passed - failed - flaky test 
rerun multiple times - if 8/10 passed

rerun the test auotmatically multiple times if it got failed without manual intervention.

*/
//  retries: 3,   configuartion done in config file

import{test,expect} from "@playwright/test" ;

test ('Flaky Test', async ({ page }) => {

  await page.goto('https://demoblaze.com/index.html');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').fill('test@123'); 
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(10000);
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');

 
});