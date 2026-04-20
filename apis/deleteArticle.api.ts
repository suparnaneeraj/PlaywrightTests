import { APIRequestContext } from "@playwright/test";

export class DeleteArticle{
    private readonly request : APIRequestContext;
    constructor(request: APIRequestContext){
        this.request = request;
    }

    async deleteArticleAPI(articleSlugId: string, token: string){
        const deleteApiUrl = `${process.env.API_URL}/api/articles/${articleSlugId}`;
        const headers = {
                Authorization: `Token ${token}`,
            }
        const response = await this.request.delete(deleteApiUrl,{
            headers : headers,
            },
        );
        return response;
    }
    
}