import { Get, Post, Controller, Param, Body, Response, HttpStatus } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { Article } from '../entities/article.entity'
import { Comment } from '../entities/comment.entity'
import { IUserLoginDto, IUserGetDto } from '@blog/shared'


@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get()
    getUsers(): Promise<IUserGetDto[]> {
        return this.userService.findAll()
    }

    @Get(':id')
    getUserById(@Param() params: any): Promise<IUserGetDto> {
        return this.userService.findOneById(params.id)
    }

    @Get(':id/comments')
    getCommentsById(@Param() params: any): Promise<Comment[]> {
        return this.userService.findAllCommentsById(params.id)
    }

    @Get(':id/articles')
    getArticlesById(@Param() params: any): Promise<Article[]> {
        return this.userService.findAllArticlesById(params.id)
    }

    @Get(':id/likes/articles')
    getLikedArticlesById(@Param() params: any): Promise<Article[]> {
        return this.userService.findAllLikedArticlesById(params.id)
    }

    @Get(':id/likes/comments')
    getLikedCommentsById(@Param() params: any): Promise<Comment[]> {
        return this.userService.findAllLikedCommentsById(params.id)
    }

    @Post('/login')
    async login(@Body() body: any, @Response() res: any): Promise<IUserLoginDto | void> {
        const user_jwt = await this.userService.logIn(body.username, body.password)
        return res.status(HttpStatus.OK).json(user_jwt)
    }

    @Post('/signin')
    async signin(@Body() body: any, @Response() res: any): Promise<void> {
        // TODO : check it username doesn't already exist 
        const ok = this.userService.signIn(body.username, body.password)
        if (ok) {
            return res.status(HttpStatus.OK) 
        } else {
            return res.status(HttpStatus.FORBIDDEN) 
        }
    }
}
