// Browser Context Options


//browser-->context-->page

import{test,expect,chromium} from "@playwright/test" ;

test( "Browser Settings" , async ()=> {

const browser = await chromium.launch({headless:false}) ;    // creates browser and runs in headed mode - we can see UI
// const browser = await chromium.launch({headless:true}) ;   // runs in headless mode - we cant see UI.

// creates new context from browser
const context = await browser.newContext(

{
    viewport:{width:1200,height:800} , // decides size of the page  default is 1200,1200 - override the config file properties.
    locale:'en-US',   // browser language selection
    // proxy:{server:'http://myproxy.com:7990'},    // proxy server settings - security and privacy - url with port
   ignoreHTTPSErrors:true, // ssl certificate - secure socket layout - ignore certificates errors on the webpage.
   
}

);  


const page = await context.newPage();  // creates a new page.

// await page.goto("https://www.google.com/");
await page.goto("https://expired.badssl.com/");

console.log("Title of the page:", await page.title());

await page.waitForTimeout(5000);

})