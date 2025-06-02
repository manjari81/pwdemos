// Keyboard Actions

/* Keyboard Methods - insertText, down, press,type, up - insertText and type are same

await page.keyboard */


import {test,expect} from "@playwright/test"

test('Keyboard Actions', async ({ page }) => {

await page.goto("https://testautomationpractice.blogspot.com/");

// 1. First focus on input1 element

const input1= page.locator('#input1');

// await input1.click() ;  // this will also focus on input1.
await input1.focus() ; // focus on the particular element.

// 2. Provide text in imput1
await page.keyboard.insertText("Welcome");

// 3. Ctrl+A (select the text from input1)
await page.keyboard.down('Control');
await page.keyboard.press('A');     // for alphabets we use press
await page.keyboard.up('Control') ; 

// 4. Ctrl+C (copy the text from input1)
await page.keyboard.down('Control');
await page.keyboard.press('C');  // alphabets we use press
await page.keyboard.up('Control') ; 

// 5. Press TAB - 2 times
await page.keyboard.press('Tab');
await page.keyboard.press('Tab');

/* await page.keyboard.down('Tab');
await page.keyboard.up('Tab');
 */

// 6. Ctrl+V - Paste the text in input2
await page.keyboard.down('Control');
await page.keyboard.press('V');  // alphabets we use press
await page.keyboard.up('Control') ; 


// 7. Press Tab - 2 times
await page.keyboard.press('Tab');
await page.keyboard.press('Tab');

// 8. Ctrl+V - Paste the text in input3
await page.keyboard.down('Control');
await page.keyboard.press('V');  // alphabets we use press
await page.keyboard.up('Control') 

await page.waitForTimeout(5000);

});

test.only('Keyboard Actions - Simple Way', async ({ page }) => {

await page.goto("https://testautomationpractice.blogspot.com/");

// 1. First focus on input1 element

const input1= page.locator('#input1');

// await input1.click() ;  // this will also focus on input1.
await input1.focus() ; // focus on the particular element.

// 2. Provide text in imput1
await page.keyboard.insertText("Welcome");

// 3. Ctrl+A (select the text from input1)
await page.keyboard.press('Control+A');    // press is combination of up and down key

// 4. Ctrl+C (copy the text from input1)
await page.keyboard.press('Control+C');

// 5. Press TAB - 2 times
await page.keyboard.press('Tab');
await page.keyboard.press('Tab');


// 6. Ctrl+V - Paste the text in input2
await page.keyboard.press('Control+V');


// 7. Press Tab - 2 times
await page.keyboard.press('Tab');
await page.keyboard.press('Tab');

// 8. Ctrl+V - Paste the text in input3
await page.keyboard.press('Control+V');


await page.waitForTimeout(5000);

})

