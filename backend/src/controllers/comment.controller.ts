import { Get, Controller, Param, Body, Post } from '@nestjs/common'
import { CommentService } from '../services/comment.service'
import { Comment } from '../entities/comment.entity'
import { User } from '../entities/user.entity'
import { ICommentPublishDto } from 'shared'

@Controller('comments')
export class CommentController {
    constructor(
        private commentService: CommentService,
    ) {}

    @Get()
    getComments(): Promise<Comment[]> {
        return this.commentService.findAll()
    }

    @Get(':id')
    getCommentById(@Param() params: any): Promise<Comment> {
        return this.commentService.findOneById(params.id)
    }

    @Post()
    publishComment(@Body() comment: ICommentPublishDto): Promise<Comment> {
        return this.commentService.publishComment(comment)
    }
}
