import { Get, Controller, Param, Post, Body, Patch } from '@nestjs/common'
import { ArticleService } from '../services/article.service'
import { Article } from '../entities/article.entity'
import { Comment } from '../entities/comment.entity'
import { User } from '../entities/user.entity'
import { EditArticleDto, PublishArticleDto } from 'src/dto/article.dto'

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

    @Get(':id/likes')
    getLikesById(@Param() params: any): Promise<User[]> {
        return this.articleService.findAllLikesById(params.id)
    }

    @Post()
    publishArticle(@Body() article: PublishArticleDto): Promise<Article> {
        return this.articleService.publishArticle(article)
    }

    @Patch(':id')
    editArticle(@Body() article: EditArticleDto): Promise<Article> {
        return this.articleService.editArticle(article)
    }
}
