import{test} from "@playwright/test" ;

// If worker is 1 - it will always be serial execution even though fullyparallel is true in config file.
// test level configuration - serial execution of the test - 1 worker by default always

// test.describe.configure({mode:'serial'}) ;
// test.describe.configure({mode:'parallel'}) ;

test.describe('Group1',async() => {

test ('Test1', async () => {

    console.log("This is Test 1.....");

}) ;

test ('Test2', async () => {

    console.log("This is Test 2.....");
}) ;


test ('Test3', async () => {

    console.log("This is Test 3.....");

}) ;

test ('Test4', async () => {

    console.log("This is Test 4.....");

}) ;

test ('Test5', async () => {

    console.log("This is Test 5.....");

}) ;

});