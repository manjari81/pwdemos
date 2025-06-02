// Actions on Elements

import {test,expect, Locator} from "@playwright/test" ;

test ('Test Input Actions',  async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/") ;


   // 1. TextBox - Text Input / Input Box

   const  textBox: Locator  = page.locator('#name') ;

   // assertions on checkbox 

   await expect(textBox).toBeVisible();  // visibility of the element
   await expect(textBox).toBeEnabled() ;  // element is enabled or not
   
   const maxLength :string | null = await textBox.getAttribute("maxlength") ; // returns the value of max length attribute of the element.
   expect (maxLength).toBe("15") ;  // await is not required as we are expecting a value of the element and not the element itself.

  await textBox.fill("John Kennedy");

  // console.log("Test content of First Name: ", await textBox.textContent());  // returns empty.

  const enteredValue : string = await textBox.inputValue () ;
  console.log("Test content of First Name: ", enteredValue ) ;  // returns the input value of the element
  expect(enteredValue).toBe("John Kennedy");

  await page.waitForTimeout(3000);

});

//2. Radio Buttons - only one at a time

// only run this test then we can use - test.only 

test('Radio Button  Actions',  async ({page}) => {

await page.goto("https://testautomationpractice.blogspot.com/") ;


 const maleRadio:Locator = page.locator('#male') ; // Radio button - male
 await expect(maleRadio).toBeVisible() ;
 await expect(maleRadio).toBeEnabled() ;
 expect(await maleRadio.isChecked()).toBe(false) ;  // T or F - not an assertion method but just a method - intially false

await maleRadio.check() ; // select the radio button
// expect(await maleRadio.isChecked()).toBe(true) ;  // true
await expect(maleRadio).toBeChecked();  // preferable - direct assertion method for radio button 

await page.waitForTimeout(3000);

})

//3. Check Boxes - multiple 

// only run this test then we can use - test.only 

test.only ('Check Box  Actions',  async ({page}) => {

await page.goto("https://testautomationpractice.blogspot.com/") ;
    
//1. Select specific checkbox (Sunday) using getbyLabel and assert

const sundayCheckBox: Locator = page.getByLabel('Sunday');
// await sundayCheckBox.check();    // select 
// await expect(sundayCheckBox).toBeChecked() ;  // verify

//2. Capture all the checkboxes (days of the week) - for loop or array  - map method

const days:string[] =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  // storing labels in the string array

const checkBoxes:Locator[] = days.map(index => page.getByLabel(index)) ; // returning checkboxes of every label in the array
expect(checkBoxes.length).toBe(7) ;  //number

//3. Select all the checkboxes and assert each is checked.

/* for(const checkbox of checkBoxes)
{
await checkbox.check() ;  // select
await expect(checkbox).toBeChecked() ;  // verify 
} */

//4. Uncheck last three checkboxes and assert each is unchecked.  - slice
// slice method - start and ending index slice(0,3), slice(3) - first three elements, slice(-3) - last three elements from end


/* for(const checkbox of checkBoxes.slice(-3))
    {
    await checkbox.uncheck() ;  // select
    await expect(checkbox).not.toBeChecked() ;  // verify - for every assertion we can use not to verify negative assertion - unchecked.
    } */

    

//5. Toggle Checkboxes : If checked , uncheck and if unchecked, check , Assert state flipped.
// Check the chekboxes that are not selected and Uncheck the checkboxes that are seleceted.


/* for(const checkbox of checkBoxes)
    {

    if(await checkbox.isChecked())  // true
    {
    //applicable only if checked
    await checkbox.uncheck() ;  // select
    await expect(checkbox).not.toBeChecked() ;  // verify - for every assertion we can use not to verify negative assertion - unchecked.
    await page.waitForTimeout(3000);
    }

    else  // false
    {
    // applicable only if not checked.
    await checkbox.check() ;  // select
    await expect(checkbox).toBeChecked() ;  // verify 
    
    }
    
}
await page.waitForTimeout(3000); */

//6.Randomy select checkboxes - Select the checkboxes by index (1,3, 6) and assert

/* const indexes:number[]= [1,3,6];

for (const i of indexes)
{

await checkBoxes[i].check();   // select
await expect(checkBoxes[i]).toBeChecked()  //verfiy

}
await page.waitForTimeout(5000);  */

//7. Select the checkbox based on the Label -  Pass label and then select that checkbox only.

const weekName:string = "Friday" ;

for(const label of days)   // days array - reading the labels one by one
{

if(label.toLowerCase()===weekName.toLowerCase())  // just wanted everything in to lowercase and then compare - data type and value 

{
  const checkbox= page.getByLabel(label) ;  // getting the check box only
  checkbox.check() ;
  await expect(checkbox).toBeChecked();
}

}

await page.waitForTimeout(5000); 


}) ;