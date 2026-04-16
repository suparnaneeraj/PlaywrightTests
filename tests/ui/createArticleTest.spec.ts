import {test,expect} from '../fixtures';
import { generateArticle } from '../../test-data/articles';

const username  =   process.env.USERNAME!
const password  =   process.env.PASSWORD!

test.beforeEach(async({pageManager,page})=>{
    await page.goto('/');
    await pageManager.getLoginPage().loginWithEmailAndPassword(username,password)
})
test('should be able to create a new article without tags successfully',async({pageManager})=>{
    const article = generateArticle('basic');
    await pageManager.getHomePage().clickOnNewArticle();
    await pageManager.getCreateArticlePage().createNewArticle(article.title,article.description,article.body);
    const createdArticle= pageManager.getArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
})
test('should be able to create a new article with a single tag successfully',async({pageManager})=>{
    const article = generateArticle('oneTag');
    await pageManager.getHomePage().clickOnNewArticle()
    await pageManager.getCreateArticlePage().createNewArticle(article.title,article.description,article.body,article.tagList);
    const createdArticle= pageManager.getArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title)
    const tagCreated=pageManager.getArticlePage().getTags()
    if (article.tagList?.length) {
        await expect(tagCreated).toHaveText(article.tagList);
    }
})
test('should be able to create a new article with multiple tags successfully',async({pageManager})=>{
    const article = generateArticle('multiTag');
    await pageManager.getHomePage().clickOnNewArticle()
    await pageManager.getCreateArticlePage().createNewArticle(article.title,article.description,article.body,article.tagList)
    const createdArticle= pageManager.getArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
    const tagCreated= pageManager.getArticlePage().getTags()
    if (article.tagList?.length) {
     await expect(tagCreated).toHaveText(article.tagList);
    }
})
test('should be able to create a new article with already existing tags successfully',async({pageManager})=>{
    const article = generateArticle('existingTags');
    await pageManager.getHomePage().clickOnNewArticle()
    await pageManager.getCreateArticlePage().createNewArticle(article.title,article.description,article.body,article.tagList);
    const createdArticle= pageManager.getArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText(article.title);
    const tagCreated=  pageManager.getArticlePage().getTags()
    if (article.tagList?.length) {
        await expect(tagCreated).toHaveText(article.tagList);
    }
    await pageManager.getArticlePage().goToHomePage()
    const popularTags=pageManager.getHomePage().getPopularTags();
    await expect(popularTags.first()).toBeVisible();
    if (article.tagList?.length) {
        const tagCount= await pageManager.getHomePage().getTagsCount(article.tagList[0]);
        expect(tagCount).toEqual(1);
    }
    
})




