// Dropdown has duplicates

import {test,expect, Locator} from "@playwright/test" ;

test ('Verify dropdown contains duplicates',  async ({page}) => {

await page.goto("https://testautomationpractice.blogspot.com/") ;

// const dropDownOptions:Locator = page.locator("#animals>option") ;  // not having duplicates
const dropDownOptions:Locator = page.locator("#colors>option")  // having duplicates


const optionText:string[] = (await dropDownOptions.allTextContents()).map(text=>text.trim());

const myset=new Set<string>(); // set  of string type - duplicates not allowed
const duplicates:string[] = [] ;  // array - duplicates are allowed


for (const text of optionText)
{
  if(myset.has(text))  // true or false - true - we need to add duplicate element to the duplicate array
{
  duplicates.push(text);
}
  else
{
  myset.add(text);  // add method 
}
}

console.log("Original dropdown is:", optionText);
console.log("Duplicates options in dropdown are: ====>", duplicates);
console.log("Set array with no duplicates : ====>", myset);

// expect(duplicates.length).toBe(0);

if(duplicates.length>0)
{
    console.log("Duplicates option found:", duplicates);

}
else
{
    console.log("No Duplicate options found:", duplicates);
}

await page.waitForTimeout(5000);

})
