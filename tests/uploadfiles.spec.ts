// Upload Files - Single and Multiple


import {test,expect} from "@playwright/test"

test('Single File Upload', async ({ page }) => {

await page.goto("https://testautomationpractice.blogspot.com/");

await page.locator('#singleFileInput').setInputFiles('uploads/pagination table.txt');  //
await page.locator("button:has-text('Upload Single File')").click();

const msg = await page.locator("#singleFileStatus").textContent();   // textContent() - will take spaces and characters as well.
expect(msg).toContain('pagination table.txt');
console.log("Single file upload is successful...");

await page.waitForTimeout(5000);

});


test.only('Multiple Files Upload', async ({ page }) => {

await page.goto("https://testautomationpractice.blogspot.com/");

await page.locator('#multipleFilesInput').setInputFiles(['uploads/Day30-Labs.pdf', 'uploads/pagination table.txt']);
await page.locator("button:has-text('Upload Multiple Files')").click();

const msg = await page.locator('#multipleFilesStatus').innerText();
expect(msg).toContain('Day30-Labs.pdf');
expect(msg).toContain('pagination table.txt');

console.log("Multiple files uploaded successfully...")
console.log(msg);

await page.waitForTimeout(5000);


})