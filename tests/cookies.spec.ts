// Browser Cookies  - Browser history


import{test,expect,chromium} from "@playwright/test" ;

test( "Browser Cookies" , async ()=> {

const browser = await chromium.launch({headless:false}) ;    // creates browser and runs in headed mode - we can see UI
// const browser = await chromium.launch({headless:true}) ;   // runs in headless mode - we cant see UI.

// creates new context from browser
const context = await browser.newContext();
const page = await context.newPage();  

context.addCookies(
    [
        {name:'mycookie1', value:'123456', url:'http://automationpractice.pl/index.php'},
    // {name:'mycookie2', value:'xyzabc', url:'http://automationpractice.pl/index.php'},

    ]

);   // one cookie with definition


console.log("Cookie added.... ");

await page.goto("http://automationpractice.pl/index.php");

//1. Get the details of cookies by name
const allthecookiesadded = await context.cookies();   // array of cookies
const retrievedCookie = allthecookiesadded.find((i) => i.name==='mycookie1');  // retrieving elements in the array and comparing with created cookie

console.log("Retrieved cookie details:", retrievedCookie);

expect(retrievedCookie?.value).toBe('123456');  
expect(retrievedCookie).toBeDefined();     // cookies should be defined - it should be present in the bowser.

//2. Get all the  cookies created by the browser.
console.log("Total number of cookies created", allthecookiesadded.length);   // 2 created - one by browser and one user created
expect(allthecookiesadded.length).toBeGreaterThan(0);

console.log("Printing all the cookies created:" );

for(const cookie of allthecookiesadded)
{
  console.log(`${cookie.name}: ${cookie.value}`)

}

//3. Clear all the cookies from the browser
await context.clearCookies();

// Verify the number of cookies after clearing - 0
const allthecookies = await context.cookies();  
console.log("Number of cookies after deletion:", allthecookies.length);
expect(allthecookies.length).toBe(0);


await page.waitForTimeout(5000);

})