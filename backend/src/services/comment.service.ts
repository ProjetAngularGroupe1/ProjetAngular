import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>
    ) {}

    async findAll(): Promise<Comment[]> {
        return await this.commentRepository.find();
    }

    async findOneById(id: number): Promise<Comment> {
        return await this.commentRepository.findOneBy({ id : id });
    }
}
