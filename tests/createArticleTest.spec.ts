import {test,expect} from '@playwright/test'
import { PageManager } from '../pages/pageManager'

test.beforeEach(async({page})=>{
    await page.goto('https://conduit.bondaracademy.com/')
    const pageManager=new PageManager(page)
    pageManager.onLoginPage().loginWithEmailAndPassword('playwright_automation@test.com','Automation1')
})
test('should be able to create a new article successfully',async({page})=>{
    const pageManager=new PageManager(page)
    pageManager.onHomePage().clickOnNewArticle()
    await pageManager.onCreateArticlePage().createNewArticleWithoutTags('Article1','Test Article','Article To test the automation code')
    const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
    await expect (createdArticle).toContainText('Article1')
})