import { defineConfig, devices } from '@playwright/test';
import { junit } from 'node:test/reporters';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  // grep: /@sanity/,  // specifying tag - run only sanity test - M.B.
  // grep:/(?=.*@sanity)(?=.*@regression)/  run sanity and regression - M.B.
  // grepInvert:/@regression/ , // run only sanity - M.B.

  // to change the timeout globally for all tests (default is 30000 ms / 30 sec) - M.B.
  // timeout: 60000,
  
  // To apply a longer wait  for all expect conditions (default is 5000 ms/ 5 sec) - M.B.
  // expect: { timeout: 10000 } ,

  /* Run tests in files in parallel */
  // fullyParallel: false,   // M.B.
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,

   // Retry locally 
  // retries: 3,   // done by M.B.

  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers:3,  // serial excecution  - M.B.

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',

   reporter: [['html', {open: 'always', outputFolder: 'html-reports'}], // result folder and user defined folder for HTML report. M.B.
             /*  ['list'],
              ['line'],
              ['dot'],
              ['junit', {outputFile : 'results.xml'}] ,  // result file 
              ['json', {outputFile : 'results.json'}],   */
              ['allure-playwright'] ,
              // ['C:/PWDEMOS/myreporter/my-custom-reporter.ts']  // user defined reporter - under new folder
              // ['C:/PWDEMOS/utilities/my-custom-reporter.ts']  // user defined reporter - under utilities folder.
              // ['./my-custom-reporter.ts'] // not working
              ],
             
                
   // reporter: [['html', {open: 'never'} ]] , 
   // reporter: [['html', {open: 'on-failure' } ]] ,  // M.B.
 

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    // screenshot:'on', // it will take screenshot every time
    // screenshot:'off', // it will not take any screenshot 
    // screenshot:'on-first-failure', // first time when the test case fails.
    screenshot:'only-on-failure',  // when test fails it will capture screenshot.

    // video:'off', // no video recording
    // video:'on', // every run of the test case
    // video:'on-first-retry', // rerun after first failed will be captured
    video:'retain-on-failure' ,  // only when test case failed
    // video:'retry-with-video' , //  rerunning the tests

  

    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    // viewport: { width: 1280, height: 720 },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
    trace:'on',
    // trace:'off',
    // trace: 'on-first-retry',
    // trace:'retain-on-failure' ,
    // trace:'retry-with-trace' // every trace will be captured.

    

    // testIdAttribute:'data-pw', // configured data-test id 
  },

  /* Configure projects for major browsers */
  projects: [
   {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      // fullyParallel: true,  // M.B.
    },  
   
 /*    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },  */
  
/*     {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    } ,  */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
