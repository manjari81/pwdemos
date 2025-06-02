// Parameterization 
// Testing with user defined test data in form of array.


import{test,expect} from "@playwright/test" ;


// test data

const searchItems:string[] = ['laptop', 'Gift Card', 'smartphone', 'monitor'] ;

// using for-of-loop

/* for (const items of searchItems)
{
console.log(items);

test(`Search Test ${items}`, async ({page}) => {
await page.goto('https://demowebshop.tricentis.com/');
await page.locator('#small-searchterms').fill(items);  // fill the text in the search box.
await page.locator("input[value='Search']").click(); // click on button
await expect.soft(page.locator('h2 a').nth(0)).toContainText(items, { ignoreCase: true });  //  check if results appear
}) ;
}
 */

// using forEach function - using array

/* searchItems.forEach((items) => {

console.log(items);

test(`Search Test ${items}`, async ({page}) => {
await page.goto('https://demowebshop.tricentis.com/');
await page.locator('#small-searchterms').fill(items);
await page.locator("input[value='Search']").click();
await expect.soft(page.locator('h2 a').nth(0)).toContainText(items, { ignoreCase: true });  
})
});
 */

// describe - multiple test - 4 are run for each item 

test.describe("Searching Items", async () => {

searchItems.forEach((items) => {

test(`Search Test ${items}`, async ({page}) => {
await page.goto('https://demowebshop.tricentis.com/');
await page.locator('#small-searchterms').fill(items);
await page.locator("input[value='Search']").click();
await expect.soft(page.locator('h2 a').nth(0)).toContainText(items, { ignoreCase: true });  

})

})

})
