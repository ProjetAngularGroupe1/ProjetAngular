export interface ArticleDto {
}

export interface PublishArticleDto {
    userId: number
    title: string
    body: string
}

export interface EditArticleDto {
    id: number
    userId: number
    title: string
    body: string
}