import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Article } from '../entities/article.entity'
import { Comment } from '../entities/comment.entity'
import { User } from '../entities/user.entity'
import { PublishArticleDto } from 'src/dto/article.dto'

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>,
    ) {}

    async findAll(): Promise<Article[]> {
        return await this.articleRepository.find()
    }

    async findOneById(id: number): Promise<Article> {
        return await this.articleRepository.findOneBy({ id : id })
    }

    async findAllCommentsById(id: number): Promise<Comment[]> {
        const article = await this.articleRepository.findOne({
            where: { id : id },
            relations: ['comments'],
        })
        return article.comments
    }

    async findAllLikesById(id: number): Promise<User[]> {
        const article = await this.articleRepository.findOne({
            where: { id : id },
            relations: ['likes'],
        })
        return article.likes
    }

    async publishArticle(article: PublishArticleDto): Promise<Article> {
        const result = await this.articleRepository
            .createQueryBuilder()
            .insert()
            .into(Article)
            .values({ title: article.title, body: article.body })
            .execute()

        return await this.articleRepository.findOneBy({ id : result.identifiers[0].id })
    }
}
