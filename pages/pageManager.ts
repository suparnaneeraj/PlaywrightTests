import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { HomePage } from "./homePage";
import { CreateArticlePage } from "./createArticlePage";
import { ArticlePage } from "./articlePage";


export class PageManager{
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly homePage: HomePage;
    private readonly createArticlePage: CreateArticlePage;
    private readonly articlePage: ArticlePage;
    constructor(page:Page){
        this.page   =   page;
        this.loginPage  =   new LoginPage(page);
        this.homePage   =  new HomePage(page);
        this.createArticlePage  = new CreateArticlePage(page);
        this.articlePage    =   new ArticlePage(page);

    }

    getLoginPage(){
        return this.loginPage;
    }
    getHomePage(){
        return this.homePage;
    }
    getCreateArticlePage(){
        return this.createArticlePage;
    }
    getArticlePage(){
        return this.articlePage;
    }

}