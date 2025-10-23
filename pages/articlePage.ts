import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class ArticlePage{
    private readonly page:Page;
    private createdArticleName: Locator;
    private tags: Locator;
    private deleteArticleButton: Locator;
    private homePageLink: Locator;
    private editArticleButton:  Locator;
    private articleDescription:Locator;
    private allTags:Locator;
    constructor(page:Page){
        this.page   =   page;
        this.createdArticleName =   this.page.locator('.container h1');
        this.allTags    =   this.page.locator('.tag-list');
        this.tags   =   this.page.locator('.tag-pill');
        this.deleteArticleButton    =   this.page.locator('div.container').filter({has:this.page.locator('h1')}).getByRole('button',{name:'Delete Article'});
        this.homePageLink   =   this.page.getByText('Home');
        this.editArticleButton =   this.page.locator('div.container').filter({has:this.page.locator('h1')}).getByText('Edit Article');
        this.articleDescription =   this.page.locator('.article-content').locator('p');
    
    }

    getCreatedArticleName(){
        return  this.createdArticleName;
    }
    getTags():Locator{
        return this.tags;
    }
    async deleteArticle(){
        await this.deleteArticleButton.click();
    }

    async goToHomePage(){
        await this.homePageLink.click();
    }

    async clickEditArticleButton(articleName:string){
        await this.editArticleButton.click();
    }

    async getArticleDetails():Promise<[Locator, Locator, Locator]>{
        const articleNameLocator= this.createdArticleName;
        const articleDescriptionLocator= this.articleDescription;
        const tagNames= this.allTags;
       return [articleNameLocator,articleDescriptionLocator,tagNames];
    }

}