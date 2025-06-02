/* 
Locator -- Identifies the element on the page.
locator is also one of the fixture.

DOM - Document Object Model - API interface provided by the browser itself. - using Inspect
Once the web page is loaded then browser automatically creates the DOM structure that can be seen by using inspect.
Locators will identify the elements in the dom structure.

1. page.getByAltText() to locate an element, usually image, by its text alternative.
2. page.getByText() to locate by text content (non interactive element)
3. page.getByRole() to locate by explicit and implicit accessibility attributes.
4. page.getByLabel() to locate a form control by associated label's text.
5. page.getByPlaceholder() to locate an input by placeholder.
6. page.getByTitle() to locate an element by its title attribute.
7. page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured). 
*/

import{test,expect,Locator} from "@playwright/test"

test( "Verify Playwright Locators", async ({page})=>{

 await page.goto("https://demo.nopcommerce.com/") ;  
 // await if statement is returning some promise and if the statement is doing some action on the element.

 // 1.page.getByAltText()  - identifies images (similar elements) based on the alt attribute.
 // Use this locator when your element supports alt text such as img and area elements.

const logo:Locator = page.getByAltText("nopCommerce demo store");  // value doesnot change
// logo.click();  // not used in real time - clicking the image
await expect(logo).toBeVisible() ;  // assertion - web element is visible or not.


// 2. page.getByText() to locate by text content - Find an element by the text it contains. You can match substring, exact string.
// Locate by visible text
// Use this locator to find a non interactive elements like div,span, p, etc.   
// <p>welcome<p>, <div>hello<div>, no attributes associated with these locators.
// For an interactive element like button, a , input, use role locators


/* const text:Locator = page.getByText("Welcome to our store") ;
await expect(text).toBeVisible();
 */

// await expect(page.getByText("Welcome to our store")).toBeVisible();  // provided full string
// await expect(page.getByText("Welcome to")).toBeVisible() ;  // provided substring

await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible() ; // case insensitive - regular expression
// i represents ignore case sensitive , /s - represent space


// 3.page.getByRole() to locate by explicit and implicit accessibility attributes.
// Locating by role (role is not an attribute usually)
// Role locators includes buttons, checkboxes, headings,links,lists,tables and many more and follow W3C specifications for ARIA role
// Prefer for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
// Role is defined on the element type.
// implicit defined role - tag name and the role name is exactly same - buttons and checkboxes
// explicit defined role - tag name and the role name is different - heading

// await page.getByRole("link",{name:'Register'}).click();  // action is performed so await is required. // human captcha seen
// await expect(page.getByRole("heading",{name:'Register'}) ).toBeVisible();  // also use getbytext()

// await expect(page.getByText('Register')).toBeVisible();  // strict mode violation error

// 4. page.getByLabel()   to locate a form control by associated label's text.
// When to use : Ideal for form fields with visible labels.

//page.getByLabel('First name:').type("John");  // type is deprecated

await page.goto("https://demo.nopcommerce.com/register?returnUrl=%2F");
// await expect(page.getByRole("heading",{name:'Register'})).toBeVisible();
await page.getByLabel('First name:').fill("John");
await page.getByLabel('Last name:').fill("Kennedy");
await page.getByLabel('Email:').fill("abc@gmail.com"); 

// 5. page.getByPlaceholder() - to locate an input by placeholder - Finds elements with a given placeholder text.
// Best for inputs without a label, but having placeholder

await page.getByPlaceholder("Search store").fill("Apple Macbook Pro");


// 6. page.getByTitle() to locate an element by its title attribute.
//When to use : when your elements has a meaningful title attribute.

// await page.goto("file:///C:/Users/ishaa/OneDrive/Desktop/Testing_MB/playwrightlocators.html");  // local file
await page.goto("http://127.0.0.1:5500/tests/app.html"); // file on live server.

/*  const link:Locator = page.getByTitle("Home page link");
 expect(link).toHaveText("Home"); */
  
 await expect(page.getByTitle("Home page link")).toHaveText("Home");
 await expect(page.getByTitle("HyperText Markup Language")).toHaveText("HTML");

// 7. page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured). 
// Data-test id is customizable.
// When to use: When text or role-based locators are unstable or not suitable.
// email attribute on local page

await expect(page.getByTestId("profile-name")).toHaveText("John Doe");
await expect(page.getByTestId("profile-email")).toHaveText("john.doe@example.com");

//data-testid  is changed to some other name data-pw 
//add the value in config file  under use  - testIdAttribute:'data-pw'


// how to setup a local server on VS editor
// settings-extensions-install live server- Ritwick Dey
// app.html- open with live server.

})


//

