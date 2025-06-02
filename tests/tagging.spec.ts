// tag - grouping at test level

/* 
test1 - sanity
test2 - sanity, regression
test3 - regression

run only sanity ;
run only regression ;

1. Run all sanity tests:  2 Test
    npx playwright test tagging.spec.ts --grep "@sanity" 

2. Run all regression tests:  2 Test
    npx playwright test tagging.spec.ts --grep "@regression"

3. Run tests which are belongs to both sanity & regression - 1 Test

npx playwright test tagging.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"

(?=.*@sanity)
(?=.*@regression)

(?=.*@sanity)(?=.*@regression)

4. Run tests belongs to either sanity or regression.
    npx playwright test tagging.spec.ts --grep "@sanity|@regression"  - 3 Test

5. Run sanity tests which does not belongs to regression (special case)
    npx playwright test tagging.spec.ts --grep "@sanity" --grep-invert "@regression" - 1 Test
    


*/

import { test, expect } from '@playwright/test';

// Test belongs to both sanity and regression

/* test('@sanity @regression Check the title of the home page', async ({page}) => {
 
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle('Google');
 
}); */

// Recommendable
test('Check the title of the Home page',{tag:'@sanity'}, async ({ page }) => {
 
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle('Google');
  console.log("Sanity test passed");
});

test('Check navigation to Store page',{tag:'@regression'}, async ({ page }) => {
 await page.goto('https://www.google.com/');
  await page.locator("text='Store'").click();
  await page.waitForTimeout(4000);
  await expect(page).toHaveTitle('Google Store for Google Made Devices & Accessories');
  console.log("Regression test passed");
});


test('Check Popular on the Google Store',{tag:['@sanity','@regression']}, async ({ page }) => {
 await page.goto('https://www.google.com/');
 await page.locator("text='Store'").click();
 await page.waitForTimeout(4000);
 await expect(page.locator("text='Popular on the Google Store.'")).toHaveText('Popular on the Google Store.');
 console.log("Sanity and Regression test passed");
});
