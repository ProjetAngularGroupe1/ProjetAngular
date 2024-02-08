import { IArticle, IUser } from "@blog/shared"

export class ArticleModel implements IArticle {
    id: number
    title: string
    body: string
    userId: number
    createdAt: Date
    updatedAt: Date

    user?: IUser
   
    constructor(id: number, userId: number, title: string, body: string) {
        this.id        = id
        this.userId    = userId
        this.title     = title
        this.body      = body
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}
