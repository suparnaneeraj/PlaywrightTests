import {test, expect} from '../fixtures';

const username=process.env.USERNAME!;
const password=process.env.PASSWORD!;
test.beforeEach(async({page})=>{
    await page.goto('/');
})

test('User should login successfully with valid credentials',async({loginPage, homePage})=>{
    await loginPage.loginWithEmailAndPassword(username,password);
    const articleList=homePage.getFirstArticleOnTheList();
    await expect(articleList).toBeVisible();
    await expect(homePage.header.profilePageLink).toBeVisible();

})
test('Login fails with invalid credentials',async({loginPage, homePage})=>{
    await loginPage.loginWithEmailAndPassword('playwright_automation1@test.com','Automation1')
    const firstArticle= homePage.getFirstArticleOnTheList();
    await expect(firstArticle).not.toBeVisible();
    await expect(homePage.header.profilePageLink).not.toBeVisible();
})