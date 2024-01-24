export interface ICommentDto {
}

export interface IPublishCommentDto {
    userId: number
    articleId: number
    body: string
}