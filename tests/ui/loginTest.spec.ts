import {test, expect} from '../fixtures';
import { users } from '../../test-data/loginData';

test.beforeEach(async({page})=>{
    await page.goto('/');
})

test('User should login successfully with valid credentials',async({loginPage, homePage})=>{
    await loginPage.loginWithEmailAndPassword(users.validUser.email,users.validUser.password);
    const articleList=homePage.getFirstArticleOnTheList();
    await expect(articleList).toBeVisible();
    await expect(homePage.header.profilePageLink).toBeVisible();

})
test('Login fails with invalid credentials',async({loginPage, homePage})=>{
    await loginPage.loginWithEmailAndPassword(users.invalidUser.email, users.invalidUser.password);
    const firstArticle= homePage.getFirstArticleOnTheList();
    await expect(firstArticle).not.toBeVisible();
    await expect(homePage.header.profilePageLink).not.toBeVisible();
})