export class CommentDataModel {
    id: number
    user_id: number
    article_id: number
    body: string
    creation_date: Date
    update_date: Date
    like_count: number

    constructor(id: number, user_id: number, article_id: number, body: string) {
        this.id            = id
        this.user_id       = user_id
        this.article_id    = article_id
        this.body          = body
        this.creation_date = new Date()
        this.update_date   = new Date()
        this.like_count    = 0
    }
}

export class CommentModel {

}