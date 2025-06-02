// No scrolling related method is required as it's an automatic procedure

// Most of the time, Playwright will automatically scroll for you before doing any actions. 
// Therefore, you do not need to scroll explicitly.


import {test,expect} from "@playwright/test"

test ('Automatic Scrolling to footer', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");
    //Footer element - automatically scrolled before doing any action
    const footertext:string = await page.locator(".footer-disclaimer").innerText();  // automatic scrolling.
    console.log("Footer Text Captured", footertext);

    await page.waitForTimeout(5000);


});

test('Scrolling inside dropdown', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("#comboBox").click();
    const option = page.locator('#dropdown div:nth-child(100)');
    console.log("Option captured from Dropdown", await option.innerText());
    await option.click();
    await page.waitForTimeout(5000);

}) ;


test.only('Scrolling inside the table', async ({ page }) => {
  await page.goto('https://datatables.net/examples/basic_init/scroll_xy.html');

  const name=await page.locator('tbody tr:nth-child(10) td:nth-child(2)').innerText(); //Automatic scrolling - vertical
  console.log("Last Name from 10th Row & 2nd Column :", name); //Kelly
  await page.waitForTimeout(5000);

  const email=await page.locator('tbody tr:nth-child(10) td:nth-child(9)').innerText(); //Automatic scrolling - Horizantal
  console.log("Email from 10th Row & 9th Column :", email); //c.kelly@datatables.net
  await page.waitForTimeout(5000);

})
