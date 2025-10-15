import {test,expect} from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { generateArticle } from '../test-data/articles';

const username  =   process.env.USERNAME!
const password  =   process.env.PASSWORD!
let pageManager:PageManager;
test.beforeEach(async({page})=>{
    pageManager=new PageManager(page)
    await page.goto('/');
    await pageManager.onLoginPage().loginWithEmailAndPassword(username,password)
})
test('should be able to create a new article without tags successfully',async({})=>{
    const article = generateArticle('basic');
    await pageManager.onHomePage().clickOnNewArticle();
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description);
    const createdArticle= pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
})
test('should be able to create a new article with a single tag successfully',async({})=>{
    const article = generateArticle('oneTag');
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description,article.tags);
    const createdArticle= pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title)
    const tagCreated=pageManager.onArticlePage().getTags()
    if (article.tags?.length) {
        await expect(tagCreated).toHaveText(article.tags);
    }
})
test('should be able to create a new article with multiple tags successfully',async({})=>{
    const article = generateArticle('multiTag');
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description,article.tags)
    const createdArticle= pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
    const tagCreated= pageManager.onArticlePage().getTags()
    if (article.tags?.length) {
     await expect(tagCreated).toHaveText(article.tags);
    }
})
test('should be able to create a new article with already existing tags successfully',async({})=>{
    const article = generateArticle('existingTags');
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description,article.tags);
    const createdArticle= pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
    const tagCreated=  pageManager.onArticlePage().getTags()
    if (article.tags?.length) {
        await expect(tagCreated).toHaveText(article.tags);
    }
    await pageManager.onArticlePage().goToHomePage()
    const popularTags=pageManager.onHomePage().getPopularTags();
    await expect(popularTags.first()).toBeVisible();
    if (article.tags?.length) {
        const tagCount= await pageManager.onHomePage().getTagsCount(article.tags[0]);
        expect(tagCount).toEqual(1);
    }
    
})




