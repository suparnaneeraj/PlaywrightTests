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
}