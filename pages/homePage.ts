import {Page} from '@playwright/test'
import { Locator } from '@playwright/test';
import { HeaderComponent } from './headerComponent';


export class HomePage{
    private readonly page: Page;
    private popularTags:    Locator;
    private newArticleLink: Locator;
    //private globalFeedLink: Locator;
    private articlesList: Locator;
    private homePageMenu:   Locator;
    private articlesTag:Locator;
    readonly header: HeaderComponent;

    constructor(page:Page){
        this.page   =   page;
        this.popularTags    =   this.page.locator('div.sidebar .tag-pill');
        this.newArticleLink =   this.page.getByText('New Article');
        this.articlesList   =   this.page.locator('div.article-preview h1');
        this.homePageMenu   =   this.page.locator('.navbar-nav li');
        this.articlesTag    =   this.page.locator('ul.tag-list');
        this.header = new HeaderComponent(this.page);
    }
    async getTagsCount(tagValue:string){
        let countOfExitingTags=0;
        for (let tag of await this.popularTags.all()){
            const tagName=await tag.textContent()
            if(tagName==' '+tagValue+' '){
                countOfExitingTags++;
            }
        }
        return countOfExitingTags;
    }

    getFirstArticleOnTheList(){
        return this.articlesList.first();
    }

    async clickOnFirstArticle(){
        return this.articlesList.first().click();
    }

    getPopularTags():Locator{
        return this.popularTags;
    }

    async verifyArticlesInATag(tagName:string){
        let tagMatch=false;
        await this.popularTags.getByText(tagName,{exact:true}).click();
        await this.getFirstArticleOnTheList().waitFor({ state: 'visible' });
        for(const tagSet of await this.articlesTag.all()){
            const tagsWithinArticle= tagSet.locator('li.tag-pill');
            for(const tags of await tagsWithinArticle.all()){
                const tag=(await tags.textContent())?.trim();
                if(tag==tagName){
                    tagMatch=true;
                    break;
                }
            }
        }
        return tagMatch;
    }

    async likeArticle(articleName:string,clickLikeRequired:number){
        const likeLocator=this.page.locator('.article-preview').filter({has:this.page.getByRole('heading',{name:articleName})}).locator('app-favorite-button button');
        if(clickLikeRequired){
            likeLocator.click();
        }
        return likeLocator;
    }

}