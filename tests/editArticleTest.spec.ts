import test from '@playwright/test'
import { PageManager } from '../pages/pageManager'

test.beforeEach(async({page})=>{
    const pageManager= new PageManager(page)
})
test('should be able to edit an already created article',async({page})=>{
    
})
