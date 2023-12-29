import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>
    ) {}

    async findAll(): Promise<Article[]> {
        return await this.articleRepository.find();
    }

    async findOneById(id: number): Promise<Article> {
        return await this.articleRepository.findOneBy({ id : id });
    }
}
