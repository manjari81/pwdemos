// Reading data from csv file

/*
Pre-requisite:
Install the csv-parse module to read CSV files:
    npm install csv-parse
	

*/

import{test,expect} from "@playwright/test" ;
import fs from 'fs' ;  // built in module in js/ts
import {parse} from 'csv-parse/sync';

const csvPath = "testdata/data.csv" ;
const fileContent = fs.readFileSync(csvPath,'utf-8'); // read content from the csv file - its complete content from the csv file

const records = parse(fileContent,{columns:true,skip_empty_lines:true})  // read file content and gives all the records line by line - extract data using keys like email, password and validity

//main test
test.describe('Login data driven test', async()=> {

    for (const data of records) {
            test(`Login test with email: "${data.email}" and password: "${data.password}"`, async ({ page }) => {
                await page.goto('https://demowebshop.tricentis.com/login');

                // Fill login form
                await page.locator('#Email').fill(data.email);
                await page.locator('#Password').fill(data.password);
                await page.locator('input[value="Log in"]').click();

                if (data.validity.toLowerCase() === 'valid') {
                    // Assert logout link is visible - indicates successful login
                    const logoutLink = page.locator('a[href="/logout"]');
                    await expect(logoutLink).toBeVisible({ timeout: 5000 });
                } else {
                    // Assert error message is visible
                    const errorMessage = page.locator('.validation-summary-errors');
                    await expect(errorMessage).toBeVisible({ timeout: 5000 });

                    // Assert user is still on the login page
                    await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
                }
            });
        }



});