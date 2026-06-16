import { APIRequestContext } from "@playwright/test";

const username = process.env.USERNAME;
const passwrd = process.env.PASSWORD;
const baseURL = process.env.API_URL;

export class LoginAPI{

    apiRequest: APIRequestContext;
    
    constructor(apiRequest:APIRequestContext){
        this.apiRequest =   apiRequest;    
    }
    async loginAPI(usernameReceived? :string, passwordReceived?:string){  
        const loginURL  =   `${baseURL}/api/users/login`;
        const loginPayload =    {
            user:{
                email: usernameReceived || username ,
                password: passwordReceived || passwrd,
            },
        };
        const loginResponse = await this.apiRequest.post(loginURL,{
            data: loginPayload,

        });
        return loginResponse ;
    }
}