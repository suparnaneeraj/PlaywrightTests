import { Locator, Page } from "@playwright/test";

export class CreateArticlePage{
    private readonly page:Page;
    private articleTitleField:  Locator;
    private articleOverviewField:   Locator;
    private articleDescriptionField:   Locator;
    private submitArticleButton:   Locator;
    private tagsField:   Locator;

    constructor(page:Page){
        this.page   =  page;
        this.articleTitleField  =   this.page.getByPlaceholder('Article Title');
        this.articleOverviewField   =   this.page.getByPlaceholder("What\'s this article about?");
        this.articleDescriptionField    =   this.page.getByPlaceholder('Write your article (in markdown)');
        this.submitArticleButton    =   this.page.getByRole('button');
        this.tagsField  =   this.page.getByPlaceholder('Enter tags');
    }
    async createNewArticleWithoutTags(articleTitle:string,articleOverview:string,articleDescription:string){
        await this.articleTitleField.fill(articleTitle);
        await this.articleOverviewField.fill(articleOverview);
        await this.articleDescriptionField.fill(articleDescription);
        await this.submitArticleButton.click();
    }
    async createNewArticleWithSingleTag(articleTitle:string,articleOverview:string,articleDescription:string,tag:string){
        await this.articleTitleField.fill(articleTitle);
        await this.articleOverviewField.fill(articleOverview);
        await this.articleDescriptionField.fill(articleDescription);
        await this.tagsField.fill(tag);
        await this.submitArticleButton.click();
    }
    async createNewArticleWithMultipleTag(articleTitle:string,articleOverview:string,articleDescription:string,tag1:string,tag2:string,tag3:string){
        await this.articleTitleField.fill(articleTitle);
        await this.articleOverviewField.fill(articleOverview);
        await this.articleDescriptionField.fill(articleDescription);
        await this.tagsField.fill(tag1);
        await this.page.keyboard.press('Enter');  // need to refactor
        await this.tagsField.fill(tag2);
        await this.page.keyboard.press('Enter');
        await this.tagsField.fill(tag3);
        await this.page.keyboard.press('Enter');
        await this.submitArticleButton.click();
    }
}