import { Get, Controller, Param,Post, Body } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { User } from '../entities/user.entity'
import { Article } from '../entities/article.entity'
import { Comment } from '../entities/comment.entity'
import { IUserDto } from '@blog/shared'

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

    // @Post('/signup')
    // async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    //   return this.authService.signUp(createUserDto);
    // }
  
    // @Post('/signin')
    // async signIn(
    //   @Body() userDto: IUserDto,
    // ): Promise<{ accessToken: string }> {
    //   return this.authService.signIn(loginUserDto);
    // }
}
