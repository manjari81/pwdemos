// Dropdown is sorted or not.

import {test,expect, Locator} from "@playwright/test" ;

test ('Verify dropdown is sorted or not',  async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/") ;

 const dropDownOptions:Locator = page.locator("#animals>option") ;  // sorted
// const dropDownOptions:Locator = page.locator("#colors>option")  // not sorted
// console.log(await dropDownOptions.allTextContents()) ;

const optionText:string[] = (await dropDownOptions.allTextContents()).map(text=>text.trim());

/* const originalList:string[]=optionText;
const sortedList:string[]=optionText.sort(); */

const originalList:string[]=[...optionText];  // spread operator ... this will not impact the original list . this will return different list, one sorted and another unsorted.
const sortedList:string[]=[...optionText.sort()];

console.log("Original List is:", originalList) ;  // original list is in sorted order only 
console.log("Sorted List is:", sortedList) ;    // sorted list and original list will return same.

expect(originalList).toEqual(sortedList) ;

await page.waitForTimeout(5000);

})
