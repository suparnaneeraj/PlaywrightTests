import { Locator, Page } from "@playwright/test";

export class LoginPage{
    private readonly page: Page;
    private signInLink: Locator;
    private emailField: Locator;
    private passwordField: Locator;
    private signInButton: Locator;

    constructor(page:Page){
        this.page   =  page;
        this.signInLink =   this.page.getByText('Sign in');
        this.emailField =   this.page.getByRole('textbox',{name:'Email'});
        this.passwordField  =   this.page.getByRole('textbox',{name:'Password'});
        this.signInButton   =   this.page.getByRole('button',{name:'Sign in'});
    }
    async loginWithEmailAndPassword(email:string,password:string){
        await this.signInLink.click();
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }
}