import {test, expect } from '../fixtures';
import { Article, generateArticle } from '../../test-data/articles';
import { waitForApiResponse } from '../../helpers/networkHelper';

let article : Article;
let editedArticleSlug: string;
let createdArticleSlug: string;

test.beforeEach(async({authenticatedPage, authToken, articlePage, createArticleAPI})=>{
    article = generateArticle('oneTag');
    const createArticleResponse = await createArticleAPI.createArticleAPI(authToken, article);
    createdArticleSlug = (await createArticleResponse.json()).article.slug;
    await authenticatedPage.goto(`/article/${createdArticleSlug}`);
    const createdArticle = articlePage.getCreatedArticleName(); 
    await expect(createdArticle).toBeVisible();
    await expect(createdArticle).toHaveText(article.title);
})
test('should edit title, body, and tags of an existing article',async({createArticlePage, articlePage, page})=>{
    await articlePage.clickEditArticleButton(article.title);
    const articleNameInEditPage=createArticlePage.getArticleNameInEditPage();
    await expect(articleNameInEditPage).toHaveValue(article.title);
    const newArticle=generateArticle('oneTag');
    const editArticleResponsePromise = waitForApiResponse(page, `/api/articles/${createdArticleSlug}`, 'PUT');
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

test.afterEach(async({deleteArticleAPI, authToken})=>{
    const response = await deleteArticleAPI.deleteArticleAPI(editedArticleSlug,authToken);
    expect(response.status()).toBe(204);
})