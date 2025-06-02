// Find Book in the webiste


import {test,expect} from "@playwright/test"

test('Infinte scrolling on Books', async ({ page }) => {

test.slow() ; // triples the default time 30sec(30000 ms) - 90000 ms

await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");  // filter by price

let previousHeight = 0 ;
let bookFound = false;

while(true)  // till we reaches footer element on that page - end condition is not known.
{

// Get all book titles currently loaded on the page
const titles:string [] = await page.locator('#productsDiv h3').allInnerTexts();


// titles.includes('The Blue Eye2) - not found

// Check if the target book is in the list
if(titles.includes('The Blue Eye'))
{
console.log("Book Found");
bookFound=true;
expect(bookFound).toBeTruthy();
break;
}

// scroll down the page
await page.evaluate( () =>{
    window.scrollTo(0,document.body.scrollHeight) ;
} )

// wait for new content to load
await page.waitForTimeout(2000);


// capture the current heigth of the page.
const currentHeight = await page.evaluate( () => {
return document.body.scrollHeight ; // current height of the page - scroll down the page stepwise

})

console.log("Prevous Height:", previousHeight);
console.log("Current Height:", currentHeight);

if(currentHeight === previousHeight)
{
    break;
}

previousHeight=currentHeight;

}

console.log("Reached end of the page.....");

// bookFound will be false if book is not found.

if(!bookFound)  // condition should be true in order the loop to execute.
{
    console.log("Book Not Found") ; 
}

})