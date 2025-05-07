import {expect, test} from '@playwright/test'
import { PageManager } from '../pages/pageManager'

const articleCreated='Article5'
test.beforeEach(async({page})=>{
    await page.goto('https://conduit.bondaracademy.com/')
    const pageManager=new PageManager(page)
    await pageManager.onLoginPage().loginWithEmailAndPassword('playwright_automation@test.com','Automation1')
    await pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticleWithSingleTag(articleCreated,'Article5 Title','Article 5 desc','Tag10')
})

test('should be able to delete an already created article',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onArticlePage().deleteArticle()
    const firstArticle=await pageManager.onHomePage().getFirstArticleOnTheList()
    expect(firstArticle).not.toEqual(articleCreated)
})