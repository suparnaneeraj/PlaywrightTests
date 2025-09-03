import {test,expect} from '@playwright/test'
import { PageManager } from '../pages/pageManager'

const username  =   process.env.USERNAME!
const password  =   process.env.PASSWORD!

test.beforeEach(async({page})=>{
    const pageManager=new PageManager(page)
    await page.goto('/');
    await pageManager.onLoginPage().loginWithEmailAndPassword(username,password)
})
test('should be able to create a new article without tags successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticle('Article1','Test Article','Article To test the automation code')
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText('Article1')
})
test('should be able to create a new article with a single tag successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticle('Article23','Test Article','Article To test the automation code',['TestTag'])
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText('Article23')
    const tagCreated=pageManager.onArticlePage().getTags()
    await expect(tagCreated).toHaveText([" testTag "])
})
test('should be able to create a new article with multiple tags successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticle('Article35','Test Article','Article To test the automation code',['TestTag1','TestTag2','TestTag3'])
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText('Article35')
    const tagCreated= pageManager.onArticlePage().getTags()
    await expect(tagCreated).toHaveText([' testTag1 ',' testtag2 ',' testtag3 '])
})
test('should be able to create a new article with already existing tags successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticle('Article54','Test Article','Article To test the automation code',['YouTube'])
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText('Article54')
    const tagCreated=  pageManager.onArticlePage().getTags()
    await expect(tagCreated).toHaveText([" YouTube "]);
})

test('should not have duplicate tags when a new article with already existing tag is created',async({page})=>{
    let countOfExitingTags=0
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticle('Article3124','Test Article','Article To test the automation code',['YouTube'])
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toHaveText('Article3124')
    await pageManager.onArticlePage().goToHomePage()
    const popularTags=pageManager.onHomePage().getPopularTags();
    await expect(popularTags.first()).toBeVisible();
    const tagCount= await pageManager.onHomePage().getTagsCount('YouTube')
    expect(tagCount).toEqual(1)
})



