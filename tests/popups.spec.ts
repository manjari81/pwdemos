// Pop-Ups

import{test,expect} from "@playwright/test" ;

test("Handle PopUps", async ({browser}) => {

const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://testautomationpractice.blogspot.com/");

// Handle Multiple Pop-Ups - popup event

/* page.waitForEvent('popup');
await page.locator("#PopUp").click(); */

// popup event

await Promise.all([page.waitForEvent('popup'),await page.locator("#PopUp").click()]);

const allPopupWindows = context.pages();  // returns array of pages
console.log("Number of pages or pop up windows", allPopupWindows.length);  // 3 pages

console.log(allPopupWindows[0].url()); // parent page url - main page where action is performed
console.log(allPopupWindows[1].url());   // https://www.selenium.dev/
console.log(allPopupWindows[2].url());  // https://playwright.dev/

// close all the pop-up windows

for(const pw of allPopupWindows)
{

const title = await pw.title();

if (title.includes('Playwright'))
{
    await pw.locator('.getStarted_Sjon').click();
    await page.waitForTimeout(3000);
    //Perform any other actions
    await pw.close(); // this will close playwright pop window

}


}

await page.waitForTimeout(5000);
})