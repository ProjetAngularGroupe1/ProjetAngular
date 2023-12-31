import { IArticle } from "../interfaces/article.interface"

export class ArticleModel implements IArticle {
    id: number
    title: string
    body: string
    user_id: number
    created_at: Date
    updated_at: Date
   
    constructor(id: number, user_id: number, title: string, body: string) {
        this.id         = id
        this.user_id    = user_id
        this.title      = title
        this.body       = body
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}
