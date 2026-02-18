import {expect, test} from '@playwright/test';
import { LoginAPI } from '../../apis/login.api';

let loginAPI: LoginAPI;
const incorrectUsername = 'automationuser';
const  incorrectPassword = 'automation123';


test('should provide success response for login api',async({page})=>{
    loginAPI = new LoginAPI(page.request);
    const loginResponseBody = await loginAPI.loginAPI();
    await expect (loginResponseBody).toBeOK();

})

test('should provide error response for login api',async({page})=>{
    loginAPI = new LoginAPI(page.request);
    const loginResponseBody = await loginAPI.loginAPI(incorrectUsername,incorrectPassword);
    await expect (loginResponseBody).not.toBeOK();

})