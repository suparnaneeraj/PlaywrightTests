import {expect, test} from '../fixtures';
import { generateArticle } from '../../test-data/articles';

test.beforeEach(async({pageManager,page})=>{
    await page.goto('/');
    await pageManager.getLoginPage().loginWithEmailAndPassword('playwright_automation@test.com','Automation1')
    await pageManager.getHomePage().clickOnNewArticle()
    
})

test('should delete an already created article successfully',async({pageManager})=>{
    const article = generateArticle('basic');
    await pageManager.getCreateArticlePage().createNewArticle(article.title,article.description,article.body);
    await pageManager.getArticlePage().deleteArticle()
    const firstArticle= pageManager.getHomePage().getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title);
})

test('should delete the tag from popular tags when the only article with the tag is deleted',async({pageManager})=>{
    const article = generateArticle('oneTag');
    await pageManager.getCreateArticlePage().createNewArticle(article.title,article.description,article.body,article.tagList);
    await pageManager.getArticlePage().deleteArticle()
    const firstArticle= pageManager.getHomePage().getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title)
    if (article.tagList?.length) {
        const tagCount=await pageManager.getHomePage().getTagsCount(article.tagList[0]);
        expect(tagCount).toBeFalsy();
    }

})
test('should not delete the tag from popular tags when an article with the deleted tag exist',async({pageManager})=>{
    let countOfExitingTags=0;
    const article = generateArticle('existingTags');
    await pageManager.getCreateArticlePage().createNewArticle(article.title,article.description,article.body,article.tagList);
    await pageManager.getArticlePage().deleteArticle()
    const firstArticle= pageManager.getHomePage().getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title)
    if (article.tagList?.length) {
        const tagCount=await pageManager.getHomePage().getTagsCount(article.tagList[0]);
        expect(tagCount).toBeTruthy();
    }
    
})