import { Get, Controller, Param } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { Comment } from '../entities/comment.entity';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    getComments(): Promise<Comment[]> {
        return this.commentService.findAll();
    }

    @Get(':id')
    getCommentById(@Param() params: any): Promise<Comment> {
        return this.commentService.findOneById(params.id);
    }
}
