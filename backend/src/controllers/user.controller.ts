import { Get, Controller, Param } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { User } from '../entities/user.entity'
import { Article } from '../entities/article.entity'
import { Comment } from '../entities/comment.entity'

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Get(':id')
    getUserById(@Param() params: any): Promise<User> {
        return this.userService.findOneById(params.id)
    }

    @Get(':id/comments')
    getUserCommentsById(@Param() params: any): Promise<Comment[]> {
        return this.userService.findAllCommentsById(params.id)
    }

    @Get(':id/articles')
    getUserArticlesById(@Param() params: any): Promise<Article[]> {
        return this.userService.findAllArticlessById(params.id)
    }
}
