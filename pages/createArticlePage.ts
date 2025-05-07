import { Page } from "@playwright/test";

export class CreateArticlePage{
    private readonly page:Page
    constructor(page:Page){
        this.page=page
    }
    async createNewArticleWithoutTags(articleTitle:string,articleOverview:string,articleDescription:string){
        await this.page.getByPlaceholder('Article Title').fill(articleTitle)
        await this.page.getByPlaceholder("What\'s this article about?").fill(articleOverview)
        await this.page.getByPlaceholder('Write your article (in markdown)').fill(articleDescription)
        await this.page.getByRole('button').click()
    }
    async createNewArticleWithSingleTag(articleTitle:string,articleOverview:string,articleDescription:string,tag:string){
        await this.page.getByPlaceholder('Article Title').fill(articleTitle)
        await this.page.getByPlaceholder("What\'s this article about?").fill(articleOverview)
        await this.page.getByPlaceholder('Write your article (in markdown)').fill(articleDescription)
        await this.page.getByPlaceholder('Enter tags').fill(tag)
        await this.page.getByRole('button').click()
    }
    async createNewArticleWithMultipleTag(articleTitle:string,articleOverview:string,articleDescription:string,tag1:string,tag2:string,tag3:string){
        await this.page.getByPlaceholder('Article Title').fill(articleTitle)
        await this.page.getByPlaceholder("What\'s this article about?").fill(articleOverview)
        await this.page.getByPlaceholder('Write your article (in markdown)').fill(articleDescription)
        await this.page.getByPlaceholder('Enter tags').fill(tag1)
        await this.page.keyboard.press('Enter')
        await this.page.getByPlaceholder('Enter tags').fill(tag2)
        await this.page.keyboard.press('Enter')
        await this.page.getByPlaceholder('Enter tags').fill(tag3)
        await this.page.keyboard.press('Enter')
        await this.page.getByRole('button').click()
    }
}