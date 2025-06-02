// Date Picker Lab

// Lab Assignment 1:  jQuery Date Picker (Contains Drop Downs) - Date Picker 2

import{test,expect,Locator,Page} from "@playwright/test"

async function selectDate(targetYear:string, targetMonth:string, targetDate:string, page:Page)  
{
const currentMonth = await page.locator(".ui-datepicker-month").selectOption(targetMonth);  
await page.waitForTimeout(2000);
const currentYear = await page.locator(".ui-datepicker-year").selectOption(targetYear);  
await page.waitForTimeout(2000);

const allDates = await page.locator("a.ui-state-default").all() ;  // array format to use For loop

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

test ("Verify jQuery Date Picker 2 ", async ({page}) =>
{

 await page.goto("https://testautomationpractice.blogspot.com/");

 const dateInput:Locator = page.locator("#txtDate");
 expect(dateInput).toBeVisible(); 
 await dateInput.click();  // Selecting the element

// Select Future  Target date
const year='2035';
const month='Jun';   
const date='10'; 


// Select Past Target date
/* const year='2015';
const month='Aug';   //  Month in the calendar heading
const date='28';  */

selectDate(year,month,date,page) ; // same function can be used for both future dates and past dates


 
const expectedDate='10/06/2035';  // dd/mm/yyyy  - testing at boundaries for year for future date 

// const expectedDate='28/08/2015';  //dd/mm/yyyy - teasting at boundaries for year for past date 

await expect(dateInput).toHaveValue(expectedDate);

await page.waitForTimeout(5000);

// await page.close() ;
})




// Lab Assignment 2:  Select Date Range (using fill())  - Date Picker 3 - Range 

test ("Verify jQuery Date Picker 3 ", async ({page}) =>
{
await page.goto("https://testautomationpractice.blogspot.com/");

/* Tried all methods to fill, type and pressSequentially but getting error 
Error received - Expected string: "06/20/2025"
Received string: "2025-06-20" */

//The error Malformed value when using locator.fill("20-10-2025") occurs because the <input type="date"> expects a date in the format YYYY-MM-DD — not DD-MM-YYYY.
/*await page.locator('#start-date').fill('20-10-2025'); //DD-MM-YYYY
  await page.locator('#end-date').fill('05-09-2026'); //DD-MM-YYYY
 */

// Date Range Picker Visible
const dateInput:Locator = page.locator(".date-picker-box");
expect(dateInput).toBeVisible(); 

const startDate = page.locator("#start-date");
// const startDate = page.getByPlaceholder("Start Date")
expect(startDate).toBeVisible();
startDate.fill("2025-06-20");
// startDate.pressSequentially("06/20/2025");
await page.waitForTimeout(1000);
await expect(startDate).toHaveValue("2025-06-20");


const endDate = page.locator("#end-date")
// const endDate = page.getByPlaceholder("End Date") ;
expect(endDate).toBeVisible();
endDate.fill("2026-07-19");
//endDate.pressSequentially("07/19/2026")
await page.waitForTimeout(1000);
await expect(endDate).toHaveValue("2026-07-19"); 
 

// clicking submit button
await page.locator(".submit-btn").click();

const msg:Locator = page.locator("#result");
const testmsg = msg.allInnerTexts();
expect((await testmsg).includes("You selected a range of"));

await page.waitForTimeout(2000);

await page.close();

})

// Lab Assignment: 4: IRCTC 
// https://www.irctc.co.in/nget/train-search


async function selectDateIRTC(targetYear:string, targetMonth:string, targetDate:string, page:Page)  // import Page too.
{

while(true)  // until month and year is selected it will run the while loop
{
const currentMonth = await page.locator('span.ui-datepicker-month').innerText();  // current month
const currentYear = await page.locator('span.ui-datepicker-year').innerText(); // current year

await page.waitForTimeout(2000);

if (currentMonth===targetMonth && currentYear===targetYear)
{
   break; // no need to navigate to next page on the date picker
}
else
{
await  page.locator('.ui-datepicker-next').click();
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
  break;
 }
 
}


}


test.only("Verify IRCTC Date Picker ", async ({page}) =>
{
 await page.goto("https://www.irctc.co.in/nget/train-search");

 const dateInput:Locator = page.locator(".ng-tns-c58-10.ui-calendar");
 expect(dateInput).toBeVisible(); 

await dateInput.click(); // Selecting the element


// Select Future  Target date

const year='2025';
const month='July';   
const date='14'; 


await selectDateIRTC(year,month,date,page) ;

const expectedDate='14/07/2025';

// validation pending.

await page.waitForTimeout(3000);


})
