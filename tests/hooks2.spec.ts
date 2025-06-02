//Hooks created ouside the group can be used by other groups as well.
//Keep all hooks method outside the group.


/* 
open app - before all()

Test 1

login - before each()
  find products
logout - after each()

test 2
login
  add product to the cart
logout

close app - after all()
*/

import{test,expect,Page} from "@playwright/test" ;

// make page as global as we need to use the same page for all the test.
let page:Page;

test.beforeAll('Open App', async ({browser}) => {

page = await browser.newPage();
await page.goto("https://demoblaze.com/");
    
})

test.afterAll('Close App', async () => {

await page.close();
    
})


test.beforeEach('Login', async () => {

await page.locator('#login2').click();
await page.locator('#loginusername').fill('pavanol');
await page.locator('#loginpassword').fill('test@123');
await page.locator("button[onclick='logIn()']").click(); 
await page.waitForTimeout(3000);
})

test.afterEach('Logout', async () => {
    
await page.locator("#logout2").click();

})

test.describe('my group', async() => {

test ('Find Number of Products', async () => {

const products = page.locator("#tbodyid .hrefch");
const count = await products.count();
console.log('Number of products:', count);
await expect(products).toHaveCount(9);

});


test('Add Product to cart', async () => {

await page.locator("text='Samsung galaxy s6'").click();

// Handle alert before the click
page.on('dialog', async (dialog) => {
expect(dialog.message()).toContain('Product added');
await dialog.accept();
});

await page.locator('.btn.btn-success.btn-lg').click();
});



})