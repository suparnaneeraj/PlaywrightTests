import { Page } from "@playwright/test";
export class ArticlePage{
    private readonly page:Page
    constructor(page:Page){
        this.page=page
    }

    async getCreatedArticleName(){
        return this.page.locator('.container h1')
    }
}