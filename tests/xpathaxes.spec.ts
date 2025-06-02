// https://www.tutorialspoint.com/selenium/practice/webtables.php - use this one for testing

//table - only td and tr are available.

import {test,expect,Locator} from "@playwright/test" 

test("Verify X-path axes demo", async ({page})=>{

    // 1. Self Axes - Select <td> element that contains "Germany"
    await page.goto("https://www.w3schools.com/html/html_tables.asp");  // page failing in headed mode but passing in headless mode

    const germanyCell:Locator = page.locator("//td[text()='Germany']/self::td") ;
    expect(germanyCell).toHaveText('Germany');

    // 2. Parent Axes - Get parent <tr> of the "Germany" cell

   const parentRow:Locator = page.locator("//td[text()='Germany']/parent::tr");
   expect(parentRow).toContainText("Maria Anders");
   expect(parentRow).toContainText("Alfreds Futterkiste Maria Anders Germany");  // full string - same heirarchy
   console.log(await (parentRow).textContent()) ;

   // 3. Child Axes - Get all <td > children of the second <tr> in the table

  const secondRowCells:Locator = page.locator("//table[@id='customers']//tr[2]/child::td"); // return multiple elements (td's)
  await expect(secondRowCells).toHaveCount(3);

  // 4. Ancestors Axes - Get ancestor <table> for "Germany" cell

  const table:Locator = page.locator("//td[text()='Germany']/ancestor::table");  // return single element
  await expect(table).toHaveAttribute('id','customers');

  //5. Descendent Axes - Get all <td> element under the table

  const allTds:Locator = page.locator("//table[@id='customers']/descendant::td") ;
  await expect(allTds).toHaveCount(18);

  //6. Following axes - Get all the <td> that comes after "Germany" in document order.


   const followingCell:Locator=page.locator("//td[normalize-space()='Germany']/following::td[1]");
   await expect(followingCell).toHaveText("Centro comercial Moctezuma");

  // const followingCell:Locator =page.locator("//td[normalize-space()='Island Trading']/following::td");  // return multiple elements
  // await expect(followingCell).toHaveText("Helen Bennett") ; - strict law violation
  // await expect(followingCell).toHaveCount(28) ;
    

//7.  Following-sibling axes - Get all the <td> to the right of "Germany" - none as it is the last value in the table

// const rightsiblings:Locator =page.locator("//td[normalize-space()='Germany']/following-sibling::td"); 
// await expect(rightsiblings).toHaveCount(0) ;

const rightsiblings:Locator =page.locator("//td[normalize-space()='Maria Anders']/following-sibling::td");
await expect(rightsiblings).toHaveCount(1) ;

// 8. preceding AXes - Get the <td> just before "Germany"

const precedingCell:Locator= page.locator("//td[text()='Germany']/preceding::td[1]");
await expect(precedingCell).toHaveText("Maria Anders");

// 9. preceding-sibling Axes - Get <td>s to the left of "Germany"

const leftSibling:Locator= page.locator("//td[text()='Germany']/preceding-sibling::td");
await expect(leftSibling).toHaveCount(2);
await expect(leftSibling.nth(0)).toHaveText("Alfreds Futterkiste");
await expect(leftSibling.nth(1)).toHaveText("Maria Anders");

} )