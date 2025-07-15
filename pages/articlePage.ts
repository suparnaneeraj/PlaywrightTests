import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class ArticlePage{
    private readonly page:Page;
    private createdArticleName: Locator;
    private tags: Locator;
    private deleteArticleButton: Locator;
    private homePageLink: Locator;

    constructor(page:Page){
        this.page   =   page;
        this.createdArticleName =   this.page.locator('.container h1');
        this.tags   =   this.page.locator('.tag-pill');
        this.deleteArticleButton    =   this.page.locator('div.container').filter({has:this.page.locator('h1')}).getByRole('button',{name:'Delete Article'});
        this.homePageLink   =   this.page.getByText('Home');
    }

    async getCreatedArticleName(){
        return await this.createdArticleName.textContent();
    }
    async getTags(){
        return await this.tags.allTextContents();
    }
    async deleteArticle(){
        await this.deleteArticleButton.click();
    }

    async goToHomePage(){
        await this.homePageLink.click();
    }

}