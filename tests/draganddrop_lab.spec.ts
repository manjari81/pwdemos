// Drag and Drop on https://demo.guru99.com/test/drag_drop.html

// DS - Account - Bank,  Amount - 5000, CS- Account - Sales, Amount - 5000
// Validate Perfect box.

import {test, expect} from "@playwright/test" ;

test("Drag and Drop on Demo Guru", async ({page}) => {

await page.goto("https://demo.guru99.com/test/drag_drop.html");

// Drag and Drop Bank - DS - Account
const bank=page.locator('.block14');
const dsAccount=page.locator('#bank');
await bank.dragTo(dsAccount);
await page.waitForTimeout(2000);

// Drag and Drop Sales - CS - Account
const sales=page.locator('.block15');
const csAccount=page.locator('#loan');
await sales.dragTo(csAccount);
await page.waitForTimeout(2000);

// Drag and Drop 5000 - DS - Amount
const amount1=page.locator("//li[@id='fourth'][1]");
const dsAmount=page.locator('#amt7');
await amount1.dragTo(dsAmount); 
await page.waitForTimeout(2000);

// Drag and Drop 5000 - CS - Amount
const amount2=page.locator("//li[@id='fourth'][2]");
const csAmount=page.locator('#amt8');
await amount2.dragTo(csAmount);
await page.waitForTimeout(2000);

const result = await page.locator(".table4_result").innerText();
expect(result).toContain("Perfect!") ;

await page.waitForTimeout(2000);
    
})