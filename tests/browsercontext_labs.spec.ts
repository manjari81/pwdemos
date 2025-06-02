// Tabs for Orange HRM

import{test,expect,chromium} from "@playwright/test" ;

test("Handle Tabs for OrangeHRM", async () => {

const browser = await chromium.launch(); 
const context = await  browser.newContext(); 
const parentPage= await  context.newPage();  
await parentPage.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

// page event

const [childPage] = await Promise.all([context.waitForEvent('page'), parentPage.locator("a[href='http://www.orangehrm.com']").click()]) ;


// Approach2 : Alternate - 2 pages interaction

console.log("Title of the Parent page:", await  parentPage.title());
await parentPage.waitForTimeout(3000);

await parentPage.locator("[name='username']").fill("Admin");
await parentPage.locator("[name='password']").fill("admin123");
await parentPage.locator(".oxd-button").click();
await parentPage.waitForTimeout(2000);
await parentPage.getByAltText("client brand banner").isVisible();
await parentPage.waitForTimeout(5000);



console.log("Title of the Child page:", await childPage.title());
await childPage.waitForTimeout(2000);

await childPage.getByRole('button', {name: 'Contact Sales'}).click();
await childPage.waitForTimeout(5000);
await expect(childPage).toHaveTitle('Get in Touch with OrangeHRM Sales | OrangeHRM HR Software '); 

})
