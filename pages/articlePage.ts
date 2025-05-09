import { Page } from "@playwright/test";
export class ArticlePage{
    private readonly page:Page
    constructor(page:Page){
        this.page=page
    }

    async getCreatedArticleName(){
        return await this.page.locator('.container h1').textContent()
    }
    async getTags(){
        return await this.page.locator('.tag-pill').allTextContents()
    }
    async deleteArticle(){
        await this.page.locator('div.container').filter({has:this.page.locator('h1')}).getByRole('button',{name:'Delete Article'}).click()
    }

    async goToHomePage(){
        await this.page.getByText('Home').click()
    }

}