/*
1) Playwright can be used to test your application for many types of accessibility issues.
Examples:
    Missing or Improper ALT Text for Images
    Poor Color Contrast
    Missing Form Labels
    Keyboard Navigation Issues

Every website should follow WCAG guidelines.
    - Web Content Accessibility Guidelines (WCAG) 

Install @axe-core/playwright: 
    npm install @axe-core/playwright

https://www.npmjs.com/package/@axe-core/playwright


*/

// 100% page won't follow accessibilty guidelines

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'


test('Accessibity Test', async ({page},testInfo) => {

await page.goto("https://demowebshop.tricentis.com/");

// await page.goto("https://www.w3.org/");  // follows all WACG Violations

//1) Scanning detect all types of WACG violataions


/* 
const accessibiltyScanResults = await new AxeBuilder({page}).analyze()  // returns the result in array in json format
console.log(accessibiltyScanResults);
console.log("Number of violations", accessibiltyScanResults.violations.length);  
expect(accessibiltyScanResults.violations.length).toEqual(0);

*/
// expect(accessibiltyScanResults.violations).toEqual([]); // violations should be null.


//2) Scanning for few WCAG Violations using tags

/* 
const accessibiltyScanResults= await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
await testInfo.attach('accessibilty result',
    {
      body: JSON.stringify(accessibiltyScanResults,null,2),   // indentation purpose only
      contentType : 'application/json'
    }
)
console.log("Number of violations", accessibiltyScanResults.violations.length); 
expect(accessibiltyScanResults.violations.length).toEqual(0) ;  
*/


// 3) Scanning for few WAC violations with rules
 
const accessibiltyScanResults= await new AxeBuilder({page}).disableRules(['duplicate-id']).analyze();

await testInfo.attach('accessibilty result',
    {
      body: JSON.stringify(accessibiltyScanResults,null,2),   // indentation 
      contentType : 'application/json'
    }
)

console.log("Number of violations", accessibiltyScanResults.violations.length); 
expect(accessibiltyScanResults.violations.length).toEqual(0);

 
})
