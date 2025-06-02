// auto waiting works for assertions and actions.
// asssertions - 5 sec default timeout
// actions - 30 sec default timeout

// local timeout will override the global timeouts 

import{test,expect,Locator} from "@playwright/test"  ;

test("Autowaiting and Forcing", async ({page})=>{

   test.setTimeout(50000); // 60 sec only applicable for this test.
   // test.slow() ; // triple the timeout - 90 sec

   await page.goto("https://demowebshop.tricentis.com/") ;

   //Assertions - Auto Wait Works
   await expect(page).toHaveURL("https://demowebshop.tricentis.com/"), {timeout:10000};
   await expect(page.locator('text=Welcome to our store')).toBeVisible({timeout:10000}) ;  // setting timeout for expect conditions.


   // Actions - Auto Wait works
   await page.locator('#small-searchterms').fill('Laptop',{force:true}); // search box - Force Action (it will ignore actionalibity checks)
   await page.locator('input[value="Search"]').click({force:true});  // clicking on search button - Force action


// Timeouts can be setin the test for single test
// Timeouts can be set in config file for global which is applicable for all the tests

})
