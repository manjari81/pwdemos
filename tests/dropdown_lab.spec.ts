 /* Assignment 
 
Verify Product Sorting and Information Retrieval 
1. Navigate to the Webpage: 
o Open the URL https://www.bstackdemo.com/    

2. Interact with the "Order by" Dropdown: 
o Locate the "Order by" dropdown element.  
o Verify the dropdown is displayed and enabled. 
o Select the option "Lowest to highest" from the dropdown. 

3. Retrieve and Print Product Information: 
o Retrieve the list of product price elements. 
o Retrieve the list of product name elements. 
o Verify Product names and their prices count are equal. 
o Print each product name along with its corresponding price in the console. 

4. Identify and Print the Lowest Priced Product: 
o Access the first element of the product prices list and the first element of the 
product names list. 
o Print the lowest priced product name and its price in the console. 

5. Identify and Print the Highest Priced Product: 
o Access the last element of the product prices list and the last element of the 
product names list. 
o Print the highest priced product name and its price in the console.  */

import {test,expect,Locator} from "@playwright/test" ;

test("Verify Product Sorting and Information Retrieval", async ({page}) => {

// 1. Navigate to the Webpage

await page.goto("https://www.bstackdemo.com/") ;

await page.waitForTimeout(5000);

// Verify image on page.
const image:Locator = page.locator("//a[@class='Navbar_logo__26S5Y']//*[name()='svg']");
await expect(image).toBeVisible();

//2. Interact with the "Order by" Dropdown:

// Locate the "Order by" dropdown element.  
const DropDown:Locator = page.locator(".sort select");

// Verify the dropdown is displayed and enabled. 
await expect(DropDown).toBeVisible() ;
await expect(DropDown).toBeEnabled () ;

// Select the option "Lowest to highest" from the dropdown. 

const dropdownOptions:Locator = page.locator(".sort select");
// await dropdownOptions.selectOption('Lowest to highest');
await dropdownOptions.selectOption({label:'Lowest to highest'});
// await dropdownOptions.selectOption({value:'lowestprice'});
// await dropdownOptions.selectOption({index:1});

await page.waitForTimeout(3000);

// 3. Retrieve and Print Product Information:

// Retrieve the list of product price elements. 
// Retrieve the list of product name elements. 
// Verify Product names and their prices count are equal. 
// Print each product name along with its corresponding price in the console. 

// Retrieve the list of product price elements. 
const productPrice:Locator = page.locator(".shelf-item__price");
const productPriceText:string [] = await productPrice.allTextContents();
console.log(productPriceText);
const a:number = productPriceText.length ;
console.log("Product Price count: ", a);

// Retrieve the list of product name elements. 
const productElementName:Locator = page.locator(".shelf-item__title");
const productName:string [] = await productElementName.allTextContents();
console.log(productName);
const b:number = productName.length;
console.log("Product Name count: ", b);

// Verify Product names and their prices count are equal. 

if (a===b)
console.log("Product names and their prices count are equal. ")
else
console.log("Product names and their prices count are not equal. ")


// 4. Identify and Print the Lowest Priced Product: 

// Access the first element of the product prices list and the first element of the product names list. 
// Print the lowest priced product name and its price in the console. 

console.log("Lowest priced element with price is:", productName[0] , productPriceText[0] );

// 5. Identify and Print the Highest Priced Product: 

// Access the last element of the product prices list and the last element of the product names list. 
// Print the highest priced product name and its price in the console.

console.log("Highest priced element with price is:", productName[a-1] , productPriceText[b-1] );

await page.waitForTimeout(3000);
})
 
 





