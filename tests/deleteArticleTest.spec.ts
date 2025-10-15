import {expect, Page, test} from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { generateArticle } from '../test-data/articles';

let pageManager : PageManager;
test.beforeEach(async({page})=>{
    await page.goto('/');
    pageManager=new PageManager(page)
    await pageManager.onLoginPage().loginWithEmailAndPassword('playwright_automation@test.com','Automation1')
    await pageManager.onHomePage().clickOnNewArticle()
    
})

test('should delete an already created article successfully',async({})=>{
    const article = generateArticle('basic');
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description);
    await pageManager.onArticlePage().deleteArticle()
    const firstArticle= pageManager.onHomePage().getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title);
})

test('should delete the tag from popular tags when the only article with the tag is deleted',async({})=>{
    const article = generateArticle('oneTag');
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description,article.tags);
    await pageManager.onArticlePage().deleteArticle()
    const firstArticle= pageManager.onHomePage().getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title)
    if (article.tags?.length) {
        const tagCount=await pageManager.onHomePage().getTagsCount(article.tags[0]);
        expect(tagCount).toBeFalsy();
    }

})
test('should not delete the tag from popular tags when an article with the deleted tag exist',async({})=>{
    let countOfExitingTags=0;
    const article = generateArticle('existingTags');
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description,article.tags);
    await pageManager.onArticlePage().deleteArticle()
    const firstArticle= pageManager.onHomePage().getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(article.title)
    if (article.tags?.length) {
        const tagCount=await pageManager.onHomePage().getTagsCount(article.tags[0]);
        expect(tagCount).toBeTruthy();
    }
    
})