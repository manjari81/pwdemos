// Interact with all 5 frames on https://ui.vision/demo/webtest/frames/

// Interaction with Frame 1

import{test,expect,Locator} from "@playwright/test" ;

test ("Frame 1 Interaction", async ({page}) => {


await page.goto("https://ui.vision/demo/webtest/frames/");

const count = page.frames();
console.log("Number of frames is", count);

const frame1 = page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_1.html'});

if(frame1)
{ 
    await frame1.locator("[name='mytext1']").fill("Welcome to Frame 1 - Yellow");
    await expect(frame1.locator("[name='mytext1']")).toHaveValue("Welcome to Frame 1 - Yellow");
    console.log("Frame 1 Exists")
}

else
{
   console.log("Frame 1 doesnot exist")
}
    
await page.waitForTimeout(5000); 

})

test ("Frame 2 Interaction", async ({page}) => {


await page.goto("https://ui.vision/demo/webtest/frames/");

const frame2 = page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_2.html'});

if(frame2)
{
    await frame2.locator("[name='mytext2']").fill("You are in Frame 2 - Green");
    console.log("Frame 2 Exists");
}

else
{
   console.log("Frame 2 doesnot exist")
}
    
await page.waitForTimeout(5000); 

})


test("Frame 4 Interaction", async ({page}) => {


await page.goto("https://ui.vision/demo/webtest/frames/");

const frame4 = page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_4.html'});

if(frame4)
{
    await frame4.locator("[name='mytext4']").fill("Welcome to Frame 4 - Grey");
    await expect(frame4.locator("[name='mytext4']")).toHaveValue("Welcome to Frame 4 - Grey");
    console.log("Frame 4 Exists");
}

else
{
   console.log("Frame 4 doesnot exist")
}
    
await page.waitForTimeout(5000); 

})

test.only ("Frame 3 Interaction", async ({page}) => {


await page.goto("https://ui.vision/demo/webtest/frames/");

const frame3 = page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_3.html'});

if(frame3)
{
    await frame3.locator("[name='mytext3']").fill("You are in Frame 3 - Teal");
    await expect(frame3.locator("[name='mytext3']")).toHaveValue("You are in Frame 3 - Teal");
    console.log("Frame 3 Exists");

   const childFrames = frame3.childFrames();  // returns array
   console.log("Number of child frames in Frame 3 are", childFrames.length);

   // Interacting with different elements on Child Frame.

   const radio = childFrames[0].getByRole('radio', {name: 'Hi, I am the UI.Vision IDE'});
   await radio.click();
   await page.waitForTimeout(2000);
   

   const chkBox = childFrames[0].getByRole('checkbox',{name: 'Form Autofilling'});
   await chkBox.click();
   await page.waitForTimeout(1000);

  
   childFrames[0].getByRole('option', {name: 'Choose'}).click(); // opens the dropdown
   await page.waitForTimeout(1000);
   childFrames[0].getByRole('option', {name: 'Yes'}).click() // selects yes
   await page.waitForTimeout(1000);
   
   const next = childFrames[0].getByRole('button', {name: 'Next'});
   await next.click();
   await page.waitForTimeout(1000);

   const shortText = childFrames[0].getByRole('textbox', { name: 'Enter a short text' });
   await shortText.fill("We are here");
   expect(shortText).toHaveValue("We are here"); // use toHaveValue() instead of toHaveText()
  

   const longText = childFrames[0].getByRole('textbox', { name: 'Enter a long answer' }); 
   await longText.fill("We are able to access all element in child frame");
   expect(longText).toHaveValue("We are able to access all element in child frame"); // use toHaveValue() instead of toHaveText()
   


   const submit = childFrames[0].getByRole('button', {name: 'Submit'});
   await submit.click(); 
   const confirmationText = await childFrames[0].locator('.vHW8K').innerText();
   expect(confirmationText).toContain("Thank you for testing the UI"); 

   /* const back = childFrames[0].getByRole('button', {name: 'Back'});
   await back.click();
   const confirmationText1 = await childFrames[0].locator('.ahS2Le').innerText();
   expect(confirmationText1).toContain("Form Filling Demo Page"); */


  
   /* const clear = childFrames[0].getByRole('button', {name: 'Clear Form'});
   await clear.click(); 
   // alert dismissed by PW itself. */
   
   

}

else
{
   console.log("Frame 3 doesnot exist")
}
    
await page.waitForTimeout(1000); 

})


test("Frame 5 Interaction", async ({page}) => {


await page.goto("https://ui.vision/demo/webtest/frames/");

const frame5 = page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_5.html'});

if(frame5)
{
   await frame5.locator("[name='mytext5']").fill("Interactive Frame 5 - Blue");
   await expect(frame5.locator("[name='mytext5']")).toHaveValue("Interactive Frame 5 - Blue");
   console.log("Frame 5 Exists");

   const countFrames = frame5.childFrames();
   console.log("Number of child frames in Frame 5: ", countFrames.length);

   const link = await frame5.locator("a[href='https://a9t9.com']").click();
   const image = frame5.locator("img[alt='Ui.Vision by a9t9 software - Image-Driven Automation']");
   expect(image).toBeVisible();
}

else
{
   console.log("Frame 5 doesnot exist")
}
    
await page.waitForTimeout(5000); 

})