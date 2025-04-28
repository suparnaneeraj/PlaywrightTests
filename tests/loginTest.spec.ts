import {test} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { PageManager} from '../pages/pageManager'

test.beforeEach(async({page})=>{
    await page.goto('https://conduit.bondaracademy.com/')
})

test('User should login successfully with valid credentials',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onLoginPage().loginWithEmailAndPassword('playwright_automation@test.com','Automation1')
})
test('Login fails with invalid credentials',async({page})=>{
    const pageManager=new PageManager(page)
    await pageManager.onLoginPage().loginWithEmailAndPassword('playwright_automation1@test.com','Automation1')
})
