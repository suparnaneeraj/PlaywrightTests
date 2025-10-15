import {test,Page, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { Article, generateArticle } from '../test-data/articles';

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
let article : Article;
test.beforeEach(async({browser})=>{
    page=await browser.newPage();
    pageManager= new PageManager(page);
    article = generateArticle('oneTag');
    await page.goto('/');
    await pageManager.onLoginPage().loginWithEmailAndPassword(username,password);
    await pageManager.onHomePage().clickOnNewArticle();
    await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description,article.tags);
    const createdArticle=pageManager.onArticlePage().getCreatedArticleName(); 
    await expect(createdArticle).toBeVisible();
    await expect(createdArticle).toHaveText(article.title);
})
test('should be able to edit a created article',async({})=>{
    await pageManager.onArticlePage().clickEditArticleButton(article.title);
    const articleNameInEditPage=pageManager.onCreateArticlePage().getArticleNameInEditPage();
    await expect(articleNameInEditPage).toHaveValue(article.title);
    const newArticle=generateArticle('oneTag');
    await pageManager.onCreateArticlePage().editArticle(newArticle.title,newArticle.description,newArticle.tags);
    const articleDetails= await pageManager.onArticlePage().getArticleDetails();
    await expect(articleDetails[0]).toHaveText(newArticle.title);
    await expect(articleDetails[1]).toHaveText(newArticle.description);
    if (article.tags?.length && newArticle.tags?.length){
        await expect(articleDetails[2]).toContainText(article.tags);
        await expect(articleDetails[2]).toContainText(newArticle.tags);
    }

})

