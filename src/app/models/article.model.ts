import { CommentModel } from './comment.model'

export class ArticleModel {
    id: number
    title: string
    author: string
    body: string
    creation_date: Date
    update_date: Date
    like_count: number
    comments: Array<CommentModel>
   
    constructor(id: number, title: string, author: string, body: string) {
        this.id            = id
        this.title         = title
        this.author        = author
        this.body          = body
        this.creation_date = new Date()
        this.update_date   = new Date()
        this.like_count    = 0
        this.comments      = new Array<CommentModel>()
    }
}