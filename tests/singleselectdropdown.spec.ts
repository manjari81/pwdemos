// Static Dropdown - options are always same and will be seen in same order.
// Bootstrap dropdown - dynamic dropdown

import {test,expect, Locator} from "@playwright/test" ;

test ('Test Single Select Dropdown',  async ({page}) => {

await page.goto("https://testautomationpractice.blogspot.com/") ;

//1) Select option from the dropdown

// await page.locator('#country').selectOption('India') ; // by using visible text
// await page.locator('#country').selectOption({value:'uk'}) ;  // by using value attribute value of the option - value attribute should be present
// await page.locator('#country').selectOption({label:'Canada'}) ; // by using label attribute
// await page.locator('#country').selectOption({index:3});   // by using index - count index from 0  ( USA-0 , Canada-1, Germany-3)



//2) Check/Count the number of options in the dropdown.
const dropdownOptions:Locator =  page.locator('#country>option')  // returns all the options from the dropdown
// await expect(dropdownOptions).toHaveCount(5);   // negative assertion
await expect(dropdownOptions).toHaveCount(10);     // positive assertion

//3)Check an option is present in the dropdown - France, Japan - some text value we need to know in order to confirm

//const optionText:string[] = await dropdownOptions.allTextContents() ; // returns an array of all the textcontents 
// console.log(optionText);   // printing with special characters and blank spaces.


const optionText:string[] =(await dropdownOptions.allTextContents()).map(text=>text.trim());
console.log(optionText);

expect(optionText).toContain('Japan') ;   // passing a value - check if the array contains 'Japan'

//4. Printing options from the dropdown - using for of loop

for(const options of optionText)
{
    console.log(options);
}




await page.waitForTimeout(5000);
})