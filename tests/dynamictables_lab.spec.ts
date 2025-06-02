
/* URL: https://testautomationpractice.blogspot.com/ 
Objective: Extract and compare process data from a dynamic web table. 
Test Scenarios: 
• Retrieve the CPU Load value for the Chrome process and compare it against the value 
displayed in the yellow label. 
• Retrieve the Memory Usage value for the Firefox process and compare it against the value 
displayed in the blue label. 
• Retrieve the Network Speed value for the Chrome process and compare it against the value 
displayed in the orange label. 
• Retrieve the Disk Space value for the Firefox process and compare it against the value 
displayed in the violet label. */

// 1. Retrieve the CPU Load value for the Chrome process and compare it against the value displayed in the red label. 

import {test,expect,Locator} from "@playwright/test" ;

test("Verify Chrome CPU load in dynamic table", async ({page}) => {


await page.goto("https://testautomationpractice.blogspot.com/");
const table:Locator = page.locator("#taskTable tbody");
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

// Step2: Compare it with value in Red Label

const redlabelText:string = await page.locator(".chrome-cpu").innerText();  // captured yellow box text
console.log("Chrome CPU load from red label", redlabelText);

if(redlabelText.includes(cpuLoad))
{
    console.log("CPU load of chrome is equal");
}
else
{
    console.log("CPU load of chrome is not equal");
}

// expect(cpuLoad).toBe(redlabelText);   
expect(redlabelText).toContain(cpuLoad);

await page.waitForTimeout(5000);


//2.  Retrieve the Memory Usage value for the Firefox process and compare it against the value displayed in the blue label. 


//Step1: From Firefox process get the value of Memory usage

let memoryUsage='';   // global variable

for(const row of rows)
{

const processName:string = await row.locator("td").nth(0).innerText();  // captured the process name for every row.

if(processName==='Firefox')
{

    // memoryUsage = await  row.locator('td:has-text("MB")').innerText(); // css syntax  tbody - matches with three elements - strict mode violation
    memoryUsage = await  row.locator("td", {hasText: /MB$/}).innerText();   // playwright syntax
    console.log("Memory Usage of Firefox is ", memoryUsage);
    break;

}
}

// Step2: Compare it with value in Blue Label

const bluelabelText:string = await page.locator(".firefox-memory").innerText();  // captured blue box text
console.log("Firefox Memory Usage from blue label", bluelabelText);

if(bluelabelText.includes(memoryUsage))
{
    console.log("Memory Usage of Firefox is equal");
}
else
{
    console.log("Memory Usage of Firefoxnot equal");
}


expect(bluelabelText).toContain(memoryUsage);


//3. Retrieve the Network Speed value for the Chrome process and compare it against the value displayed in the orange label. 

//Step1: From Chrome process get the value of Network Speed

let netSpeed='';   // global variable

for(const row of rows)
{

const processName:string = await row.locator("td").nth(0).innerText();  // captured the process name for every row.

if(processName==='Chrome')
{

    // netSpeed = await  row.locator('td:has-text("Mbps")').innerText(); // css syntax
    netSpeed = await  row.locator("td", {hasText:'Mbps'}).innerText();   // playwright syntax
    console.log("Network Speed of Chrome is ", netSpeed);
    break;

}
}

// Step2: Compare it with value in Orange Label

const orangelabelText:string = await page.locator(".chrome-network").innerText();  // captured orange label text
console.log("Chrome Network Spped from orange label", orangelabelText);

if(redlabelText.includes(cpuLoad))
{
    console.log("Network Speed of chrome is equal");
}
else
{
    console.log("Network Speed of chrome is not equal");
}

expect(orangelabelText).toContain(netSpeed);


// 4. Retrieve the Disk Space value for the Firefox process and compare it against the value displayed in the violet label.


// Step1: From Firefox process get the value of Diskspace
let diskSpace='';   // global variable

for(const row of rows)
{

const processName:string = await row.locator("td").nth(0).innerText();  // captured the process name for every row.

if(processName==='Firefox')
{

    // diskSpace = await  row.locator('td:has-text("MB/s")').innerText(); // css syntax
    diskSpace = await  row.locator("td", {hasText:'MB/s'}).innerText();   // playwright syntax
    console.log("Disk Space of Firefox is ", diskSpace);
    break;

}
}

// Step2: Compare it with value in Violet Label

const violetLabelText:string = await page.locator(".firefox-disk").innerText();  // captured violet text
console.log("Firefox Disk Space from Violet label",violetLabelText );

if(violetLabelText.includes(diskSpace))
{
    console.log("Disk Space of Firefox is equal");
}
else
{
    console.log("Disk Space of Firefox is not equal");
}

expect(violetLabelText).toContain(diskSpace)

await page.waitForTimeout(5000)



})