//  Blaze Demo  Lab

// Step 1: Launch the Website

import{test,expect,Locator} from "@playwright/test" ;



test ("Verify the lab steps", async ({page}) => {

// Step1: Launch the Website

await page.goto("https://blazedemo.com/") ;
await expect(page.getByText("Welcome to the Simple Travel Agency!")).toBeVisible();

/* const title = page.locator("//h1[normalize-space()='Welcome to the Simple Travel Agency!']").innerText();
expect((await title).includes("Welcome")); */


// Step 2: Select Departure and Destination 
// Select "Boston" as the departure city and "London" as the destination using the dropdown options.

await expect(page.getByText("Choose your departure city:")).toBeVisible(); 
await page.locator("//select[@name='fromPort']").selectOption('Boston');
await page.waitForTimeout(1000);

await expect(page.getByText("Choose your destination city:")).toBeVisible(); 
await page.locator("//select[@name='toPort']").selectOption('London');
await page.waitForTimeout(1000);


// Step 3: Search for Flights 
// Click on the Find Flights button after selecting cities. 

const btnFF:Locator = page.getByRole('button', {name: 'Find Flights'});
expect(btnFF).toBeEnabled ; 
btnFF.click();
await page.waitForTimeout(3000);
const head:Locator = page.getByText("Flights from Boston to London:");  // validation
await expect(head).toBeVisible() ;


//Step 4: Capture Flight Prices 
// Locate the results table and extract flight prices. 
// Store all prices in an array and print the total number of available flights. 

const resTable:Locator = page.locator(".table tbody");   // results table
expect(resTable).toBeVisible();

const rows:Locator = resTable.locator("tr");  // all rows locator
const rowsCount = await rows.count();
console.log("Total number of flights: ", rowsCount)
expect(rowsCount).toBeGreaterThan(0);


const prices: string[] = [];

  for (let i = 0; i < rowsCount; i++) 
 {
    const price = await rows.nth(i).locator('td').nth(5).innerText();  // column 6th is price
    prices.push(price);  // adding prices to array
    
 }

console.log("Prices of flights", prices);

// Step 5: Identify the Lowest Price 
// Sort the array of prices and determine the flight with the lowest fare.

const priceSort: string [] = prices.sort();
console.log("Array of prices in sorted order", priceSort) ;

// Lowest Fare Price is 
const lowestPrice : string = priceSort[0];
console.log("Lowest price is:", lowestPrice);


// Step 6: Choose the Cheapest Flight 
// Find the corresponding table row with the lowest price and click Choose This Flight. 

for(let i = 0; i < rowsCount; i++) 
{
const price = await rows.nth(i).locator('td').nth(5).innerText();

if(price===lowestPrice)
{
    await rows.nth(i).locator('td input[type="submit"]').click();
    break;
}
}

await page.waitForTimeout(5000);

await expect(page.getByText("Please submit the form below to purchase the flight.")).toBeVisible(); 

/* 
Step 7: Enter Passenger Information 
• Fill in the booking form with the following details: 
o Name: John 
o Address: 1403 American Beauty Ln 
o City: Columbus 
o State: OH 
o Zip Code: 43240 
o Credit Card Number: 6789 0673 4523 1267 
o Credit Card Year: 2023 
o Name on Card: John Canedy 
• Click the Purchase Flight button. */

// Name
expect(page.getByPlaceholder("First Last")).toBeVisible();
expect(page.getByPlaceholder("First Last")).toBeEditable();
await page.locator("#inputName").fill("John Canedy");

// Address
expect (page.getByLabel("Address")).toBeVisible();
expect(page.getByPlaceholder("123 Main St")).toBeEditable();
await page.locator("#address").fill("1403 American Beauty Ln");

// City
expect (page.getByLabel("City")).toBeVisible();
expect(page.getByPlaceholder("Anytown")).toBeEditable();
await page.locator("#city").fill("Columbus");

//State
expect (page.getByLabel("State")).toBeVisible();
expect(page.getByPlaceholder("State")).toBeEditable();
await page.locator("#state").fill("OH");

// Zip Code
expect (page.getByLabel("Zip Code")).toBeVisible();
expect(page.getByPlaceholder("12345")).toBeEditable();
await page.locator("#zipCode").fill("43240");

// Default option for dropdown
expect(page.locator(".form-inline")).toBeEditable();

// Credit Card Number
expect (page.getByLabel("Credit Card Number")).toBeVisible();
expect(page.getByPlaceholder("Credit Card Number")).toBeEditable();
await page.locator("#creditCardNumber").fill("6789 0673 4523 1267");


// Credit Card Month
expect (page.getByLabel("Month")).toBeVisible();
expect(page.getByPlaceholder("Month")).toBeEditable();
await page.locator("#creditCardMonth").clear();
await page.waitForTimeout(1000);
await page.locator("#creditCardMonth").fill("08");

// Credit Card Year
expect (page.getByLabel("Year")).toBeVisible();
expect(page.getByPlaceholder("Year")).toBeEditable();
await page.locator("#creditCardYear").clear();
await page.waitForTimeout(1000);
await page.locator("#creditCardYear").fill("2023");

// Name on Card
expect (page.getByLabel("Name on Card")).toBeVisible();
expect(page.getByPlaceholder("John Smith")).toBeEditable();
await page.locator("#nameOnCard").fill("John Canedy");

// Click the Purchase Flight button. 

page.getByRole('button', { name : 'Purchase Flight'}).isVisible();
page.locator(".btn.btn-primary").click();


await page.waitForTimeout(3000);


// Step 8: Confirm Purchase 
// Validate the success message: "Thank you for your purchase". 
//  Print "Success !! Passed" if the message appears; otherwise, print "Failed". 

const message:Locator =page.getByText("Thank you for your purchase today!") ;

const mesgssucc : String | null  = (await message.innerText()).trim() ;

console.log(mesgssucc) ;

if(mesgssucc === "Thank you for your purchase today!")

{
    console.log("Success");
}

else

{
 console.log("Failed");
}

})
