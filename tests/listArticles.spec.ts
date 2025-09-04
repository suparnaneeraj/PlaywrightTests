import {test,expect,Page} from '@playwright/test';
import { PageManager } from '../pages/pageManager';

let page:Page;
let pageManager:PageManager;
const username=process.env.USERNAME!;
const password=process.env.PASSWORD!
let tagToCheck='Git';
test.describe('Verifies the articles listed',()=>{
    test.beforeEach(async({browser})=>{
        page    =   await browser.newPage();
        pageManager =   new PageManager(page);
        await page.goto('/');
        await pageManager.onLoginPage().loginWithEmailAndPassword(username,password);
      
    })
    test('should verify if the articles with selected tag is displayed',async()=>{
        const popularTags=pageManager.onHomePage().getPopularTags();
        await expect(popularTags.first()).toBeVisible();
        const verifyArticleTag=await pageManager.onHomePage().verifyArticlesInATag(tagToCheck);
        expect(verifyArticleTag).toBeTruthy();
    })
    
})