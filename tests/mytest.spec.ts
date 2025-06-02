//  test and expect are inbuilt functions in playwright.
// These needs to be imported for all the tests

// test - create test
// expect - validate 

import {test,expect} from "@playwright/test" ;
import {console} from "inspector";

// Syntax:
/* 
test("Title",() => {

//Step1
//Step2
//Step3

})
 */

// fixture - global variable  - accessible through out the project.
// pages, browser - predefined.
//page is a subset of browser - all things can be done using the page fixtures. - validation, capture elements
// we are passing {page} fixture as a parameter for the arrow function.

test("Verify Page Title", async ({page})=>{
    
    // launch the url
    // run on all three browsers - chrome, firefox and webkit-safari
    await page.goto("http://www.automationpractice.pl/index.php");
    

    // Return title of the page.
    let title:string = await page.title();
    console.log("Title:", title);

    // verify the title of the page.
    await expect(page).toHaveTitle("My Shop");  // return true or false

})

// one assertion in one test.
// certain statements will follow asynchronous nature - when some statements are executing in background - extenal files, 
// external resources.
//promise - 
// 1. promise resolved - task is completed successfully - any background task.
// 2. promise rejected - task is not completed successfully - rest of the steps wont be executed.
//await - wait for promise to be completed - every step we will use as it will wait until previous step is completed.
//synch - console.log() - not returning any promise.

//synchronous and asynchronous
//synchronous - step-wise execution. sequential execution - step 1, 2, 3, 4 - one step complets then only next step will execute.
//asynchronous - parallel execution - step 1 - executing at backend , step 2 will start execution, step 3 will start executon. No dependency on other step to complete.
