import { Get, Controller, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    getUserById(@Param() params: any): Promise<User> {
        return this.userService.findOneById(params.id);
    }
}
