import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { Article } from '../entities/article.entity'
import { Comment } from '../entities/comment.entity'
import { User } from '../entities/user.entity'
import { EditArticleDto, PublishArticleDto } from 'src/dto/article.dto'

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>,
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        private dataSource: DataSource,
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
            .values({ 
                title: article.title, 
                body: article.body, 
                userId: article.user_id, 
                created_at: new Date(), 
                updated_at: new Date(),
            })
            .execute()

        return await this.articleRepository.findOneBy({ id : result.identifiers[0].id })
    }

    async editArticle(article: EditArticleDto): Promise<Article> {
        const result = await this.articleRepository
            .createQueryBuilder()
            .update(Article)
            .set({ 
                title: article.title, 
                body: article.body, 
                updated_at: new Date(),
            })
            .where(`id = ${ article.id }`)
            .execute()

        // TODO: use result id
        return await this.articleRepository.findOneBy({ id : article.id })
    }

    async deleteArticle(id: number): Promise<boolean> {
        // Delete likes on article
        await this.dataSource.query(`DELETE FROM article_likes_user WHERE articleId = ${ id };`)

        // Delete comments
        const comments = await this.findAllCommentsById(id)
        for (let comment of comments) {
            // Delete likes on comment
            await this.dataSource.query(`DELETE FROM comment_likes_user WHERE commentId = ${ comment.id };`)

            // Delete comment
            await this.commentRepository
                .createQueryBuilder()
                .delete()
                .from(Comment)
                .where(`id = ${ comment.id }`)
                .execute()
        }
        
        // Delete article
        await this.articleRepository
            .createQueryBuilder()
            .delete()
            .from(Article)
            .where(`id = ${ id }`)
            .execute()

        return true
    }
}
