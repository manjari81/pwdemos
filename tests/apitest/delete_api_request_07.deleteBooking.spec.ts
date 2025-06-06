/* 
1) Create new booking
2) Get booking
3) Update booking (token)
4) Delete booking (token)
*/

import { test, expect } from "@playwright/test"
import fs from 'fs';

//user defined utility function - returns Json file data
function readJson(filePath:string)
{

    return JSON.parse(fs.readFileSync(filePath,'utf-8'));

}

test('Delete booking - end-to-end', async({request}) => {

//1) create new booking

const postrequestBody = readJson("testdata/post_request_body.json"); //calling the function.
const postResponse = await request.post('/booking',{data:postrequestBody});

expect(postResponse.ok()).toBeTruthy();
expect(postResponse.status()).toBe(200);

const postresponseBody = await postResponse.json() ;  // returns json body
console.log(postresponseBody);

const bookingid=postresponseBody.bookingid;
console.log("Booking is created.....");
console.log("Boking id----", bookingid);


// 2) Get booking

const getresponse = await request.get(`/booking/${bookingid}`);
const getresponsebody = await getresponse.json(); //returns response body
console.log("Booking details are.....")
console.log(getresponsebody);


// 3) Update booking (token)

//creating token
const tokenrequestBody = readJson('testdata/token_request_body.json');
const tokenresponse = await request.post('/auth',{data:tokenrequestBody});
expect(tokenresponse.ok()).toBeTruthy();


const tokenresponsebody = await tokenresponse.json();  // retruns the token response body
const token = tokenresponsebody.token;
console.log("Token----------",token);

// sending put request
const updateRequestbody = readJson('testdata/put_request_body.json');
const updateresponse = await request.put(`/booking/${bookingid}`,
     {
        headers:{"Cookie":`token=${token}` },
        data:updateRequestbody,
     }

    
    );

expect(updateresponse.ok()).toBeTruthy();
expect(updateresponse.status()).toBe(200);

const updateresponsebody = await updateresponse.json();
console.log("Booking details updated successfully.....")
console.log(updateresponsebody);

    

// 4) Delete booking - Delete

const deleteresponse = await request.delete(`/booking/${bookingid}`,
    {
        headers:{"Cookie":`token=${token}` },

     }
)

expect(deleteresponse.statusText()).toBe("Created");  // text is in RAW format and not Json format.
expect(deleteresponse.status()).toBe(201);
console.log("Booking is deleted successfully");

    
}
)