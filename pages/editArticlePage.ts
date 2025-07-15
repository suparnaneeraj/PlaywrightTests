import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class EditArticlePage{
    private readonly page:  Page;
    private articleTitleField:  Locator;
    private articleOverviewField:   Locator;
    private articleDescriptionField:   Locator;
    private submitArticleButton:   Locator;
    private tagsField:   Locator;
    constructor(page:Page){
        this.page   =   page;
        this.articleTitleField  =   this.page.getByPlaceholder('Article Title');
        this.articleOverviewField   =   this.page.getByPlaceholder("What\'s this article about?");
        this.articleDescriptionField    =   this.page.getByPlaceholder('Write your article (in markdown)');
        this.submitArticleButton    =   this.page.getByRole('button');
        this.tagsField  =   this.page.getByPlaceholder('Enter tags');
    }
    




}