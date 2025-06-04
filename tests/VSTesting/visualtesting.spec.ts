import { test, expect } from '@playwright/test';

test('test1', async function name({page}) 

{

 await page.goto("https://demowebshop.tricentis.com/");

 // await page.goto("https://demowebshop.tricentis.com/register")

 //comparison between actual and expected screesnhot of page.

 // approach-1 - Recommended
 // expect (await page.screenshot()).toMatchSnapshot("homepage.png"); 

 // approach-2
 await expect(page).toHaveScreenshot();

 //comparison between actual and expected screenshot of element.
 const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
 expect (await logo.screenshot()).toMatchSnapshot("logo.png")


})