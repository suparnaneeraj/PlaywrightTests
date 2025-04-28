import { Page } from "@playwright/test";

export class LoginPage{
    private readonly page: Page
    constructor(page:Page){
        this.page=page
    }
    async loginWithEmailAndPassword(email:string,password:string){
        await this.page.getByText('Sign in').click()
        await this.page.getByRole('textbox',{name:'Email'}).fill(email)
        await this.page.getByRole('textbox',{name:'Passwors'}).fill(password)
        await this.page.getByRole('button',{name:'Sign in'}).click()
    }
}