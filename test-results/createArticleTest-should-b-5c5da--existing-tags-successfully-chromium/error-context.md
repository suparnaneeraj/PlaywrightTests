# Test info

- Name: should be able to create a new article with already existing tags successfully
- Location: /Users/suparnaramesh/Desktop/Suparna/My Trainings/Playwright/PlaywrightAutomation/tests/createArticleTest.spec.ts:35:5

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: "YouTube"
Received array: [" YouTube "]
    at /Users/suparnaramesh/Desktop/Suparna/My Trainings/Playwright/PlaywrightAutomation/tests/createArticleTest.spec.ts:42:24
```

# Page snapshot

```yaml
- navigation:
  - link "conduit":
    - /url: /
  - list:
    - listitem:
      - link "Home":
        - /url: /
    - listitem:
      - link " New Article":
        - /url: /editor
    - listitem:
      - link " Settings":
        - /url: /settings
    - listitem:
      - link "Automation user":
        - /url: /profile/Automation%20user
        - img
        - text: Automation user
- heading "Article5" [level=1]
- link:
  - /url: /profile/Automation%20user
  - img
- link "Automation user":
  - /url: /profile/Automation%20user
- text: May 9, 2025
- link " Edit Article":
  - /url: /editor/Article5-21969
- button " Delete Article"
- list:
  - listitem: YouTube
- separator
- link:
  - /url: /profile/Automation%20user
  - img
- link "Automation user":
  - /url: /profile/Automation%20user
- text: May 9, 2025
- link " Edit Article":
  - /url: /editor/Article5-21969
- button " Delete Article"
- list
- group:
  - textbox "Write a comment..."
  - img
  - button "Post Comment"
- contentinfo:
  - link "conduit":
    - /url: /
  - text: © 2025. An interactive learning project from
  - link "RealWorld OSS Project":
    - /url: https://github.com/gothinkster/realworld
  - text: . Code licensed under MIT. Hosted by
  - link "Bondar Academy":
    - /url: https://www.bondaracademy.com
  - text: .
```

# Test source

```ts
   1 | import {test,expect} from '@playwright/test'
   2 | import { PageManager } from '../pages/pageManager'
   3 | import { execPath } from 'process'
   4 |
   5 | test.beforeEach(async({page})=>{
   6 |     await page.goto('https://conduit.bondaracademy.com/')
   7 |     const pageManager=new PageManager(page)
   8 |     await pageManager.onLoginPage().loginWithEmailAndPassword('playwright_automation@test.com','Automation1')
   9 | })
  10 | test('should be able to create a new article without tags successfully',async({page})=>{
  11 |     const pageManager=new PageManager(page)
  12 |     await pageManager.onHomePage().clickOnNewArticle()
  13 |     await pageManager.onCreateArticlePage().createNewArticleWithoutTags('Article1','Test Article','Article To test the automation code')
  14 |     const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
  15 |     expect (createdArticle).toEqual('Article1')
  16 | })
  17 | test('should be able to create a new article with a single tag successfully',async({page})=>{
  18 |     const pageManager=new PageManager(page)
  19 |     await pageManager.onHomePage().clickOnNewArticle()
  20 |     await pageManager.onCreateArticlePage().createNewArticleWithSingleTag('Article2','Test Article','Article To test the automation code','TestTag')
  21 |     const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
  22 |     expect (createdArticle).toEqual('Article2')
  23 |     const tagCreated=await pageManager.onArticlePage().getTags()
  24 |     expect(tagCreated).toEqual([" testTag "])
  25 | })
  26 | test('should be able to create a new article with multiple tags successfully',async({page})=>{
  27 |     const pageManager=new PageManager(page)
  28 |     await pageManager.onHomePage().clickOnNewArticle()
  29 |     await pageManager.onCreateArticlePage().createNewArticleWithMultipleTag('Article3','Test Article','Article To test the automation code','TestTag1','TestTag2','TestTag3')
  30 |     const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
  31 |     expect (createdArticle).toEqual('Article3')
  32 |     const tagCreated= await pageManager.onArticlePage().getTags()
  33 |     expect(tagCreated).toEqual([' testTag1 ',' testtag2 ',' testtag3 '])
  34 | })
  35 | test('should be able to create a new article with already existing tags successfully',async({page})=>{
  36 |     const pageManager=new PageManager(page)
  37 |     await pageManager.onHomePage().clickOnNewArticle()
  38 |     await pageManager.onCreateArticlePage().createNewArticleWithSingleTag('Article5','Test Article','Article To test the automation code','YouTube')
  39 |     const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
  40 |     expect (createdArticle).toEqual('Article5')
  41 |     const tagCreated= await pageManager.onArticlePage().getTags()
> 42 |     expect(tagCreated).toContain('YouTube')
     |                        ^ Error: expect(received).toContain(expected) // indexOf
  43 | })
  44 |
  45 | test('should not have duplicate tags when a new article with already existing tag is created',async({page})=>{
  46 |     let countOfExitingTags=0
  47 |     const pageManager=new PageManager(page)
  48 |     await pageManager.onHomePage().clickOnNewArticle()
  49 |     await pageManager.onCreateArticlePage().createNewArticleWithSingleTag('Article312','Test Article','Article To test the automation code','YouTube')
  50 |     const createdArticle=await pageManager.onArticlePage().getCreatedArticleName()
  51 |     expect (createdArticle).toEqual('Article312')
  52 |     await pageManager.onArticlePage().goToHomePage()
  53 |     const PopularTags= await pageManager.onHomePage().getPopularTags()
  54 |     await expect(PopularTags.first()).toBeVisible()
  55 |     const countTags=await PopularTags.count()
  56 |     for (let tag of await PopularTags.all()){
  57 |         const tagName=await tag.textContent()
  58 |         if(tagName==' YouTube '){
  59 |             countOfExitingTags++
  60 |         }
  61 |     }
  62 |     expect(countOfExitingTags).toEqual(1)
  63 |     await pageManager.onHomePage().clickOnFirstArticle()
  64 | })
  65 | test.afterEach(async({page})=>{
  66 |     const pageManager=new PageManager(page)
  67 |
  68 |     await pageManager.onArticlePage().deleteArticle()
  69 | })
```