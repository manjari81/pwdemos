// Screenshot

import{test,expect} from "@playwright/test" ;

test("Screenshots Demo", async ({page}) => {

await page.goto("https://demowebshop.tricentis.com/");

const timestamp = Date.now();

//page screenshot visible on the browser.
// await page.screenshot({path:'screeenshots/'+'homepage'+timestamp+'.png'});  // creates screenshot and save with date and timestamps.

//full page screenshot until footer even though the page is not visible completely.
// await page.screenshot({path:'screeenshots/'+'fullpage'+timestamp+'.png',fullPage:true}); 

// screenshot of particular element (logo element)
/* const logo =page.locator("img[alt='Tricentis Demo Web Shop']") ;
logo.screenshot({path:'screeenshots/'+'logo'+timestamp+'.png'}); */

// await page.locator("img[alt='Tricentis Demo Web Shop']").screenshot({path:'screeenshots/'+'logo'+timestamp+'.png'});


// screenshot for particular area on the page.
// await page.locator('.product-grid.home-page-product-grid').screenshot({path:'screeenshots/'+'featuredproduct'+timestamp+'.png'});

});

// global setting will attach the screenshot to the report.

test.only ('Screenshots from config', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavanol');
  // await page.locator('#loginpassword').fill('test@123'); 
  await page.locator('#loginpassword').fill('test@123X');  // incorrect password for failed screenshot.
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
 
});


