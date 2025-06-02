// verify the url of the page

import {test,expect} from "@playwright/test" ;
import {console} from "inspector";

test("Verify Page URL", async ({page})=>{
    
    // launch the url
    // run on all three browsers - chrome, firefox and webkit-safari
    await page.goto("http://www.automationpractice.pl/index.php");
    

    // Return URL of the page.
    let url:string = page.url();
    console.log("URL:", url);

    // verify the URL of the page.
    await expect(page).toHaveURL(/automationpractice/);  // return true or false

})