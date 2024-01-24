import { IComment }  from "@blog/shared"

export class CommentModel implements IComment {
    id: number
    userId: number
    articleId: number
    body: string
    createdAt: Date
    updatedAt: Date

    constructor(id: number, userId: number, articleId: number, body: string) {
        this.id         = id
        this.userId    = userId
        this.articleId = articleId
        this.body       = body
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}
