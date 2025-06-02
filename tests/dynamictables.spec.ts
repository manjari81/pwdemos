// Dynamic Tables


import {test,expect,Locator} from "@playwright/test" ;

test("Verify Chrome CPU load in dynamic table", async ({page}) => {


await page.goto("https://practice.expandtesting.com/dynamic-table");
const table:Locator = page.locator("table.table tbody");
await expect(table).toBeVisible() ;


//Select all the rows and then find the number of rows
const rows:Locator [] = await table.locator("tr").all();
console.log("Number of rows in a table", rows.length);
expect(rows).toHaveLength(4);

//Step 1: For Chrome process get the value of CPU load
// Read each row to check Chrome Presence

let cpuLoad='';   // global variable

for(const row of rows)
{

const processName:string = await row.locator("td").nth(0).innerText();  // captured the process name for every row.

if(processName==='Chrome')
{

    // cpuLoad = await  row.locator('td:has-text("%")').innerText(); // css syntax
    cpuLoad = await  row.locator("td", {hasText:'%'}).innerText();   // playwright syntax
    console.log("CPU Load of Chrome is ", cpuLoad);
    break;

}
}

// Step2: Compare it with value in Yellow Label

const yellowBoxText:string = await page.locator("p#chrome-cpu").innerText();  // captured yellow box text
console.log("Chrome CPU load from yellow box", yellowBoxText);

if(yellowBoxText.includes(cpuLoad))
{
    console.log("CPU load of chrome is equal");
}
else
{
    console.log("CPU load of chrome is not equal");
}

expect(yellowBoxText).toContain(cpuLoad);


// assign - https://testautomationpractice.blogspot.com/
// Memory size of firefox
// Network speed of chrome process
// diskspace of firefox process
// cpu load of chrome process




await page.waitForTimeout(3000);


})

