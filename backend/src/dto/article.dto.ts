export class ArticleDto {
    constructor(
    ) {}
}

export class PublishArticleDto {
    user_id: number
    title: string
    body: string
    constructor(
    ) {}
}

export class EditArticleDto {
    id: number
    user_id: number
    title: string
    body: string
    constructor(
    ) {}
}