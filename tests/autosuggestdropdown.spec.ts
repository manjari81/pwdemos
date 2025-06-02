// ex. Flipkart - search mobiles

import {test,expect, Locator} from "@playwright/test" ;

test ("Test Auto-Suggest Dropdown",  async ({page}) => {

await page.goto("https://www.flipkart.com/");

await page.locator("input[name='q']").fill("smart");  // search text

await page.waitForTimeout(5000);  // we need to put the wait time in order to capture the suggested options

// get all the suggested options -- > cntr+shift+p on DOM - emulate focused page

const options:Locator = page.locator("ul>li");
const count = await options.count() ;
console.log("Number of suggested options", count);   // 8

await page.waitForTimeout(3000);

console.log(await options.allTextContents());

// console.log("5th options is:", await options.nth(5).innerText())  ;  // return text of that particular element

// printing all the suggested options in the console.

console.log("Printing all the auto suggestions.....")

   for(let i=0;i<count;i++)
   {
       //console.log(await options.nth(i).innerText());
       console.log(await options.nth(i).textContent());
   }
   

   //select/click on the smartphone option

   for(let i=0;i<count;i++)
       {
          const text=await options.nth(i).innerText();
          if(text==='smartphone')
          {
           options.nth(i).click();
           break;
          }
          
       }
await page.waitForTimeout(3000);

})