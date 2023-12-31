import { IComment } from "../interfaces/comment.interface"

export class CommentModel implements IComment {
    id: number
    user_id: number
    article_id: number
    body: string
    created_at: Date
    updated_at: Date

    constructor(id: number, user_id: number, article_id: number, body: string) {
        this.id         = id
        this.user_id    = user_id
        this.article_id = article_id
        this.body       = body
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}
