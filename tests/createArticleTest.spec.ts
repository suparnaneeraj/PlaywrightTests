import {test,expect} from '@playwright/test'
import { PageManager } from '../pages/pageManager'

test.beforeEach(async({page})=>{
    await page.goto('https://conduit.bondaracademy.com/')
    const pageManager=new PageManager(page)
    await pageManager.onLoginPage().loginWithEmailAndPassword('playwright_automation@test.com','Automation1')
})
test('should be able to create a new article without tags successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticleWithoutTags('Article1','Test Article','Article To test the automation code')
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toContainText('Article1')
})
test('should be able to create a new article with a single tag successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticleWithSingleTag('Article2','Test Article','Article To test the automation code','TestTag')
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toContainText('Article2')
    const tagCreated=await pageManager.onArticlePage().getTags()
    expect(tagCreated).toEqual([" testTag "])
})
test('should be able to create a new article with multiple tags successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticleWithMultipleTag('Article3','Test Article','Article To test the automation code','TestTag1','TestTag2','TestTag3')
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toContainText('Article3')
    const tagCreated= await pageManager.onArticlePage().getTags()
    expect(tagCreated).toEqual([' testTag1 ',' testtag2 ',' testtag3 '])
})

test.afterEach(async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onArticlePage().deleteArticle()
})