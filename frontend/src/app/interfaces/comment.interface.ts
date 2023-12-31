export interface IComment {
    id: number
    user_id: number
    article_id: number
    body: string
    created_at: Date
    updated_at: Date
}