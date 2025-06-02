// xpath locators

import{test,expect,Locator} from "@playwright/test" ;

test("Xpath demo in Playwright", async ({page})=> {

await page.goto("https://demowebshop.tricentis.com/");

//1. Absolute X-Path

// const absolutelogo:Locator = page.locator("xpath=/html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
const absolutelogo:Locator = page.locator("//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");  //  - pw identifies // as xpath
await expect(absolutelogo).toBeVisible();

//2. Relative X-Path
const relativelogo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
await expect(relativelogo).toBeVisible();

//3. Contains() function
// syntax - //*[contains(@class,'btn')]

const products:Locator = page.locator("//h2//a[contains(@href,'computer')]");  // returning locator
const productsCount:number = await products.count(); // number with promise

console.log("Number of computer related products:", productsCount);
expect(productsCount).toBeGreaterThan(0);

// First product  - text content - it will extract the text value of the elements just like getText() in selenium

// console.log(await products.textContent());  
// error - strict mode violation - 4 elements are matching // error : strict mode violation - it works on 1 single element

/* 
console.log("This is my first computer related product:", await products.first().textContent());
console.log("This is my last computer related product:", await products.last().textContent());
console.log("This is my Nth computer related product:", await products.nth(2).textContent());  //nth value (index) starts from 0 

*/

let productTitles:string[] = await products.allTextContents();

console.log("All computer related product titles:", productTitles);  // print in array format

for(let pt of productTitles)
{
 console.log(pt);
}


//4. starts-with() function
// syntax - //*[starts-with(@id,'user')]

const buildingProducts:Locator = page.locator("//h2//a[starts-with(@href,'/build')]"); // returns multiple elements
const count:number = await buildingProducts.count();
expect(count).toBeGreaterThan(0);

//5. text () Function
// syntax - //*[text()='Login'] 

const regLink: Locator = page.locator("//a[text()='Register']");
await expect(regLink).toBeVisible();

//6. last() Function - last element in matching list

const lastItem:Locator = page.locator("//div[@class='column follow-us']//li[last()]");
await expect(lastItem).toBeVisible();
console.log("Text content of last element:", await lastItem.textContent());

//7. position()

const positionItem:Locator = page.locator("//div[@class='column follow-us']//li[position()=3]");
await expect(positionItem).toBeVisible();
console.log("Element at 3rd posiition:", await positionItem.textContent());


})