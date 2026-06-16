import {test as base, Page} from '@playwright/test';
import { CreateArticlePage } from '../pages/createArticlePage';
import { HomePage } from '../pages/homePage';
import { ArticlePage } from '../pages/articlePage';
import { LoginPage } from '../pages/loginPage';
import { DeleteArticle } from '../apis/deleteArticle.api'
import { ArticleAPIs } from '../apis/articles.api';
import { LoginAPI } from '../apis/login.api';

type MyFixtures ={
    loginPage : LoginPage;
    homePage : HomePage;
    createArticlePage : CreateArticlePage;
    articlePage : ArticlePage;
    deleteArticleAPI : DeleteArticle;
    createArticleAPI : ArticleAPIs;
    loginAPI : LoginAPI;
    authToken : string
    authenticatedPage : Page;
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
    },
    createArticleAPI: async({request},use)=>{
        const createArticleAPI = new ArticleAPIs(request);
        await use(createArticleAPI);
    },
    loginAPI :async({request},use)=>{
        const loginAPI = new LoginAPI(request);
        await use(loginAPI);
    },
    authToken: async ({ loginAPI }, use) => {
        const username = process.env.USERNAME!;
        const password = process.env.PASSWORD!;
        const response = await loginAPI.loginAPI(username, password);
        const responseBody = await response.json();
        const token = responseBody.user.token;
        await use(token);
    },
    authenticatedPage: async ({ page, authToken }, use) => {
        await page.addInitScript((token) => {
        window.localStorage.setItem('jwtToken', token);
        }, authToken);
        await use(page);
    },
});
export {expect} from '@playwright/test';