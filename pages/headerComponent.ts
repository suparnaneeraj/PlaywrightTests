import {Locator, Page} from '@playwright/test';

export class HeaderComponent{
    private readonly page: Page;
    readonly appTitle: Locator;
    readonly homePageLink:Locator;
    readonly createNewArticleLink: Locator;
    readonly settingPageLink: Locator;
    readonly profilePageLink: Locator;


    constructor(page:Page){
        this.page = page;
        this.appTitle = this.page.locator('navbar-brand');
        this.homePageLink = this.page.getByRole('link',{name: 'Home'});
        this.createNewArticleLink = this.page.getByRole('link',{name: 'New Article'});
        this.settingPageLink = this.page.getByRole('link',{name: 'Settings'});
        this.profilePageLink = this.page.locator('a.nav-link[href*="/profile/"]');
    }

    async getAppTitle(){
        return this.appTitle.textContent();
    }
    async clickHome(){
        await this.homePageLink.click();
    }
    async clickNewArticle(){
        await this.createNewArticleLink.click();
    }
    async clickSettings(){
        await this.settingPageLink.click();
    }
    async clickProfile(){
        await this.profilePageLink.click();
    }   


}