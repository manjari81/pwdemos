// Infinite Scrolling

import {test,expect} from "@playwright/test"

test('Infinte scrolling on booksbykilo.in', async ({ page }) => {

await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");  // filter by price

test.slow() ; // triples the default time 30sec(30000 ms) - 90000 ms
 
//test.setTimeout(80000); // 8 secs //Set timeout for a single test

// execute javascript statement in typescript code. - page.evaluate() - inside arrow function execute the statement.

//window.scrollTo(0,document.body.scrollHeight)  - // 0 to end of the page- - directly goes to the footer element.

let previousHeight = 0 ;

while(true)  // till we reaches footer element on that page - end condition is not known.
{

// scroll down the page
await page.evaluate( () =>{
    window.scrollTo(0,document.body.scrollHeight) ;
} )

// await page.keyboard.press('End'); // This will also scroll to the bottom

// wait for new content to load
await page.waitForTimeout(2000);


// capture the current heigth of the page - Get current scroll height
const currentHeight = await page.evaluate( () => {
return document.body.scrollHeight ; // current height of the page - scroll down the page stepwise

})

console.log("Previous Height:", previousHeight);
console.log("Current Height:", currentHeight);

if(currentHeight === previousHeight)
{
    break;
}

previousHeight=currentHeight;

}

console.log("Reached end of the page.....");

})