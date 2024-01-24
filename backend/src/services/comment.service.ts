import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { Comment } from '../entities/comment.entity'
import { User } from '../entities/user.entity'
import { PublishCommentDto } from 'src/dto/comment.dto'

@Injectable()
export class CommentService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(Comment) private commentRepository: Repository<Comment>
    ) {}

    async findAll(): Promise<Comment[]> {
        return await this.commentRepository.find()
    }

    async findOneById(id: number): Promise<Comment> {
        return await this.commentRepository.findOneBy({ id : id })
    }

    async findAllLikesById(id: number): Promise<User[]> {
        const article = await this.commentRepository.findOne({
            where: { id : id },
            relations: ['likes'],
        })
        return article.likes
    }

    async deleteComment(id: number): Promise<boolean> {
        // Delete likes
        await this.dataSource.query(`DELETE FROM comment_likes_user WHERE commentId = ${ id };`)

        // Delete comment
        await this.commentRepository
            .createQueryBuilder()
            .delete()
            .from(Comment)
            .where(`id = ${ id }`)
            .execute()

        return true
    }

    async publishComment(comment: PublishCommentDto): Promise<Comment> {
        const result = await this.commentRepository
            .createQueryBuilder()
            .insert()
            .into(Comment)
            .values({ 
                body: comment.body, 
                articleId : comment.articleId, 
                userId: comment.userId,
                createdAt: new Date(), 
                updatedAt: new Date(),
            })
            .execute()

        return await this.commentRepository.findOneBy({ id : result.identifiers[0].id })
    }
}
