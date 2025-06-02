// Mouse Actions

import {test,expect} from "@playwright/test"

test ('Mouse Hover', async ({ page }) => {

await page.goto("https://testautomationpractice.blogspot.com/");
const pointme = page.locator('.dropbtn');
await pointme.hover() ; // mouse hover action 

const laptops = page.locator('.dropdown-content a:nth-child(2)');
await laptops.hover();

await page.waitForTimeout(5000);

})


test ('Right Click', async ({ page }) => {

await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
const button = page.locator('span.context-menu-one');
await button.click({button: 'right'});  // performs the right click action.

// await button.click({button: 'left'});  // left click
// await button.click({button: 'middle'}); // middle click

await page.waitForTimeout(5000);

})

test('Double Click', async ({ page }) => {

await page.goto("https://testautomationpractice.blogspot.com/");
const btncopy = page.locator("button[ondblclick='myFunction1()']");
await btncopy.dblclick(); // performs the double click action

const field2= page.locator('#field2');
expect(field2).toHaveValue("Hello World!");

await page.waitForTimeout(5000);

})

test.only ('Drag and Drop', async ({ page }) => {

// mouse hover element Rome, Mouse down Rome, Mouse hover on Italy, Mouse down on Italy

await page.goto("http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html");

const rome = page.locator("#box6");
const italy= page.locator("#box106");

//Appraoch 1:  mouse hover and drag manually

//source element
await rome.hover();
await page.mouse.down();

//target element
await italy.hover();
await page.mouse.up();


// Approach2 -  Direct using source and target

const washington = page.locator("#box3");
const usa = page.locator("#box103");

await washington.dragTo(usa) ;

await page.waitForTimeout(5000);


})




