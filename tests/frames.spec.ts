/*
An iframe (short for “inline frame”) is an HTML element that allows you to embed another HTML document within the current document. 
Iframes are commonly used to embed external content such as videos, maps, or other web pages (as seen here) into a web page without affecting the parent document.
*/

import{test,expect,Locator} from "@playwright/test" ;

test ("Frames Dem0", async ({page}) => {

await page.goto("https://ui.vision/demo/webtest/frames/");

// count number of frames present on the web page.
const frames = page.frames () ; // returns the array of frames.
console.log("Number of frames:", frames.length);   // 7 frames

// Interact with elements present inside the frame.

//Approach 1 : Using frame itself - using page.frame() - url or name only

/* const frame = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"});  // returns frame

// await frame.locator("[name='mytext1']").fill("Hello");  // error as frame could be null.
 

if(frame)   // not null - frame exists
{
    await frame.locator("[name='mytext1']").fill("Hello");  // recommended 
    // await frame.fill("[name='mytext1']","Hello");   // PW official document
}
else
{
 console.log("Frame is not available");
}


await page.waitForTimeout(5000); */


// Approach 2: Frame Locator()- any attribute of the frame


const inputBox = page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']");
await inputBox.fill("John");


await page.waitForTimeout(5000);

})


//Inner Child Frames.

test.only ("Inner Child Frames Demo", async ({page}) => {

await page.goto("https://ui.vision/demo/webtest/frames/");

const frame3 = page.frame({url: "https://ui.vision/demo/webtest/frames/frame_3.html"}) ; // captured frame

// frame3?.locator("[name='mytext3']").fill("Welcome") ;   // in case we want to skip if condition we can use ? - not recommended

if (frame3)
{
  await frame3.locator("[name='mytext3']").fill("Welcome") ; 

  // Count the child frames

 const childFrames = frame3.childFrames() ; // returns the array of child frames
 console.log("Chid frames inside Frame 3:", childFrames.length);   // only 1 child frames exist.
 const radio = childFrames[0].getByLabel("I am a human");  // index of the child frame to interact with the elements
 await radio.check(); // select radio button
 await expect(radio).toBeChecked(); // assertion
 
}
else
{
console.log("Frame 3 is not found");
}

await page.waitForTimeout(5000);


})