/* css - Cascade Style Sheet - Webpage

Website Development
html - add elements
javscript - add action to those elements
css - add color, style, fonts

- can be used to locate web elements.
--css is not a direct attribute of an element.
--css locators has combination of different kind of poperties like name, id and class.

2 types of css locators

1.absolute css locator
2.relative css locator

tag name - a, div, p 
4 combination that can be used for css (tag is optional)
tag with id -   tag#id     (# represents id)  or #id
tag and class - tag.class  (. represents class)   or .id 
tag with any other attribute if id and class are missing. - tag[attribute=value] or [attribute=value]
tag with class and attribute. -  tag.class[attribute=value] or .class[attribute=value]

page.locator(css/xpath)  // method use to specify css or xpath

*/

import{test,expect,Locator} from "@playwright/test"

test("Verify CSS Locators", async ({page}) =>
{
 
await page.goto("https://demowebshop.tricentis.com/");

//1. tag#id
/* 
const searchbox:Locator = page.locator("input#small-searchterms");
await searchbox.fill("T-Shirts"); */

// expect(page.locator("input#small-searchterms")).toBeVisible();  // verifying the visibility of the element
// await page.locator("input#small-searchterms").fill("T-shirts");
//  page.locator("#small-searchterms").fill("T-shirts");



//2. tag.class
// search-box-text ui-autocomplete-input - class name

// await page.locator("input.search-box-text").fill("T-Shirts");  // no spaces allowed in class name, only one class name at a time and full nam if no spaces.
// await page.locator(".search-box-text").fill("T-Shirts"); 

//3. tag[attribute=value]

// await page.locator("input[name=q]").fill("T-shirts");
// await page.locator("[name=q]").fill("T-shirts");

//4. tag.class[attribute]

// input.search-box-text[value=q] , input.search-box-text[value=Search store]

// await page.locator("input.search-box-text[value='Search store']").fill("T-shirts");
await page.locator(".search-box-text[value='Search store']").fill("T-shirts");



await page.waitForTimeout(5000); // to see the page.

})

// https://testpages.eviltester.com/styled/basic-web-page-test.html - webpage for css locators