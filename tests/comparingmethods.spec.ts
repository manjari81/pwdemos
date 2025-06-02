//Comparing Methods

import {test,expect,Locator} from "@playwright/test" ;

test("Comapre Methods", async ({page}) => {


    await page.goto("https://demowebshop.tricentis.com/");

    const products:Locator = page.locator('.product-title') ; // representing a group of elements. // 6 elements
    // products.nth(i) ;  - for loop - to read elements one by one.

    await page.waitForTimeout(3000);

   //1) innerText() vs textContent() - Single element

   // console.log(await products.nth(1).innerText()) ; // actual text of particular product using index.  // 14.1 inch laptop  - exact text without spaces or hidden content - visible text
   // console.log(await products.nth(1).textContent()) ;  // it will return the elements with spaces too  //        14.1-inch Laptop   - text  with spaces and hidden content
  
   const count = await products.count() ;

   for (let i=0; i<count; i++)

{  
   /*  const productName: string = await products.nth(i).innerText();
    console.log(productName); */

    /* const productName: string | null = await products.nth(i).textContent();
    console.log(productName); */

    const productName: string | null = await products.nth(i).textContent();  // remove spaces and hidden objects
    console.log(productName?.trim());   // ? is for options as it could be null or string
}

//2. allinnerText() and allTextContent()  - text from group of web elements.

console.log("Comparing allinnerText() vs allTextContent()");

/* const productNames: string [] = await  products.allInnerTexts();  // returns array 
console.log("Product Names captured by allInnerText() ", productNames);  */

/* const productNames: string [] = await  products.allTextContents();  // returns array 
console.log("Product Names captured by allInnerText() ", productNames) 

const ProductNamesTrimmed: string []  = productNames.map(text=>text.trim());  // returns array with trimmed value.
console.log("Product Names after trim", ProductNamesTrimmed);   */


//3. all() - converts locator into locator array - returns an array of locators.
// (stores locators of products)/converts locator to array of locators(for iteration)

const productsLocator:Locator [] = await products.all();  // array of locators of 6 elements
console.log(productsLocator);

// console.log(await productsLocator[1].innerText());

// for-of and for-in loop

for (let productloc of productsLocator)

{
    console.log(await productloc.innerText());
} 

/* for (let i in productsLocator)

    {
     console.log(await productsLocator[i].innerText());
    }
 */

})