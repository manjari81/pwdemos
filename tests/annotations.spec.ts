/* 
// control the execution of the test
only - that test will be executed - test.only
skip - it will skip that test - test.skip
fail - it will fail the test
fixme - if test needs fix at later stage
slow - slows down the test

*/

import { test, expect } from '@playwright/test';

//only
test('test1', async ({ page }) => {
 
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle('Google');
  console.log("First test executed");
});

//skip
test.skip('test2', async ({ page }) => {
 
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle('Google');
  console.log("Second test skipped");
});

// skip the test based on some conditions - broswerName is from config file
test('test3', async ({ page, browserName}) => {
 
  // test.skip(browserName==='chromium','This test will skip if browser is chromium');
  test.skip(browserName==='firefox','This test will skip if browser is firefox');

  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle('Google');
  console.log("Third test skipped");
});

//fail - fail the test intentionallly - flaky test
test.fail('test4', async ({ page }) => {
 
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle('Google');
  console.log("Fourth test is failed");
});

// fixme - test is partially completed only- this will also be skipped.
test.fixme('test5', async ({ page }) => {
 
  await page.goto('https://www.google.com');
  // no assertion
  console.log("Fifth test is skipped as it needs fix");
});

//slow - triple the default timeout - 90 sec (default is 30 sec)
test('test6', async ({ page }) => {
   
  test.slow() 
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle('Google');
  console.log("Sixth test is executed slowly");
});