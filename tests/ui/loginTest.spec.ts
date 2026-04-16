import {test, expect} from '../fixtures';
import { PageManager} from '../../pages/pageManager'

const username=process.env.USERNAME!;
const password=process.env.PASSWORD!;
test.beforeEach(async({page})=>{
    await page.goto('/');
})

test('User should login successfully with valid credentials',async({pageManager})=>{
    await pageManager.getLoginPage().loginWithEmailAndPassword(username,password);
    const articleList=pageManager.getHomePage().getFirstArticleOnTheList();
    await expect(articleList).toBeVisible();

})
test('Login fails with invalid credentials',async({pageManager})=>{
    await pageManager.getLoginPage().loginWithEmailAndPassword('playwright_automation1@test.com','Automation1')
    const firstArticle= pageManager.getHomePage().getFirstArticleOnTheList();
    await expect(firstArticle).not.toBeVisible();
})