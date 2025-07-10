import {test,expect} from '@playwright/test'
import { PageManager } from '../pages/pageManager'

const username  =   process.env.USERNAME!
const password  =   process.env.PASSWORD!

test.beforeEach(async({page})=>{
    //await page.goto('https://conduit.bondaracademy.com/')
    const pageManager=new PageManager(page)
    await pageManager.onLoginPage().loginWithEmailAndPassword(username,password)
})
test('should be able to create a new article without tags successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticleWithoutTags('Article1','Test Article','Article To test the automation code')
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    expect (createdArticle).toEqual('Article1')
})
test('should be able to create a new article with a single tag successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticleWithSingleTag('Article2','Test Article','Article To test the automation code','TestTag')
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    expect (createdArticle).toEqual('Article2')
    const tagCreated=await pageManager.onArticlePage().getTags()
    expect(tagCreated).toEqual([" testTag "])
})
test('should be able to create a new article with multiple tags successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticleWithMultipleTag('Article3','Test Article','Article To test the automation code','TestTag1','TestTag2','TestTag3')
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    expect (createdArticle).toEqual('Article3')
    const tagCreated= await pageManager.onArticlePage().getTags()
    expect(tagCreated).toEqual([' testTag1 ',' testtag2 ',' testtag3 '])
})
test('should be able to create a new article with already existing tags successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticleWithSingleTag('Article5','Test Article','Article To test the automation code','YouTube')
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    expect (createdArticle).toEqual('Article5')
    const tagCreated= await pageManager.onArticlePage().getTags()
    expect(tagCreated).toContain('YouTube')
})

test('should not have duplicate tags when a new article with already existing tag is created',async({page})=>{
    let countOfExitingTags=0
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticleWithSingleTag('Article312','Test Article','Article To test the automation code','YouTube')
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    expect (createdArticle).toEqual('Article312')
    await pageManager.onArticlePage().goToHomePage()
    const PopularTags= await pageManager.onHomePage().getPopularTags()
    await expect(PopularTags.first()).toBeVisible()
    const countTags=await PopularTags.count()
    for (let tag of await PopularTags.all()){
        const tagName=await tag.textContent()
        if(tagName==' YouTube '){
            countOfExitingTags++
        }
    }
    expect(countOfExitingTags).toEqual(1)
    await pageManager.onHomePage().clickOnFirstArticle()
})
test.afterEach(async({page})=>{
    const pageManager=new PageManager(page)

    await pageManager.onArticlePage().deleteArticle()
})



/* Thngs to do here
- I need to set up base url in config.ts
- use the env variables to store username and password-- first hardcode 
- use workflow file to get the password and username from secrets
-   add more tests
- refactor

    */