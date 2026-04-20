import {test as base} from '@playwright/test';
import { CreateArticlePage } from '../pages/createArticlePage';
import { HomePage } from '../pages/homePage';
import { ArticlePage } from '../pages/articlePage';
import { LoginPage } from '../pages/loginPage';
import { DeleteArticle } from '../apis/deleteArticle.api'

type MyFixtures ={
    loginPage : LoginPage;
    homePage : HomePage;
    createArticlePage : CreateArticlePage;
    articlePage : ArticlePage;
    deleteArticleAPI : DeleteArticle;

}
export const test = base.extend<MyFixtures>({
    loginPage : async({page},use)=>{
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    homePage : async({page},use)=>{
        const homePage = new HomePage(page);
        await use(homePage);
    },
    createArticlePage : async({page, request},use)=>{
        const createArticlePage = new CreateArticlePage(page);
        await use(createArticlePage);
        const deleteArticleAPI = new DeleteArticle(request);
        //deleteArticleAPI.deleteArticleAPI()
    },
    articlePage : async({page},use)=>{
        const articlePage = new ArticlePage(page);
        await use(articlePage);
    },
    deleteArticleAPI : async({request},use)=>{
       const deleteArticleAPI = new DeleteArticle(request);
       await use(deleteArticleAPI);
    }
});
export {expect} from '@playwright/test';