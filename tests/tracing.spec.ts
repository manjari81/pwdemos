// Tracing
/* 
3 ways to create trace file (.zip)
-------------------------------------------------
1. using playwright.config.ts
2. command 
   npx playwright test tracing.spec.ts --headed --trace on
3. code prgrammatically
context.tracing.start({screenshots:true, snapshots:true}) ;
context.tracing.stop({path:'trace.zip'});

To view trace file (3 ways)
--------------------------------------------------------------
1. From html file  -> click on trace.zip
2. Through command  -> npx playwright show-trace trace.zip
3. Through Utility -> https://trace.playwright.dev/ (drag and drop/ upload trace.zip file)

*/

import{test,expect} from "@playwright/test" ;

test ('Tracing Test', async ({ page,context }) => {

  // tracing for this test only.
  context.tracing.start(
    {
    screenshots:true, 
    snapshots:true}

  ) ;

  await page.goto('https://demoblaze.com/index.html');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').fill('test@123'); 
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
 
 
  context.tracing.stop({path:'trace.zip'});  // trace file created and stored under the project folder and it wont get attached to the html report.
 
});