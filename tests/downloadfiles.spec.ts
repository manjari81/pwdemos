// Download Files

import {test,expect} from "@playwright/test";
import fs from 'fs';  // module to check file exist.

test('Downlaod Text File', async ({ page }) => {

await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");

await page.locator('#inputText').fill("Welcome");  // Filling text in the input box.
await page.locator('#generateTxt').click();       // click on the 'Generate and Download Text File' button

// parallel execution required - returns download and void type of array - only we need return type of first statement

// Start waiting for download before clicking

const [download] = await Promise.all([
page.waitForEvent('download'),   // waiting for the download event to start
page.locator('#txtDownloadLink').click()  // Clicking on the 'Download text file' link  (we need to listen to the event)
])

// Save the file to custom path
const downloadPath = 'downloads/testfile.txt' ; // location and file name
await download.saveAs(downloadPath);

//Check if file exists in the path

const fileexists = fs.existsSync(downloadPath);  // returns true if file exists, not if file not exists
await page.waitForTimeout(5000);
expect(fileexists).toBeTruthy();  // boolean value validations

// Cleanup the downloaded files

if(fileexists)
{
    fs.unlinkSync(downloadPath); // cleanup the downloaded files
}

await page.waitForTimeout(5000);

});


test.only('Download PDF File', async ({ page }) => {

await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");

await page.locator('#inputText').fill("Welcome");  // Filling text in the input box.
await page.locator('#generatePdf').click();       // click on the 'Generate and Download PDF File' button



const [download] = await Promise.all([
page.waitForEvent('download'),   // waiting for the event
page.locator('#pdfDownloadLink').click()  // we need to listen to the event.
])

// Save the file to custom path
const downloadPath = 'downloads/testfile.pdf' ; // location and file name
await download.saveAs(downloadPath);

//Check if file exists in the path

const fileexists = fs.existsSync(downloadPath);  // returns true if file exists, not if file not exists
await page.waitForTimeout(5000);
expect(fileexists).toBeTruthy();  // boolean value validations

// Cleanup the downloaded files

if(fileexists)
{
    fs.unlinkSync(downloadPath); // cleanup the downloaded files
} 

await page.waitForTimeout(5000);

})
