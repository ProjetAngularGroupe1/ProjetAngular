import { Get, Controller, Param } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { Article } from '../entities/article.entity';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    getArticles(): Promise<Article[]> {
        return this.articleService.findAll();
    }

    @Get(':id')
    getArticleByName(@Param() params: any): Promise<Article> {
        return this.articleService.findOneById(params.id);
    }
}
