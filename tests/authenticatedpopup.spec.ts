// Authenticated Pop-Ups

import{test,expect} from "@playwright/test" ;

test("Authenticated PopUps", async ({browser}) => {

// const context = await browser.newContext();

// await page.goto("https://the-internet.herokuapp.com/basic_auth");  // Website that needs authentication

const context = await browser.newContext({httpCredentials:{username:'admin', password:'admin'}});

const page = await context.newPage();

// http://username:password@the-internet.herokuapp.com/basic_auth


// Approcah 1 : Directly pass login information along with the url

/* await page.goto("http://admin:admin@the-internet.herokuapp.com/basic_auth"); 

await page.waitForLoadState();  // wait for page loaded completely

await expect(page.locator('text=Congratulations')).toBeVisible();
await page.waitForTimeout(5000); */

// Approach 2 : Pass the login along with browser context  - Recommended.


await page.goto("https://the-internet.herokuapp.com/basic_auth"); 

await page.waitForLoadState();  // wait for page loaded completely

await expect(page.locator('text=Congratulations')).toBeVisible();
await page.waitForTimeout(5000);


})