// Path Parameter - ID is path parameter

import { test, expect } from "@playwright/test"

test("Get booking details by Id- path param", async ({request}) => {
    
const bookingId = 1 ; // we can pass this as path parameter


// send get request along with path parameter
const response = await request.get(`/booking/${bookingId}`);

//parse the response and print
const responseBody = await response.json();
console.log(responseBody);

//add assertions
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);

})

test.only("Get booking details by name - query params", async ({request}) => {
    
const firstname="Jim";
const lastname="Brown";


// send get request along with the query parameter
const response = await request.get("/booking",
    {params:
        {
            firstname,
            lastname
        }
    });

//parse the response and print
const responseBody = await response.json();
console.log(responseBody);

//add assertions
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);

//check response shouldnot be empty
expect(responseBody.length).toBeGreaterThan(0);

for (const item of responseBody)
{
expect(item).toHaveProperty("bookingid");
expect(typeof item.bookingid).toBe("number");
expect(item.bookingid).toBeGreaterThan(0);

}

})