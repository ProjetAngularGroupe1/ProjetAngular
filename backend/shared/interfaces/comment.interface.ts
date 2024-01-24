export interface IComment {
    id: number
    userId: number
    articleId: number
    body: string
    createdAt: Date
    updatedAt: Date
}