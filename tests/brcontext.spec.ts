// Multiple pages with multiple applications parallely
//context - enable and disable cookies, add-ons


import{test,expect,Page, chromium, firefox, webkit} from "@playwright/test" ;

// Browser -> Context -> Multiple Pages 

// Browser - Chromiunm - chrome and edge, Firefox, Webkit - Mac
// Context - We can create mutiple context for multiple users/apps for the same browser.
// provide a way to operate multiple independent browser sessions.
// page - New tab, window or pop up

// need to pass browser or context or page in the async function.
// passing a page fixture ignoring browser and context
// browser is coming from config file and context is default 

// Creating page while passing context.

/* test("Browser Context Demo", async ({context}) => {

const page= await  context.newPage();  // browser will come from config file.

await page.goto("https://testautomationpractice.blogspot.com/");  // directly accessing the page

}) */

// Creating context while passing browser

// browser will be default from config file

/* test("Browser Context Demo", async ({browser}) => {

const context = await  browser.newContext();  // browser will come from config file.
const page= await  context.newPage();
await page.goto("https://testautomationpractice.blogspot.com/");  // directly accessing the page

}) */

// Creating browser - not passing any parameter

test("Browser Context Demo", async () => {

// const browser = await webkit.launch();
// const browser = await firefox.launch() ;
const browser = await chromium.launch();  // create own browser
const context = await  browser.newContext(); // create a new context

// creating 2 Pages
const page1= await  context.newPage();  
const page2 = await context.newPage() ;
console.log("Number of pages created:", context.pages().length);  // array of pages

await page1.goto("https://playwright.dev/");  
await expect(page1).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");

await page2.goto("https://www.selenium.dev");
await expect(page2).toHaveTitle("Selenium");

await page1.waitForTimeout(5000);
await page2.waitForTimeout(5000); 

})