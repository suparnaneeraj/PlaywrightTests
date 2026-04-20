import {test, expect } from '../fixtures';
import { Article, generateArticle } from '../../test-data/articles';

const username=process.env.USERNAME!;
const password=process.env.PASSWORD!
let article : Article;
let editedArticleSlug: string;
let createdArticleSlug: string;
let token: string;
test.beforeEach(async({loginPage, page, homePage, createArticlePage, articlePage})=>{
    article = generateArticle('oneTag');
    await page.goto('/');
    const loginResponsePromise = page.waitForResponse(response =>
    response.url().includes('/api/users/login') &&
    response.request().method() === 'POST'
    );
    await loginPage.loginWithEmailAndPassword(username,password);
    const loginResponse = await loginResponsePromise;
    const loginResponseBody = await loginResponse.json();
    token = loginResponseBody.user.token;
    await homePage.clickOnNewArticle();
    const createArticleResponsePromise = page.waitForResponse(response =>
    response.url().includes('/api/articles') &&
    response.request().method() === 'POST'
    );
    await createArticlePage.createNewArticle(article.title,article.description,article.body,article.tagList);
    const createArticleResponse = await createArticleResponsePromise;
    const createArticleResponseBody = await createArticleResponse.json();
    createdArticleSlug = createArticleResponseBody.article.slug;  
    const createdArticle = articlePage.getCreatedArticleName(); 
    await expect(createdArticle).toBeVisible();
    await expect(createdArticle).toHaveText(article.title);
})
test('should edit title, body, and tags of an existing article',async({createArticlePage, articlePage, page})=>{
    await articlePage.clickEditArticleButton(article.title);
    const articleNameInEditPage=createArticlePage.getArticleNameInEditPage();
    await expect(articleNameInEditPage).toHaveValue(article.title);
    const newArticle=generateArticle('oneTag');
    const editArticleResponsePromise = page.waitForResponse(response =>
    response.url().includes(`/api/articles/${createdArticleSlug}`) &&
    response.request().method() === 'PUT'
    );
    await createArticlePage.editArticle(newArticle.title,newArticle.body,newArticle.tagList);
    const editArticleResponse = await editArticleResponsePromise;
    const editArticleResponseBody = await editArticleResponse.json();
    editedArticleSlug = editArticleResponseBody.article.slug;  
    const articleDetails= articlePage.getArticleDetails();
    await expect(articleDetails.title).toHaveText(newArticle.title);
    await expect(articleDetails.body).toHaveText(newArticle.body);
    if (article.tagList?.length) {
        for (const tag of article.tagList) {
        await expect(articleDetails.tags).toContainText(tag);
        }
    }
    if (newArticle.tagList?.length) {
    for (const tag of newArticle.tagList) {
      await expect(articleDetails.tags).toContainText(tag);
    }
    }

})

test.afterEach(async({deleteArticleAPI})=>{
    const response = await deleteArticleAPI.deleteArticleAPI(editedArticleSlug,token);
    expect(response.status()).toBe(204);
})