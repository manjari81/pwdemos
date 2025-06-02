//alert(), confirm(), prompt() dialogs/JSalerts

//Reference:  https://playwright.dev/docs/dialogs#alert-confirm-prompt-dialogs

// By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them. 
// However, you can register a dialog handler before the action that triggers the dialog to either dialog.accept() or dialog.dismiss() it.

import{test,expect,Locator,Page} from "@playwright/test" ;


// alert()
test("Alert Dialog", async ({page}) =>
{

page.goto("https://testautomationpractice.blogspot.com/");

// Before openig the alert, we should catch the event.
//Register a dialog handler.

page.on('dialog', (dialog) => {  // dialog is the event name, second parameter is an arrow function.

    console.log("Dialog type is:",dialog.type());  // returns type of the dialog
    expect(dialog.type()).toContain('alert')

    console.log("Dialog Text:", dialog.message());  // returns message from dialog.
    expect(dialog.message()).toContain("I am an alert box!");

    dialog.accept();
});
  
await page.locator("#alertBtn").click();  // opens alert dialog
await page.waitForTimeout(5000);

})


// confirm()
test ("Confirmation Dialog", async ({page}) =>
{

page.goto("https://testautomationpractice.blogspot.com/");

// Before openig the alert, we should catch the event.
//Register a dialog handler.

page.on('dialog', (dialog) => {  // dialog is the event name, second parameter is an arrow function.

    console.log("Dialog type is:",dialog.type());  // returns type of the dialog
    expect(dialog.type()).toContain('confirm')

    console.log("Dialog Text:", dialog.message());  // returns message from dialog.
    expect(dialog.message()).toContain("Press a button!");

    dialog.accept();  // close dialog by accepting
    // dialog.dismiss(); // close dialog by dismissing
    
});
  
// Validation outside the function

await page.locator("#confirmBtn").click();  // opens confirmation dialog
const text:string = await page.locator("#demo").innerText(); // returns the text
console.log("Output text:", text);
   
await expect(page.locator("#demo")).toHaveText("You pressed OK!");  // ok
// await expect(page.locator("#demo")).toHaveText("You pressed Cancel!");

await page.waitForTimeout(5000);

})


// prompt()
test.only ("Prompt Dialog", async ({page}) =>
{

page.goto("https://testautomationpractice.blogspot.com/");

// Before openig the alert, we should catch the event.
//Register a dialog handler.

page.on('dialog', (dialog) => {  // dialog is the event name, second parameter is an arrow function.

    console.log("Dialog type is",dialog.type());  // returns type of the dialog
    expect(dialog.type()).toContain('prompt')

    console.log("Dialog Text:", dialog.message());  // returns message from dialog.
    expect(dialog.message()).toContain("Please enter your name:");
    expect(dialog.defaultValue()).toContain("Harry Potter");   // default text input validation - checks default value of the dialog
   
    dialog.accept('John');  // accepting the dialog, pass the value
    // dialog.dismiss() ;
   
});
  
// Validation outside the function

await page.locator("#promptBtn").click();  // opens prompt dialog

const text:string = await page.locator("#demo").innerText(); // returns the text
console.log("Output text:", text);

await expect(page.locator("#demo")).toHaveText("Hello John! How are you today?");  // ok
// await expect(page.locator("#demo")).toHaveText("User cancelled the prompt.");  // cancel
await page.waitForTimeout(5000);

})