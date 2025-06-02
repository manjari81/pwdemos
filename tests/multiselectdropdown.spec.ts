// Multiselect Dropdown


import {test,expect, Locator} from "@playwright/test" ;

test ('Test Multi Select Dropdown',  async ({page}) => {

await page.goto("https://testautomationpractice.blogspot.com/") ;


//1) Select option from the dropdown

// await page.locator("#colors").selectOption(['Red', 'Blue', 'Green']) ;  // visible text in form of array
// await page.locator("#colors").selectOption(['red', 'green', 'white']); // using value attribute
// await page.locator("#colors").selectOption([{label:'Red'},{label:'Green'},{label:'Yellow'}]);  // using label
// await page.locator("#colors").selectOption([{index:0},{index:2},{index:4}]);

//2) Check/Count the number of options in the dropdown.
const dropdownOptions:Locator =  page.locator('#colors>option')  // returns all the options from the dropdown
await expect(dropdownOptions).toHaveCount(7);     // positive assertion

//3)Check an option is present in the dropdown - France, Japan - some text value we need to know in order to confirm

const optionText:string[] =(await dropdownOptions.allTextContents()).map(text=>text.trim());
console.log(optionText);

expect(optionText).toContain('Green') ; // passing a value - check if the array contains 'Green'

//4. Printing options from the dropdown - using for of loop

for(const options of optionText)
    {
        console.log(options);
    }



await page.waitForTimeout(5000);

})
