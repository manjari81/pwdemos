// Date Picker 1 - Input Elemeny

import{test,expect,Locator,Page} from "@playwright/test"


// Code Customization by using function
// pass page fixtures and date and using async function
async function selectDate(targetYear:string, targetMonth:string, targetDate:string, page:Page, isFuture:boolean )  // import Page too.
{

while(true)  // until month and year is selected it will run the while loop
{

const currentMonth = await page.locator(".ui-datepicker-month").textContent();  // current month
const currentYear = await page.locator(".ui-datepicker-year").textContent();  // current year

if (currentMonth===targetMonth && currentYear===targetYear)
{
   break; // no need to navigate to next page on the date picker
}

// Future Dates and Past Dates 
// ui-datepicker-next
// .ui-datepicker-prev

if(isFuture)   // true
{
await  page.locator('.ui-datepicker-next').click();
}
else
{
await  page.locator('.ui-datepicker-prev').click();
}

}

// .ui-datepicker-calendar td

const allDates = await page.locator(".ui-datepicker-calendar td").all() ;  // array format to use For loop

for(let dt of allDates)
{
 const dateText = await dt.innerText() ;

 if( dateText===targetDate)
 {
  await dt.click() ; 
  // await page.waitForTimeout(1000) ;
  break;
 }
 
}


}


test("Verify jQuery Date Picker ", async ({page}) =>
{
 await page.goto("https://testautomationpractice.blogspot.com/");

 const dateInput:Locator = page.locator("#datepicker");
 expect(dateInput).toBeVisible(); 
 

 //Approach 1 : Using Fill Method  - Mostly works for Jquery Date Picker
// dateInput.fill("06/20/2025");   // mm/dd/yyyy


//Approach 2 : using date picker

await dateInput.click();  // Selecting the element

// Select Future  Target date
/* 
const year='2026';
const month='June';   //  Month in the calendar heading
const date='15'; 
*/

// ui-datepicker - month
// ui-datepicker - year


// Select Past  Target date
const year='2023';
const month='June';   //  Month in the calendar heading
const date='15';

// selectDate(year,month,date,page,true) ;  // calling function for future dates 

selectDate(year,month,date,page,false); // calling function for past dates

// const expectedDate='06/15/2026'

const expectedDate='06/15/2023';
// await expect(dateInput).toHaveValue(expectedDate); 

await page.waitForTimeout(5000);
})