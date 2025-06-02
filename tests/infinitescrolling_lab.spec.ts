// Assignment 2: Find Total Number of Books available on the Scrolling Page. 
// https://www.booksbykilo.in/new-books?pricerange=201to500

// Infinite Scrolling

import {test,expect} from "@playwright/test"

test('Total number of books on booksbykilo.in', async ({ page }) => {

await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");  // filter by price

test.slow() ;

let previousHeight = 0 ;
let numBooks = 0;

while(true)  // till we reaches footer element on that page - end condition is not known.
{

const books = page.locator('#divItemCard')  // 110 elements
numBooks = await books.count() ;
console.log("Number of books at each iteration", numBooks);

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
console.log("Total number of books at the end:", numBooks) ;



})