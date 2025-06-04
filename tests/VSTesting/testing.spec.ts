import { test, expect } from '@playwright/test';

test('test1', async function name({page}) 

{
await page.goto("https://testautomationpractice.blogspot.com/")
await expect(page).toHaveScreenshot();
await page.getByRole('link', { name: 'Udemy Courses' }).click();
await expect(page).toHaveScreenshot();

})