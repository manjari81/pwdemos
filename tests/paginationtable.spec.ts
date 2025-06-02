// Pagination Table

import {test,expect,Locator} from "@playwright/test" ;

//1. Read data from all the table pages.

test ("Read data from all the table pages", async ({page}) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    
    
    
    /* 
    // read first page 
    
    const rows = await page.locator("#example tbody tr").all();  // array of locators
    
    for( let row of rows)
    {
       console.log(await row.innerText());  // printing all the rows from the particular page
    }
     */
    
    let hasmorepages:boolean=true;   // to check pages are present or not and then rows are present or not.- last page in the table is not known
    
    while(hasmorepages)
    {
     const rows = await page.locator("#example tbody tr").all();  // array of locators
    
     for(let row of rows)
     {
        console.log(await row.innerText());  // printing all the rows from the particular page
     }
    
    
    // button[aria-label='Next']
    // button[aria-controls='example']:has-text("›")  - judo element "›"
    // button[aria-controls='example']:nth-child(9)
    
    
    const nextButton:Locator = page.locator("button[aria-label='Next']");
    
    //values of class -  dt-paging-button disabled next and dt-paging-button next - one will include disabled for next button and other won't
    
    const isDisabled = await nextButton.getAttribute('class');  // dt-paging-button disabled next

    if(isDisabled?.includes("disabled"))
    {
      hasmorepages =false;
    }
    else
    {
    await nextButton.click();
    }
    
    }
    
    }) ;
    

//2. Filter rows and check the count 

test ("Filter rows and check the count ", async ({page}) => {

await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

const dropdown:Locator = page.locator("#dt-length-0");
dropdown.selectOption({label:'25'});
await page.waitForTimeout(5000);

//Approach-1
const rows = await page.locator("#example tbody tr").all();
expect(rows.length).toBe(25); 


//Approach -2

/* const rows2 = page.locator("#example tbody tr");
await expect(rows2).toHaveCount(25);  */

}) ;

//3. Search for specific data in a table 

test.only ("Search for specific data in a table", async ({page}) => {

await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");    

const searchbox:Locator = page.locator('#dt-search-0');
await searchbox.fill("Paul Byrd");

await page.waitForTimeout(3000);

const rows = await page.locator("#example tbody tr").all();  // all the rows from the searched table

if(rows.length>=1)  // atleast one row to search 
{

let matchFound = false;
for(let row of rows)
{
  const text = await row.innerText();
  if((text).includes('Paul Byrd'))
  {
    console.log("Record exist - found");
    matchFound = true;
    break;
  }
}
    expect(matchFound).toBe(true);
   //  expect(matchFound).toBeTruthy();
}
else
{
    console.log("No rows found with search text");
}

await page.waitForTimeout(5000);

})
