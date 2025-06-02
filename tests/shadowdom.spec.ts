// Shadow Dom - using CSS Selectors and builtin locators

/*
All locators in Playwright by default work with elements in Shadow DOM. 
The exceptions are:
Locating by XPath does not pierce shadow roots.
*/

import{test,expect} from "@playwright/test"

test( "Shadow Dom ", async ({page})=>{

 await page.goto("https://books-pwakit.appspot.com/") ;  

 await page.locator('#input').fill("Playwright Automation");

 await page.keyboard.press("Enter");

await page.waitForTimeout(5000);

const booksFound = await page.locator('h2.title').all();
console.log("Books Found", booksFound.length);
expect(booksFound.length).toBe(20);

await page.waitForTimeout(5000);

})


test.only("Shadow Dom 2 ", async ({page})=>{

await page.goto("https://shop.polymer-project.org/") ;  

await page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]").click();    /* backsplash to use single quotes inside quotes */

await page.waitForTimeout(5000);

const productsFound = await page.locator('div.title').all();

console.log("Number of products found:", productsFound.length);

expect(productsFound.length).toBe(16);

await page.waitForTimeout(5000);

})


