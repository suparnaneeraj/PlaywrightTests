import {expect, test} from '@playwright/test'
import { PageManager } from '../pages/pageManager'

const articleCreated='Article5'
test.beforeEach(async({page})=>{
    await page.goto('https://conduit.bondaracademy.com/')
    const pageManager=new PageManager(page)
    await pageManager.onLoginPage().loginWithEmailAndPassword('playwright_automation@test.com','Automation1')
    await pageManager.onHomePage().clickOnNewArticle()
    
})

test('should delete an already created article successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onCreateArticlePage().createNewArticleWithoutTags(articleCreated,'Article5 Title','Article 5 desc')
    await pageManager.onArticlePage().deleteArticle()
    const firstArticle=await pageManager.onHomePage().getFirstArticleOnTheList()
    expect(firstArticle).not.toEqual(articleCreated)
})

test('should delete the tag from popular tags when the only article with the tag is deleted',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onCreateArticlePage().createNewArticleWithSingleTag('Article10','This is the description','Anotherdescription','TagToDelete')
    await pageManager.onArticlePage().deleteArticle()
    const firstArticle=await pageManager.onHomePage().getFirstArticleOnTheList()
    expect(firstArticle).not.toEqual('Article10')
    const popularTags=await pageManager.onHomePage().getPopularTags()
    expect(await popularTags.allTextContents()).not.toContain('TagToDelete')
})
test('should not delete the tag from popular tags when the only one article with the tag is deleted',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onCreateArticlePage().createNewArticleWithSingleTag('Article11','This is the description','Anotherdescription','YouTube')
    await pageManager.onArticlePage().deleteArticle()
    const firstArticle=await pageManager.onHomePage().getFirstArticleOnTheList()
    expect(firstArticle).not.toEqual('Article11')
    const popularTags=await pageManager.onHomePage().getPopularTags()
    expect(await popularTags.allTextContents()).toContain(' YouTube ')
})