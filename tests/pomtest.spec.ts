import {test,expect} from '@playwright/test';

import {LoginPage } from '../pages/LoginPage.ts';
import {HomePage} from '../pages/homepage.ts';
import {CartPage} from '../pages/CartPage.ts';


test('User can login, add a product to the cart',async({page}) =>
{

await page.goto("https://demoblaze.com/index.html");

// Login Page
const loginPage = new LoginPage(page);  // object creation for LoginPage class.
/* await loginPage.clickLoginLink();
await loginPage.enterUserName("pavanol");
await loginPage.enterPassword("test@123");
await loginPage.clickLoginButton(); */

await loginPage.performLogin("pavanol","test@123");

// Home Page
const homePage = new HomePage(page);
await homePage.addProductToCart("Samsung galaxy s6");
await page.waitForTimeout(2000);
await homePage.gotoCart();
await page.waitForTimeout(2000);

// Cart Page
const cartPage = new CartPage(page);
const isProductInCart = await cartPage.checkProductInCart("Samsung galaxy s6");
expect(isProductInCart).toBe(true);


})