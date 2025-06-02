// Repeating steps in every test. - Before and After

// database connection or excel file - before all and after all
// login  - before each
// logout - after each

// Every test 
// step1  - Login - Before every test
// step2 - Logout - After every test

import{test,expect} from "@playwright/test" ;

// execute only once before starting all the test
test.beforeAll('BeforeAll', async() => {

console.log("This is Before ALL Tests...")

})

// execute before starting of each test
test.beforeEach('BeforeEach', async() => {

console.log("This is Before Each Test...")

})

// execute after each test
test.afterEach('AfterEach', async() => {

console.log("This is After Each Test...")
})

// execute only once after completion of all the test
test.afterAll('AfterAll', async() => {

console.log("This is After ALL Tests...")

})


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
}) 

