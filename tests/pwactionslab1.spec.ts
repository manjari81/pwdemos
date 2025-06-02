/*  
Web URL: 
https://demo.wpeverest.com/user-registration/student-registration-form/ 
 
1. Input Box Validation: "FirstName" 
 
Tasks: 
• Check if the input box is displayed. 
• Check if the input box is enabled. 
• Validate if it's a mandatory field. 
• Verify the placeholder text. 
• Validate the maximum length of input allowed. 
• Enter a name in the input box. 
• Retrieve and print the text from the input box. 
 
2. Radio Button Validation: "Gender" 
 
Tasks: 
• Get the status of the "Male" radio button. 
• Select the "Male" radio button. 
• Retrieve and print the selected status of the "Male" radio button again. 
 
 
3. Checkbox Validation: "Hobbies" 
 
Tasks: 
• Select the checkbox for "Singing". 
• Capture all available hobbies and print the count. 
• Check all hobbies using a loop. 
• Uncheck all hobbies using a loop. 
• Check the last 2 hobbies using loop. 
• Check the first 3 hobbies using loop. 
• Check hobbies randomly using a loop. 
• Check hobbies based on values using a switch-case statement.  */

import{test,expect,Locator} from "@playwright/test"


// 1. Input Box Validation: "FirstName" 

test ('Input Box Validation: FirstName', async ({page}) => {

await page.goto("https://demo.wpeverest.com/user-registration/student-registration-form/") ;

const firstName:Locator = page.locator('#first_name');

// Check if the input box is displayed
await expect(firstName).toBeVisible();

// Check if the input box is enabled. 
await expect(firstName).toBeEnabled();

// Validate if it's a mandatory field. (have a 'required' attribute) 
const required = await firstName.getAttribute('required');
console.log('Is "First Name" mandatory:', required !== null);


// Verify the placeholder text. 
const placeHolder : string | null = await firstName.getAttribute("placeholder");
console.log("Placeholder text is :", placeHolder) ;


// Validate the maximum length of input allowed - city as no max length for name

/* const city:Locator = page.locator('#input_box_1623050696') ;
const maxLength :string | null = await city.getAttribute("maxlength") ; 
expect(maxLength).toBe("20") ; 
console.log("Maximum length of City is:", maxLength) ;  */

const maxLength : string | null = await firstName.getAttribute("maxLength");  // returns -- null
console.log("Maximum length of FirstName is:", maxLength) 

//Enter a name in the input box. 
await firstName.fill("Manjari Bindal");

//Retrieve and print the text from the input box. 
const FirstNameEntered:string = await firstName.inputValue();
expect(FirstNameEntered).toBe("Manjari Bindal") ; //verify
console.log("First name entered is: ", FirstNameEntered) ;

await page.waitForTimeout(3000);

})


// 2. Radio Button Validation: "Gender" 
 
test ('Radio Button Validation: Gender', async ({page}) => {


await page.goto("https://demo.wpeverest.com/user-registration/student-registration-form/") ;

/*     • Get the status of the "Male" radio button. 
    • Select the "Male" radio button. 
    • Retrieve and print the selected status of the "Male" radio button again.  */


const radioButtonMale : Locator = page.locator('#radio_1623051748_Male') ;

// Status of Radio Button
console.log("Is Male gender is selected:", await radioButtonMale.isChecked()) ; // return T /F

// Select the "Male" radio button.
await radioButtonMale.check();
await expect(radioButtonMale).toBeChecked();

// Retrieve and print the selected status of the "Male" radio button again.
console.log("Is Male gender is selected:", await radioButtonMale.isChecked()) ; 


await page.waitForTimeout(5000);

})


// 3. Checkbox Validation: "Hobbies"

test.only ('Checkbox Validation: "Hobbies"', async ({page}) => {


/* • Select the checkbox for "Singing". 
• Capture all available hobbies and print the count. 
• Check all hobbies using a loop. 
• Uncheck all hobbies using a loop. 
• Check the last 2 hobbies using loop. 
• Check the first 3 hobbies using loop. 
• Check hobbies randomly using a loop. 
• Check hobbies based on values using a switch-case statement.  */


    await page.goto("https://demo.wpeverest.com/user-registration/student-registration-form/") ;

    // 1. Select the checkbox for "Singing". 

    // const chkBoxSinging : Locator = page.getByLabel('Singing') ;
    // const chkBoxSinging : Locator = page.locator('#check_box_1623078065_Singing') ;
    // await chkBoxSinging.check(); // select
    // console.log("Is the singing checkbox checked", await chkBoxSinging.isChecked()); // verify

    //2. Capture all available hobbies and print the count. 

    const hobbies:string [] = ['Drawing', 'Singing', 'Dancing', 'Sketching' ] ;

    const chkhobbies:Locator[] = hobbies.map(index => page.getByLabel(index)) 
    console.log('Number of Hobbies:', chkhobbies.length); 

   /*  const hobbies:Locator = page.locator('div.ur-field-item.field-checkbox input[type="checkbox"]');// Returns multiple elements
    const count = await hobbies.count();
    console.log('Number of Hobbies:', count); */
    

    //3. Check all hobbies using a loop. 
    
   /*  for(const checkbox of chkhobbies)
        {
        await checkbox.check() ;  // select
        await expect(checkbox).toBeChecked() ;  // verify 
        }
 

      await page.waitForTimeout(3000); */
    
    //4. Uncheck all hobbies using a loop. 
    

    /* for(const checkbox of chkhobbies)
        {
        await checkbox.uncheck() ;  // select
        await expect(checkbox).not.toBeChecked() ;  // verify 
        }

    await page.waitForTimeout(5000); */
    
    //5. Check the last 2 hobbies using loop. 

    /* for(const checkbox of chkhobbies.slice(-2))
        {
        await checkbox.check() ;  // select
        await expect(checkbox).toBeChecked() ; 
        } */

    //6. Check the first 3 hobbies using loop. 

    /* for(const checkbox of chkhobbies.slice(3))
        {
        await checkbox.check() ;  // select
        await expect(checkbox).toBeChecked() ;  // verfiy
        } */

    //7. Check hobbies randomly using a loop. 
    /* const indexes:number[]= [1,3];

    for (const i of indexes)
     {

      await chkhobbies[i].check();
      await expect(chkhobbies[i]).toBeChecked() 

     } */
     
    //8. Check hobbies based on values using a switch-case statement.


    const hobbyValue:string = 'Dancing';

    switch (hobbyValue) {
      case 'Drawing':
        await page.locator('input[value="Drawing"]').check();
        break;
      case 'Singing':
        await page.locator('input[value="Singing"]').check();
        break;
      case 'Dancing':
        await page.locator('input[value="Dancing"]').check();
        break;
      case 'Sketching':
        await page.locator('input[value="Sketching"]').check();
        break;
      default:
        console.log('Hobby not found');
    }
    await page.waitForTimeout(3000);






    await page.waitForTimeout(5000);

    })