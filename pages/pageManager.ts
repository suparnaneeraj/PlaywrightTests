import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { HomePage } from "./homePage";
import { CreateArticlePage } from "./createArticlePage";
import { ArticlePage } from "./articlePage";
import { EditArticlePage } from "./editArticlePage";

export class PageManager{
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly homePage: HomePage;
    private readonly createArticlePage: CreateArticlePage;
    private readonly articlePage: ArticlePage;
    private readonly editArticlePage: EditArticlePage;
    constructor(page:Page){
        this.page   =   page;
        this.loginPage  =   new LoginPage(page);
        this.homePage   =  new HomePage(page);
        this.createArticlePage  = new CreateArticlePage(page);
        this.articlePage    =   new ArticlePage(page);
        this.editArticlePage    =   new EditArticlePage(page);
    }

    onLoginPage(){
        return this.loginPage;
    }
    onHomePage(){
        return this.homePage;
    }
    onCreateArticlePage(){
        return this.createArticlePage;
    }
    onArticlePage(){
        return this.articlePage;
    }
    onEditArticlePage(){
        return this.editArticlePage;
    }
}