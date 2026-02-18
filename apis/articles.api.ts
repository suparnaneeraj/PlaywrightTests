import { APIRequestContext } from "@playwright/test";
import { Article, generateArticle } from '../test-data/articles'

const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;
const baseURL    =   process.env.BASE_URL;


export class ArticleAPIs{

    apiRequest:APIRequestContext;

    constructor(apiRequest:APIRequestContext){
        this.apiRequest=apiRequest;
    }

    async createArticleAPI(accessToken:string, articleData: Article){
        const body ={
            article :articleData
        }
        const createArticleAPIUrl = ` ${baseURL}/api/articles/` ;
        const createArticleResponse = this.apiRequest.post(createArticleAPIUrl,{
            data: body,
            headers: {
                Authorization: `Token ${accessToken}`,
        }
            },
        );

    return createArticleResponse;

    }

}