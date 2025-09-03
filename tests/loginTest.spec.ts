import {expect, test} from '@playwright/test'
import { PageManager} from '../pages/pageManager'

test.beforeEach(async({page})=>{
    await page.goto('/');
})

test('User should login successfully with valid credentials',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onLoginPage().loginWithEmailAndPassword('playwright_automation@test.com','Automation1')
    const articleList=pageManager.onHomePage().getFirstArticleOnTheList();
    await expect(articleList).toBeVisible();

})
test('Login fails with invalid credentials',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onLoginPage().loginWithEmailAndPassword('playwright_automation1@test.com','Automation1')
    const firstArticle= pageManager.onHomePage().getFirstArticleOnTheList();
    await expect(firstArticle).not.toBeVisible();
})