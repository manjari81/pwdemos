// Creating class for Login
// donot include assertions in the POM class

import {Page, Locator} from '@playwright/test' ;
 

// variables, methods and constructors with encapsulations- wrapping up of data and methods in one class.

export class LoginPage
{

// Login page
//define the variables - private and read only
//page, login link, username, password and Login button

private readonly page:Page;
private readonly loginLink:Locator;
private readonly userNameInput:Locator;
private readonly PasswordInput:Locator;
private readonly loginButton:Locator;

//constructor
constructor (page:Page)
{
 this.page=page;  // this is representing the class
 this.loginLink=page.locator('#login2');
 this.userNameInput=page.locator('#loginusername');
 this.PasswordInput=page.locator('#loginpassword');
 this.loginButton=page.locator("button[onclick='logIn()']");
}

// action methods
 async clickLoginLink():Promise<void>
{
    await this.loginLink.click();
}

async enterUserName(username:string):Promise<void>
{
   await this.userNameInput.clear();  // clear the input box if there is any text
   await this.userNameInput.fill(username);
}

async enterPassword(password:string):Promise<void>
{
   await this.PasswordInput.clear();  // clear the input box if there is an text
   await this.PasswordInput.fill(password);
}

async clickLoginButton ():Promise<void>

{
    await this.loginButton.click();
}


// single method 
async performLogin(username:string, password:string)

{
 await this.clickLoginLink();
 await this.enterUserName(username);
 await this.enterPassword(password);
 await this.clickLoginButton();

}

}

