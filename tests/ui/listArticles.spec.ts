import {test,expect} from '../fixtures';
import { Article, generateArticle } from '../../test-data/articles';

const username=process.env.USERNAME!;
const password=process.env.PASSWORD!
let tagToCheck='Git';
let article:Article;

test.describe('Verifies the articles listed',()=>{
        test.beforeEach(async({page, pageManager})=>{
        await page.goto('/');
        await pageManager.getLoginPage().loginWithEmailAndPassword(username,password);
      
    })
    test('should verify if the articles with selected tag is displayed',async({pageManager})=>{
        const popularTags=pageManager.getHomePage().getPopularTags();
        await expect(popularTags.first()).toBeVisible();
        const verifyArticleTag=await pageManager.getHomePage().verifyArticlesInATag(tagToCheck);
        expect(verifyArticleTag).toBeTruthy();
    })

    test('should verify the number of likes in an articlle',async({pageManager})=>{
        article = generateArticle('basic');
        await pageManager.getHomePage().clickOnNewArticle();
        await pageManager.getCreateArticlePage().createNewArticle(article.title,article.description,article.body);
        const createdArticle= pageManager.getArticlePage().getCreatedArticleName();
        await expect (createdArticle).toHaveText(article.title);
        await pageManager.getArticlePage().goToHomePage();
        const firstArticle  =   pageManager.getHomePage().getFirstArticleOnTheList();

        // Provide 1 for clicking the like button and to get the count and 0 if only count is required 
        const initialLikesCount= await pageManager.getHomePage().likeArticle(article.title,0);
        await expect(initialLikesCount).toHaveText('0');
        const likesCountAfterClick =await pageManager.getHomePage().likeArticle(article.title,1);
        await expect(likesCountAfterClick).toHaveText('1');
        })
    
})
