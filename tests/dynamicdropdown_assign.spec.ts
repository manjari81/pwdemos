// // ex. Myntra - Search Slippers

import {test,expect, Locator} from "@playwright/test" ;

test ("Test Myntra Search Dropdown",  async ({page}) => {

await page.goto("https://www.myntra.com/");

await page.waitForLoadState() ;

// await page.locator(".desktop-searchBar").fill("slipper");  // search text

// await page.locator(".desktop-searchBar").type("slipper ");  

await page.locator(".desktop-searchBar").pressSequentially("slipper "); 

await page.waitForTimeout(5000);  // we need to put the wait time in order to capture the suggested options

// get all the suggested options -- > cntr+shift+p on DOM - emulate focused page

const options:Locator = page.locator("ul>li[class='desktop-suggestion null']");
const count = await options.count() ;
console.log("Number of suggested options", count);   // 10

await page.waitForTimeout(3000);

// console.log(await options.allTextContents());

// printing all the suggested options in the console.

console.log("Printing all the auto suggestions.....")

   for(let i=0;i<count;i++)
   {
       //console.log(await options.nth(i).innerText());
       console.log(await options.nth(i).textContent());
   }
   

   //select/click 'Slippers Nike' on the  option

   for(let i=0;i<count;i++)
       {
          const text=await options.nth(i).innerText();
          if(text==='Slippers Nike')
          {
           options.nth(i).click();
           console.log("Element 'Slippers Nike' found")
           break;
          }
          
       }
await page.waitForTimeout(3000);

})