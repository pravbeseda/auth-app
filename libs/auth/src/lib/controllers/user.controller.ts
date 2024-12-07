import { Controller, Post, Body } from '@nestjs/common';
import { User, UserRegisterInput } from '@auth-app/shared';
import { AuthService } from '../services/auth.service';

@Controller('user')
export class UserController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async registerUser(@Body() user: UserRegisterInput): Promise<User> {
        return this.authService.registerUser(user);
    }
}
