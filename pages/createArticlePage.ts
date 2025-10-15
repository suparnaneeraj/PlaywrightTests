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

    async createNewArticle(articleTitle:string,articleOverview:string,articleDescription:string,tags?:string[]){
        await this.articleTitleField.fill(articleTitle);
        await this.articleOverviewField.fill(articleOverview);
        await this.articleDescriptionField.fill(articleDescription);
        if (tags && tags.length > 0) {
            for (const tag of tags) {
            await this.tagsField.fill(tag);
            await this.page.keyboard.press('Enter');
            }
        }
        await this.submitArticleButton.click();
    }

    async editArticle(newArticleName:string, newDescription:string,  newTag?:string[]){
        await this.articleTitleField.clear();
        await this.articleTitleField.fill(newArticleName);
        await this.articleDescriptionField.clear()
        await this.articleDescriptionField.fill(newDescription);
        if (newTag?.length) {
            await this.tagsField.fill(newTag[0]);
        }
        
        await this.page.keyboard.press('Enter');  
        await this.submitArticleButton.click();
    }

    getArticleNameInEditPage():Locator{
        return this.articleTitleField;
    }
    
}

