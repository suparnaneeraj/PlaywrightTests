import { APIRequestContext } from "@playwright/test";

export class LoginAPI{
    apiRequest: APIRequestContext;
    baseURL    =   process.env.BASE_URL;
    constructor(apiRequest:APIRequestContext){
        this.apiRequest =   apiRequest;    
    }
    async loginToApp(){  
        const loginURL  =   `${this.baseURL}/api/users/login`;
        const loginPayload =    {
            user:{
                email: process.env.USERNAME,
                password: process.env.PASSWORD,
            },
        };
        const loginResponse = await this.apiRequest.post(loginURL,{
            data: loginPayload,

        });
        const loginResponseBody =   await loginResponse.json();
        const token= loginResponseBody.user.token;
        return token;
    }
}