import {Page} from '@playwright/test'

export class HomePage{
    private readonly page: Page

    constructor(page:Page){
        this.page=page
    }
    async getPopularTags(){
        const tags= this.page.locator('div.sidebar').filter({has:this.page.locator('p',{hasText:'Popular Tags'})}).locator('.tag-default').all()
    
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
        await this.page.locator('div.article-preview h1').first().textContent()
    }


}