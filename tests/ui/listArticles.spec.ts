import {test,expect} from '../fixtures';
import { Article, generateArticle } from '../../test-data/articles';

const username=process.env.USERNAME!;
const password=process.env.PASSWORD!
let tagToCheck='Git';

test.describe('Verifies the articles listed',()=>{
    test.beforeEach(async({page, loginPage})=>{
        await page.goto('/');
        await loginPage.loginWithEmailAndPassword(username,password);
    })
    test('should verify if the articles with selected tag is displayed',async({homePage})=>{
        const popularTags = homePage.getPopularTags();
        await expect(popularTags.first()).toBeVisible();
        const verifyArticleTag=await homePage.verifyArticlesInATag(tagToCheck);
        expect(verifyArticleTag).toBeTruthy();
    })

    test('should verify the number of likes in an article',async({homePage})=>{
        const firstArticle  =   homePage.getFirstArticleOnTheList();
        expect(firstArticle).not.toBeNull();
        const firstArticleTitle = await firstArticle.textContent();
         if(firstArticleTitle!=null){
            const articleToLike = await homePage.likeArticle(firstArticleTitle,0);
            const initialLikesCount= (await articleToLike.textContent())?.trim() ?? '0';
            const initialCount = Number(initialLikesCount);
            const initialClass = await articleToLike.getAttribute('class');
            await homePage.likeArticle(firstArticleTitle,1);
            if (initialClass?.includes('btn-outline-primary')) {
                await expect(articleToLike).toHaveText(String(initialCount + 1));
            } 
            else if (initialClass?.includes('btn-primary')) {
                await expect(articleToLike).toHaveText(String(initialCount - 1));
            }
        }
    })   
})

