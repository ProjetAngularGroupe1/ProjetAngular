export class ArticleDataModel {
    id: number
    user_id: number
    title: string
    body: string
    creation_date: Date
    update_date: Date
    like_count: number
   
    constructor(id: number, user_id: number, title: string, body: string) {
        this.id            = id
        this.user_id       = user_id
        this.title         = title
        this.body          = body
        this.creation_date = new Date()
        this.update_date   = new Date()
        this.like_count    = 0
    }
}


export class ArticleModel {

}