import {test,Page, expect } from '@playwright/test'
import { PageManager } from '../pages/pageManager'

const username=process.env.USERNAME!;
const password=process.env.PASSWORD!
let articleName='NewArticleToedit';
let articleOverview='ArticleOverview';
let articleDescription='NewArticleDescription';
let tag=['Newtag'];
let newarticleName='NewArticleToedit1';
let newarticleDescription='NewArticleDescription1';
let newtag='newtag1';
let page:Page;
let pageManager:PageManager;
test.beforeEach(async({browser})=>{
    page=await browser.newPage();
    pageManager= new PageManager(page);
    await page.goto('/');
    await pageManager.onLoginPage().loginWithEmailAndPassword(username,password);
    await pageManager.onHomePage().clickOnNewArticle();
    await pageManager.onCreateArticlePage().createNewArticle(articleName,articleOverview,articleDescription,tag);
    const createdArticle=pageManager.onArticlePage().getCreatedArticleName();
    await expect(createdArticle).toHaveText(articleName);
})
test('should be able to edit a created article',async({})=>{
    await pageManager.onArticlePage().clickEditArticleButton(articleName);
    const articleNameInEditPage=pageManager.onCreateArticlePage().getArticleNameInEditPage();
    await expect(articleNameInEditPage).toHaveValue(articleName);
    await pageManager.onCreateArticlePage().editArticle(newarticleName,newarticleDescription,newtag);
    const articleDetails= await pageManager.onArticlePage().getArticleDetails();
    console.log(articleDetails[0],' ',articleDetails[1],' ',articleDetails[2]);
    await expect(articleDetails[0]).toHaveText(newarticleName);
    await expect(articleDetails[1]).toHaveText(newarticleDescription);
    await expect(articleDetails[2][0]).toHaveText(' ' + tag + ' ');
    await expect(articleDetails[2][1]).toHaveText(' ' + newtag + ' ');

})

