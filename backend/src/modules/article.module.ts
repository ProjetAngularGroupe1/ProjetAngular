import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleService } from '../services/article.service'
import { ArticleController } from '../controllers/article.controller'
import { Article } from '../entities/article.entity'
import { Comment } from 'src/entities/comment.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Article, Comment])],
    providers: [ArticleService],
    controllers: [ArticleController],
})
export class ArticleModule {}
