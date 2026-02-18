import {APIRequestContext, expect, test} from '@playwright/test';
import { ArticleAPIs } from '../../apis/articles.api';
import { LoginAPI } from '../../apis/login.api';
import { generateArticle } from '../../test-data/articles';

let loginAPI : LoginAPI;
let articlesAPI : ArticleAPIs;
let loginToken : string;
let apiRequest : APIRequestContext;
test.beforeEach(async({browser})=>{
    apiRequest = (await browser.newContext()).request;
    loginAPI=new LoginAPI(apiRequest);
    const loginResponse = await loginAPI.loginAPI();
    expect (loginResponse.status()).toBe(200);
    const loginResponseBody = await  loginResponse.json();
    loginToken = await loginResponseBody.user.token;
    articlesAPI = new ArticleAPIs(apiRequest)
    
})
test('should create an article without tags successfully using API',async()=>{
    const createArticleResponse=await articlesAPI.createArticleAPI(loginToken,generateArticle('basic'));
    const createArticleResponseBody = await createArticleResponse.json();
    expect(createArticleResponse.status()).toBe(201);
    expect(createArticleResponseBody.article.slug).not.toBeNull();
    expect((createArticleResponseBody.article.tagList).length).toBeFalsy();
})

test('should return success response for article creation with tags', async({page})=>{
    const createArticleResponse = await articlesAPI.createArticleAPI(loginToken,generateArticle('multiTag'));
    expect(createArticleResponse.status()).toBe(201);
    const createArticleResponseJson = await createArticleResponse.json();
    expect(createArticleResponseJson.article.slug).not.toBeNull();
    expect((createArticleResponseJson.article.tagList).length).toBeGreaterThan(1);
})