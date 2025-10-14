import {test,expect} from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { generateArticle } from '../test-data/articles';


const username  =   process.env.USERNAME!
const password  =   process.env.PASSWORD!

test.beforeEach(async({page})=>{
    const pageManager=new PageManager(page)
    await page.goto('/');
    await pageManager.onLoginPage().loginWithEmailAndPassword(username,password)
})
test('should be able to create a new article without tags successfully',async({page})=>{
    const pageManager=new PageManager(page)
    const article = generateArticle('basic');
    await pageManager.onHomePage().clickOnNewArticle();
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description);
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
})
test('should be able to create a new article with a single tag successfully',async({page})=>{
    const pageManager=new PageManager(page)
    const article = generateArticle('oneTag');
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description,article.tags);
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title)
    const tagCreated=pageManager.onArticlePage().getTags()
    await expect(tagCreated).toHaveText(article.tags);
})
test('should be able to create a new article with multiple tags successfully',async({page})=>{
    const pageManager=new PageManager(page)
    const article = generateArticle('multiTag');
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description,article.tags)
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
    const tagCreated= pageManager.onArticlePage().getTags()
    await expect(tagCreated).toHaveText(article.tags)
})
test('should be able to create a new article with already existing tags successfully',async({page})=>{
    const pageManager=new PageManager(page)
    const article = generateArticle('existingTags');
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description,article.tags);
    const createdArticle= pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
    const tagCreated=  pageManager.onArticlePage().getTags()
    await expect(tagCreated).toHaveText(article.tags);
    await pageManager.onArticlePage().goToHomePage()
    const popularTags=pageManager.onHomePage().getPopularTags();
    await expect(popularTags.first()).toBeVisible();
    const tagCount= await pageManager.onHomePage().getTagsCount(article.tags[0]);
    expect(tagCount).toEqual(1)
})




