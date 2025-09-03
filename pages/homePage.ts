import {Page} from '@playwright/test'
import { Locator } from '@playwright/test';


export class HomePage{
    private readonly page: Page;
    private popularTags:    Locator;
    private newArticleLink: Locator;
    private globalFeedLink: Locator;
    private articlesList: Locator;
    private homePageMenu:   Locator;

    constructor(page:Page){
        this.page   =   page;
        this.popularTags    =   this.page.locator('div.sidebar .tag-pill');
        this.newArticleLink =   this.page.getByText('New Article');
        this.articlesList   =   this.page.locator('div.article-preview h1');
        this.homePageMenu   =   this.page.locator('.navbar-nav li');
    }
    async getTagsCount(tagValue:string){
        let countOfExitingTags=0;
        for (let tag of await this.popularTags.all()){
            const tagName=await tag.textContent()
            if(tagName==' '+tagValue+' '){
                countOfExitingTags++;
            }
        }
        return countOfExitingTags;
    }


    async clickOnNewArticle(){
        await this.newArticleLink.click();
    }

    getFirstArticleOnTheList(){
        return this.articlesList.first();
    }

    async clickOnFirstArticle(){
        return this.articlesList.first().click();
    }

    verifyHomePage(){
        return this.homePageMenu.first();
    }
  
    getPopularTags():Locator{
        return this.popularTags;
    }

}