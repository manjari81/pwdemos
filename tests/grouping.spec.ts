// Grouping

// By default PW will run test in parallel mode
// fullyParallel: false, - This will run the test in serial mode.

import{test,expect} from "@playwright/test" ;

// Creates group 
test.describe('Group1',async() => {

test ('Test1', async () => {

    console.log("This is Test 1.....");

}) ;

test ('Test2', async () => {

    console.log("This is Test 2.....");
}) 

})

test.describe('Group2',async() => {

test ('Test3', async () => {

    console.log("This is Test 3.....");

}) ;

test ('Test4', async () => {

    console.log("This is Test 4.....");

}) 

});