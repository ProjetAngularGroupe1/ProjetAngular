import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Article } from '../entities/article.entity'
import { Comment } from '../entities/comment.entity'

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
}
