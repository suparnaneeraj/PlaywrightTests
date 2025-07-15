import {Page} from '@playwright/test'
import { Locator } from '@playwright/test';


export class HomePage{
    private readonly page: Page;
    private popularTags:    Locator;
    private newArticleLink: Locator;
    private globalFeedLink: Locator;
    private articlesList: Locator;

    constructor(page:Page){
        this.page   =   page;
        this.popularTags    =   this.page.locator('div.sidebar .tag-pill');
        this.newArticleLink =   this.page.getByText('New Article');
        this.articlesList   =   this.page.locator('div.article-preview h1');

    }
    async getPopularTags(){
            return this.popularTags;
       }


    async clickOnNewArticle(){
        await this.newArticleLink.click();
    }

    // async getFirstLinkOnGlobalFeed()
    // {
    //     //this.page.waitForTimeout(1000)
    //     await this.page.getByText(' Global Feed ').click()
    //     return this.page.locator('.preview-link h1').first()
    // }
    async getFirstArticleOnTheList(){
        return this.articlesList.first().textContent();
    }

    async clickOnFirstArticle(){
        return this.articlesList.first().click();
    }

    

}