import {test,expect,Page} from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { Article, generateArticle } from '../test-data/articles';

let page:Page;
let pageManager:PageManager;
const username=process.env.USERNAME!;
const password=process.env.PASSWORD!
let tagToCheck='Git';
let article:Article;

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

    test('should verify the number of likes in an articlle',async()=>{
        article = generateArticle('basic');
        await pageManager.onHomePage().clickOnNewArticle();
        await pageManager.onCreateArticlePage().createNewArticle(article.title,article.overview,article.description);
        const createdArticle= pageManager.onArticlePage().getCreatedArticleName();
        await expect (createdArticle).toHaveText(article.title);
        await pageManager.onArticlePage().goToHomePage();
        const firstArticle  =   pageManager.onHomePage().getFirstArticleOnTheList();
        await expect(firstArticle).toHaveText(article.title)

        // Provide 1 for clicking the like button and to get the count and 0 if only count is required 
        const initialLikesCount= await pageManager.onHomePage().likeArticle(article.title,0);
        await expect(initialLikesCount).toHaveText('0');
        const likesCountAfterClick =await pageManager.onHomePage().likeArticle(article.title,1);
        await expect(likesCountAfterClick).toHaveText('1');
        })
    
})

//Refactor the code to accept data dynamically not hardcoded