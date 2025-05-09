import {Page} from '@playwright/test'
import { text } from 'stream/consumers'

export class HomePage{
    private readonly page: Page

    constructor(page:Page){
        this.page=page
    }
    async getPopularTags(){
            return this.page.locator('div.sidebar .tag-pill')
       }


    async clickOnNewArticle(){
        await this.page.getByText('New Article').click()
    }

    async getFirstLinkOnGlobalFeed()
    {
        //this.page.waitForTimeout(1000)
        await this.page.getByText(' Global Feed ').click()
        return this.page.locator('.preview-link h1').first()
    }
    async getFirstArticleOnTheList(){
        return this.page.locator('div.article-preview h1').first().textContent()
    }

    async clickOnFirstArticle(){
        return await this.page.locator('div.article-preview h1').first().click()
    }

    

}