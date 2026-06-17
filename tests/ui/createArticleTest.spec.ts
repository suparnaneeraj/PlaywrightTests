import {test,expect} from '../fixtures';
import { generateArticle } from '../../test-data/articles';

let createdArticleSlug: string;
let token : string;

test.beforeEach(async({authenticatedPage})=>{
    await authenticatedPage.goto('/');
})
test('should be able to create a new article without tags successfully',async({createArticlePage, homePage, articlePage, page})=>{
    const article = generateArticle('basic');
    await homePage.header.clickNewArticle();
    const createArticleResponsePromise = page.waitForResponse(response =>
    response.url().includes('/api/articles') &&
    response.request().method() === 'POST'
    );
    await createArticlePage.createNewArticle(article.title,article.description,article.body);
    const createArticleResponse = await createArticleResponsePromise;
    const createArticleResponseBody = await createArticleResponse.json();
    createdArticleSlug = createArticleResponseBody.article.slug;
    const createdArticle= articlePage.getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
})
test('should be able to create a new article with a single tag successfully',async({homePage, createArticlePage, articlePage, page})=>{
    const article = generateArticle('oneTag');
    await homePage.header.clickNewArticle();
    const createArticleResponsePromise = page.waitForResponse(response =>
    response.url().includes('/api/articles') &&
    response.request().method() === 'POST'
    );
    await createArticlePage.createNewArticle(article.title,article.description,article.body,article.tagList);
    const createArticleResponse = await createArticleResponsePromise;
    const createArticleResponseBody = await createArticleResponse.json();
    createdArticleSlug = createArticleResponseBody.article.slug;
    const createdArticle= articlePage.getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title)
    const tagCreated = articlePage.getTags()
    const createdTagsCount = await tagCreated.count();
    expect(article.tagList?.length).toBe(createdTagsCount);
    for(const tag of await tagCreated.all()){
        const text = (await tag.textContent())?.trim().toLowerCase();
        expect(article.tagList).toContain(text);
    }
})
test('should be able to create a new article with multiple tags successfully',async({createArticlePage, homePage, articlePage, page})=>{
    const article = generateArticle('multiTag');
    await homePage.header.clickNewArticle();
    const createArticleResponsePromise = page.waitForResponse(response =>
    response.url().includes('/api/articles') &&
    response.request().method() === 'POST'
    );
    await createArticlePage.createNewArticle(article.title,article.description,article.body,article.tagList)
    const createArticleResponse = await createArticleResponsePromise;
    const createArticleResponseBody = await createArticleResponse.json();
    createdArticleSlug = createArticleResponseBody.article.slug;
    const createdArticle= articlePage.getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
    const tagCreated= articlePage.getTags()
    if (article.tagList?.length) {
     await expect(tagCreated).toHaveText(article.tagList);
    }
})
test('should be able to create a new article with already existing tags successfully',async({homePage, page, createArticlePage, articlePage})=>{
    const article = generateArticle('existingTags');
    await homePage.header.clickNewArticle();
    const createArticleResponsePromise = page.waitForResponse(response =>
    response.url().includes('/api/articles') &&
    response.request().method() === 'POST'
    );
    await createArticlePage.createNewArticle(article.title,article.description,article.body,article.tagList);
    const createArticleResponse = await createArticleResponsePromise;
    const createArticleResponseBody = await createArticleResponse.json();
    createdArticleSlug = createArticleResponseBody.article.slug;
    const createdArticle= articlePage.getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
    const tagCreated=  articlePage.getTags()
    if (article.tagList?.length) {
        await expect(tagCreated).toHaveText(article.tagList);
    }
    await articlePage.goToHomePage()
    const popularTags = homePage.getPopularTags();
    await expect(popularTags.first()).toBeVisible();
    if (article.tagList?.length) {
        const tagCount= await homePage.getTagsCount(article.tagList[0]);
        expect(tagCount).toEqual(1);
    }
    
})

test.afterEach(async({deleteArticleAPI, authToken})=>{
    const response = await deleteArticleAPI.deleteArticleAPI(createdArticleSlug,authToken);
    expect(response.status()).toBe(204);
})
