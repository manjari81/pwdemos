// Tabs

import{test,expect,chromium} from "@playwright/test" ;

test("Handle Tabs", async () => {

const browser = await chromium.launch();  // create own browser
const context = await  browser.newContext(); // create a new context

// 
const parentPage= await  context.newPage();  
await parentPage.goto("https://testautomationpractice.blogspot.com/");

// we need to capture the event and execute parallely - capture event before or after the action wont work

/* context.waitForEvent('page'); // returning  a promise of the page. - pending, fulfilled, rejected
parentPage.locator("button:has-text('New Tab')").click() ; // opens new tab/page - before button is clicked, the  event needs to be captured just like alerts */

// page event

const [childPage] = await Promise.all([context.waitForEvent('page'), parentPage.locator("button:has-text('New Tab')").click()])  // takes array of promises - returns another promise once both promises are fulfilled


// Approach1: Switch between pages and get titles (using context)  - Multiple pages more then 2 pages - using context and index.

const pages = context.pages();  // returns the number of pages created - returns an array
console.log("Number of pages created", pages.length);

console.log("Title of the Parent page:", await  pages[0].title());
console.log("Title of the Child page:", await pages[1].title());


// Approach2 : Alternate  - Go with this one when only 2 pages 

console.log("Title of the Parent page:", await  parentPage.title());
await parentPage.waitForTimeout(5000);

console.log("Title of the Child page:", await childPage.title());
await childPage.waitForTimeout(5000);

})