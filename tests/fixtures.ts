import {test as base} from '@playwright/test';
import { CreateArticlePage } from '../pages/createArticlePage';
import { HomePage } from '../pages/homePage';
import { ArticlePage } from '../pages/articlePage';
import { LoginPage } from '../pages/loginPage';
import { PageManager } from '../pages/pageManager';

type MyFixtures ={
    /*loginPage : LoginPage;
    homePage : HomePage;
    createArticlePage : CreateArticlePage;
    articlePage : ArticlePage;*/
    pageManager : PageManager;
}
export const test = base.extend<MyFixtures>({
    pageManager : async({page},use)=>{
        const pageManager = new PageManager(page);
        await use(pageManager);
    }/*,
    loginPage : async({page},use)=>{
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    homePage : async({page},use)=>{
        const homePage = new HomePage(page);
        await use(homePage);
    },
    createArticlePage : async({page},use)=>{
        const createArticlePage = new CreateArticlePage(page);
        await use(createArticlePage);
    },
    articlePage : async({page},use)=>{
        const articlePage = new ArticlePage(page);
        await use(articlePage);
    }*/
});
export {expect} from '@playwright/test';