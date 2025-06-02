// hard assertions
// soft assertions

/*By default, failed assertion will terminate test execution. 
Playwright also supports soft assertions 
failed soft assertions do not terminate test execution, but mark the test as failed. */

import{test,expect,Locator} from "@playwright/test"  ;

test("Hard and Soft Assertions", async ({page})=>{

   await page.goto("https://demowebshop.tricentis.com/") ;

   // Hard Assertions - if one assertion fails all subsequent assertions  fails.

   /* await expect(page).toHaveTitle("Demo Web Shop");
   // await expect(page).toHaveTitle("Demo Web Shop2");   // this will fail.
   await expect(page).toHaveURL("https://demowebshop.tricentis.com/");

   const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
   await expect(logo).toBeVisible();  */


   // Soft Assertions - test will execute even if one assertion fails.

   await expect.soft(page).toHaveTitle("Demo Web Shop2");
   await expect.soft(page).toHaveURL("https://demowebshop.tricentis.com/");

   const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
   await expect.soft(logo).toBeVisible();


   await page.waitForTimeout(5000); 
   
})