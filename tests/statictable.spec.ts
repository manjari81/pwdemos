// Static Tables

import {test,expect,Locator} from "@playwright/test" ;

test("Static Web Table", async ({page}) => {

await page.goto("https://testautomationpractice.blogspot.com/");

const table:Locator = page.locator("table[name='BookTable'] tbody");   // returns only the table 
await expect(table).toBeVisible() ;

//1. count number of rows in a table including header.

// const rows:Locator = page.locator("table[name='BookTable'] tbody tr"); // returns all the rows including header

const rows:Locator = table.locator("tr") ;  // chaining of locators
await expect(rows).toHaveCount(7) ;  // expecting 7 rows - approach 1


const rowCount:number = await rows.count();  
console.log("Number of rows in the static table are", rowCount); 
expect(rowCount).toBe(7) ;  // aprroach 2

//2. count number of header/ columns

// const columns:Locator = page.locator("table[name='BookTable'] tbody tr th");  // returns 4 columns
const columns:Locator = rows.locator("th") ; // chaining of locators
await expect(columns).toHaveCount(4) ;  // approach 1

const columnsCount:number = await columns.count();  
console.log("Number of columns in the static table are", columnsCount); 
expect(columnsCount).toBe(4) ;  // approach 2

//3. Read all the data from second row - as first row has header.

const secondRowCells:Locator = rows.nth(1).locator('td') ;   // second row - we are extracting cells (the td's locator)
const secondRowTexts:string [] = await  secondRowCells.allInnerTexts();  // extracting the values  // [ 'Learn Selenium', 'Amit', 'Selenium', '300' ]
console.log("2nd Row Data", secondRowTexts);  // print in array format

await expect(secondRowCells).toHaveText([ 'Learn Selenium', 'Amit', 'Selenium', '300' ]);  // assertion - validation

console.log("Printing second row data")  //standard  format

for(let text of secondRowTexts)
{
  console.log(text);
}

//4. Extract all table data excluding header.

console.log("Printing all the table data")

const allRowData:Locator [] =  await rows.all() // get all row locators in array format - all() - returns array of locators


console.log("BookName	Author	Subject	   Price") ;

for (let row of allRowData.slice(1))  // slice(1) will skip the header row.
{
const cols = await row.locator('td').allInnerTexts();  // text of all td elements in a row - from second tr - tds element are displayed - retruns an array
console.log(cols.join('\t'));  // print with tab - formatted data
}


//5. Print book names where Author is 'Mukesh'

console.log("Books written by Mukesh") ; 

const mukeshBooks:string[] = [] ;

for (let row of allRowData.slice(1))  //// slice(1) will skip the header row.
{
   const cells = await row.locator('td').allInnerTexts() ;
   const book = cells[0] ;  //book 
   const author = cells[1] ;  // author 

   if (author==='Mukesh')
   {
    console.log(`${author} \t ${book}`);
    mukeshBooks.push(book);
   }

}

expect(mukeshBooks).toHaveLength(2) ;  // array length assertion

//6. Calculate the total price of the books - last td value in each row and then add all the values


let totalPrice:number =0; 

for (let row of allRowData.slice(1))  // slice(1) will skip the header row.
{
   const cells = await row.locator('td').allInnerTexts() ;
   const price  = cells[3] ;  // price is in string format

   totalPrice = totalPrice+parseInt(price) ;  // parseint converts string to number 
  
}

console.log("Total price of all the books ", totalPrice) ;
expect(totalPrice).toBe(7100);  //assertion

})
