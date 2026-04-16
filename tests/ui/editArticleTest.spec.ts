import {test, expect } from '../fixtures';
import { Article, generateArticle } from '../../test-data/articles';

const username=process.env.USERNAME!;
const password=process.env.PASSWORD!
let articleName='NewArticleToedit';
let articleOverview='ArticleOverview';
let articleDescription='NewArticleDescription';
let tag=['Newtag'];
let newarticleName='NewArticleToedit1';
let newarticleDescription='NewArticleDescription1';
let newtag='newtag1';
let article : Article;

test.beforeEach(async({pageManager, page})=>{
    article = generateArticle('oneTag');
    await page.goto('/');
    await pageManager.getLoginPage().loginWithEmailAndPassword(username,password);
    await pageManager.getHomePage().clickOnNewArticle();
    await pageManager.getCreateArticlePage().createNewArticle(article.title,article.description,article.body,article.tagList);
    const createdArticle=pageManager.getArticlePage().getCreatedArticleName(); 
    await expect(createdArticle).toBeVisible();
    await expect(createdArticle).toHaveText(article.title);
})
test('should be able to edit a created article',async({pageManager})=>{
    await pageManager.getArticlePage().clickEditArticleButton(article.title);
    const articleNameInEditPage=pageManager.getCreateArticlePage().getArticleNameInEditPage();
    await expect(articleNameInEditPage).toHaveValue(article.title);
    const newArticle=generateArticle('oneTag');
    await pageManager.getCreateArticlePage().editArticle(newArticle.title,newArticle.body,newArticle.tagList);
    const articleDetails= await pageManager.getArticlePage().getArticleDetails();
    await expect(articleDetails[0]).toHaveText(newArticle.title);
    await expect(articleDetails[1]).toHaveText(newArticle.body);
    if (article.tagList?.length && newArticle.tagList?.length){
        await expect(articleDetails[2]).toContainText(article.tagList);
        await expect(articleDetails[2]).toContainText(newArticle.tagList);
    }

})

