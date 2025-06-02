/*
1) Got to Url: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
2) Enter user name and password ( Admin, admin123)
3) Click on login
4) Check user name is visible after login

*/

import{test,expect,Locator} from "@playwright/test"

test("Verify User Name after login ", async ({page})=> {

await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
await expect(page.getByAltText("company-branding")).toBeVisible();

// await expect(page.getByLabel("Username")).toBeVisible();
expect(page.locator(".oxd-label[value='Username']")).toBeVisible;  // css locator using class
await page.getByPlaceholder("Username").fill("Admin");

// await expect(page.getByLabel("Password")).toBeVisible();
expect(page.locator(".oxd-label[value='Password']")).toBeVisible; // css locator using class
await page.getByPlaceholder("Password").fill("admin123");

await expect(page.getByRole('button',{name: " Login "})).toBeEnabled() ;
await page.getByRole('button',{name: " Login "}).click();

await expect(page.getByText("Admin")).toBeVisible();


})
