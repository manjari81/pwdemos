/* Extract Data from a Paginated Table 
URL: https://testautomationpractice.blogspot.com/ 
Objective: Read and print data from a table that uses pagination. */


import {test,expect,Locator} from "@playwright/test" ;

//1. Read data from all the table pages.

test ("Read and print data from a table", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/ ");
    
    // Get all pagination links
    const pages = await page.locator('#pagination li').all();
    console.log("Number of Pages: ", pages.length);

    for (let i = 0; i < pages.length; i++) 
    {
    await pages[i].click(); // clicking on the page

    await page.waitForTimeout(3000) ;

    // Printing all the rows from the table on that page.
     const rows = await page.locator("#productTable tbody tr").all();  // array of locators

    /*  for(let row of rows)
     {
        console.log(await row.innerText());  // printing all the rows from the particular page
     } */
    

    // Select checkboxes from all the rows on the table

      for (let i = 0; i < rows.length; i++)
      {
      
      const id = await rows[i].locator('td').nth(0).innerText();
      const name = await rows[i].locator('td').nth(1).innerText();
      const price = await rows[i].locator('td').nth(2).innerText();
      await rows[i].locator('td').nth(3).locator('input').click(); // clicking on checkbox
      console.log(id, '\t',  name, '\t', price);
    } 
      
   }
     await page.waitForTimeout(3000);

    })