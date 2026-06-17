import {expect, test} from '../fixtures';
import { generateArticle } from '../../test-data/articles';


let slugId : string;

test('should delete an already created article successfully',async({articlePage, createArticleAPI, homePage, authToken, authenticatedPage})=>{
    const article = generateArticle('basic');
    const createArticleResponseJson = await (await createArticleAPI.createArticleAPI(authToken, article)).json();
    slugId = createArticleResponseJson.article.slug;
    await authenticatedPage.goto(`/article/${slugId}`);
    await articlePage.deleteArticle()
    const firstArticle= homePage.getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title);
})

test('should delete the tag from popular tags when the only article with the tag is deleted',async({createArticleAPI, homePage,articlePage, authToken, authenticatedPage})=>{
    const article = generateArticle('oneTag');
    const createArticleResponseJson = await (await createArticleAPI.createArticleAPI(authToken, article)).json();
    slugId = createArticleResponseJson.article.slug;
    await authenticatedPage.goto(`/article/${slugId}`);
    await articlePage.deleteArticle()
    const firstArticle= homePage.getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title)
    if (article.tagList?.length) {
        const tagCount=await homePage.getTagsCount(article.tagList[0]);
        expect(tagCount).toBeFalsy();
    }

})
test('should not delete the tag from popular tags when an article with the deleted tag exist',async({createArticleAPI, homePage, articlePage, authToken, authenticatedPage})=>{
    let countOfExitingTags=0;
    const article = generateArticle('existingTags');
    const createArticleResponseJson = await (await createArticleAPI.createArticleAPI(authToken, article)).json();
    slugId = createArticleResponseJson.article.slug;
    await authenticatedPage.goto(`/article/${slugId}`);
    await articlePage.deleteArticle()
    const firstArticle= homePage.getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title)
    if (article.tagList?.length) {
        const tagCount=await homePage.getTagsCount(article.tagList[0]);
        expect(tagCount).toBeTruthy();
    }
    
})