export interface IArticlePublishDto {
    userId: number
    title: string
    body: string
}

export interface IArticleEditDto {
    id: number
    userId: number
    title: string
    body: string
}