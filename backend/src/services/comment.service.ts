import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from '../entities/comment.entity'
import { User } from '../entities/user.entity'

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>
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
}
