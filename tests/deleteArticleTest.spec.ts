import {expect, test} from '@playwright/test'
import { PageManager } from '../pages/pageManager'

const articleCreated='Article5'
test.beforeEach(async({page})=>{
    await page.goto('/');
    const pageManager=new PageManager(page)
    await pageManager.onLoginPage().loginWithEmailAndPassword('playwright_automation@test.com','Automation1')
    await pageManager.onHomePage().clickOnNewArticle()
    
})

test('should delete an already created article successfully',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onCreateArticlePage().createNewArticle(articleCreated,'Article5 Title','Article 5 desc')
    await pageManager.onArticlePage().deleteArticle()
    const firstArticle=await pageManager.onHomePage().getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText(articleCreated)
})

test('should delete the tag from popular tags when the only article with the tag is deleted',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onCreateArticlePage().createNewArticle('Article10','This is the description','Anotherdescription',['TagToDelete'])
    await pageManager.onArticlePage().deleteArticle()
    const firstArticle=await pageManager.onHomePage().getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText('Article10')
    const tagCount=await pageManager.onHomePage().getTagsCount('TagToDelete');
    expect(tagCount).toBeFalsy();
})
test('should not delete the tag from popular tags when the only one article with the tag is deleted',async({page})=>{
    let countOfExitingTags=0
    const pageManager=new PageManager(page)
    await pageManager.onCreateArticlePage().createNewArticle('Article11','This is the description','Anotherdescription',['YouTube'])
    await pageManager.onArticlePage().deleteArticle()
    const firstArticle=await pageManager.onHomePage().getFirstArticleOnTheList()
    await expect(firstArticle).not.toHaveText('Article11')
    const tagCount=await pageManager.onHomePage().getTagsCount('YouTube')
    expect(tagCount).toBeTruthy();
})