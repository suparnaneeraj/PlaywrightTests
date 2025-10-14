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

    test('should verify the number of likes in an articlle',async()=>{
        await pageManager.onHomePage().clickOnNewArticle();
        await pageManager.onCreateArticlePage().createNewArticle('ArticleNew21','Overview','Description');
        const createdArticle=await pageManager.onArticlePage().getCreatedArticleName();
        await expect (createdArticle).toHaveText('ArticleNew21');
        await pageManager.onArticlePage().goToHomePage();
        const firstArticle  =   pageManager.onHomePage().getFirstArticleOnTheList();
        await expect(firstArticle).toHaveText('ArticleNew21')

        // Provide 1 for clicking the like button and to get the count and 0 if only count is required 
        const initialLikesCount= await pageManager.onHomePage().likeArticle('ArticleNew21',0);
        await expect(initialLikesCount).toHaveText('0');
        const likesCountAfterClick =await pageManager.onHomePage().likeArticle('ArticleNew21',1);
        await expect(likesCountAfterClick).toHaveText('1');
        })
    
})

//Refactor the code to accept data dynamically not hardcoded