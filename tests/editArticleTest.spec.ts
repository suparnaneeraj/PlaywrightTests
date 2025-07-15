import test from '@playwright/test'
import { PageManager } from '../pages/pageManager'
import { LoginAPI } from '../api/login.api'

test.beforeEach(async({page})=>{
    const pageManager= new PageManager(page)
    const loginAPI=new LoginAPI(page.request)
    const userToken=await loginAPI.loginToApp()

})
test('should be able to edit an already created article',async({page})=>{
    
})
