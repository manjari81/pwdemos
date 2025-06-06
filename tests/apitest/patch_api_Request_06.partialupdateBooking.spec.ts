/* 

Pre-requisite:
data:json fie
create token

1) Create a booking (Post) --- > returns bookingID
2) Update the booking - (Patch)  -  //  required token (additional step)
*/

import { test, expect } from "@playwright/test"
import fs from 'fs';


//user defined utility function - returns Json file data
function readJson(filePath:string)
{

    return JSON.parse(fs.readFileSync(filePath,'utf-8'));

}

test('Update Booking - Patch request', async ({request}) => {

// 1) Create a booking (Post)

const requestBody = readJson("testdata/post_request_body.json"); //calling the function.
const createResponse = await request.post('/booking',{data:requestBody});

expect(createResponse.ok()).toBeTruthy();
expect(createResponse.status()).toBe(200);

const responseBody = await createResponse.json() ;  // returns json body
console.log(responseBody);
const bookingid = responseBody.bookingid;  // extracting bookingid from the response body.
console.log("Booking ID------", bookingid);


//2) Partical Update the booking - (Patch)  -  //  required token

//token creation process

const tokenrequestBody = readJson('testdata/token_request_body.json');
const tokenresponse = await request.post('/auth',{data:tokenrequestBody});
expect(tokenresponse.ok()).toBeTruthy();


const tokenresponsebody = await tokenresponse.json();  // retruns the token response body
const token = tokenresponsebody.token;
console.log("Token----------",token);

//send update request(Patch)
const patchRequestbody = readJson('testdata/patch_request_body.json');
const partialupdateresponse = await request.patch(`/booking/${bookingid}`,
     {
        headers:{"Cookie":`token=${token}` },
        data:patchRequestbody,
     }

    
    );

expect(partialupdateresponse.ok()).toBeTruthy();
expect(partialupdateresponse.status()).toBe(200);

const updateresponsebody = await partialupdateresponse.json();
console.log(updateresponsebody);
console.log("Booking details updated successfully.....")
    
})