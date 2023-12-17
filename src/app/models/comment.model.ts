export class CommentModel {
    id: number
    body: string
    author: string
    creation_date: Date
    update_date: Date
    like_count: number

    constructor(id: number, body: string, author: string) {
        this.id            = id
        this.body          = body
        this.author        = author
        this.creation_date = new Date()
        this.update_date   = new Date()
        this.like_count    = 0
    }
}