import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from '../services/comment.service';
import { CommentController } from '../controllers/comment.controller';
import { Comment } from '../entities/comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule {}
