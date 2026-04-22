import {expect, test} from '../fixtures';
import { generateArticle } from '../../test-data/articles';

test.beforeEach(async({loginPage,page, homePage})=>{
    await page.goto('/');
    await loginPage.loginWithEmailAndPassword('playwright_automation@test.com','Automation1')
    await homePage.header.clickNewArticle();
    
})

test('should delete an already created article successfully',async({articlePage, createArticlePage, homePage})=>{
    const article = generateArticle('basic');
    await createArticlePage.createNewArticle(article.title,article.description,article.body);
    await articlePage.deleteArticle()
    const firstArticle= homePage.getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title);
})

test('should delete the tag from popular tags when the only article with the tag is deleted',async({createArticlePage, homePage,articlePage})=>{
    const article = generateArticle('oneTag');
    await createArticlePage.createNewArticle(article.title,article.description,article.body,article.tagList);
    await articlePage.deleteArticle()
    const firstArticle= homePage.getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title)
    if (article.tagList?.length) {
        const tagCount=await homePage.getTagsCount(article.tagList[0]);
        expect(tagCount).toBeFalsy();
    }

})
test('should not delete the tag from popular tags when an article with the deleted tag exist',async({createArticlePage, homePage, articlePage})=>{
    let countOfExitingTags=0;
    const article = generateArticle('existingTags');
    await createArticlePage.createNewArticle(article.title,article.description,article.body,article.tagList);
    await articlePage.deleteArticle()
    const firstArticle= homePage.getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title)
    if (article.tagList?.length) {
        const tagCount=await homePage.getTagsCount(article.tagList[0]);
        expect(tagCount).toBeTruthy();
    }
    
})