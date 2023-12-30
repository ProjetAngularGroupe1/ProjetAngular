import { Get, Controller, Param } from '@nestjs/common'
import { ArticleService } from '../services/article.service'
import { Article } from '../entities/article.entity'
import { Comment } from '../entities/comment.entity'

@Controller('articles')
export class ArticleController {
    constructor(
        private articleService: ArticleService,
    ) {}

    @Get()
    getArticles(): Promise<Article[]> {
        return this.articleService.findAll()
    }

    @Get(':id')
    getArticleById(@Param() params: any): Promise<Article> {
        return this.articleService.findOneById(params.id)
    }

    @Get(':id/comments')
    getArticleCommmentsById(@Param() params: any): Promise<Comment[]> {
        return this.articleService.findAllCommentsById(params.id)
    }
}
