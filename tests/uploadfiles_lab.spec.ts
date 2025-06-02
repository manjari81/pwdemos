// Upload single or multiple files

import {test,expect} from "@playwright/test"

test('Single File Upload', async ({ page }) => {

await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

await page.locator('#filesToUpload').setInputFiles('uploads/Test1.txt');

const msg = await page.locator("#fileList").innerText();
expect(msg).toContain('Test1.txt');
console.log("Single file upload is successful...");
console.log(msg);

await page.waitForTimeout(5000);

});


test.only('Multiple Files Upload', async ({ page }) => {

await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

await page.locator('#filesToUpload').setInputFiles(['uploads/Test1.txt', 'uploads/Test2.txt', 'uploads/testfile1.pdf', 'uploads/testfile2.pdf']);

const msg = await page.locator("#fileList").innerText();

expect(msg).toContain('Test1.txt');
expect(msg).toContain('Test2.txt');
expect(msg).toContain('testfile1.pdf');
expect(msg).toContain('testfile2.pdf');

console.log("Multiple files uploaded successfully...")
console.log(msg);

await page.waitForTimeout(5000);

// Remove all the selected files.

await page.locator('#filesToUpload').setInputFiles([]);  // pass empty array
const msg1 = await page.locator("#fileList").innerText();
expect(msg1).toContain('No Files Selected');
await page.waitForTimeout(5000);

}) 