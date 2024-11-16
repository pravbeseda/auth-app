import { Controller, Get, Req } from '@nestjs/common';
import { AuthService, User } from '@auth-app/shared';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google/callback')
    async googleCallback(@Req() req: { user: User }) {
        return this.authService.validateUser(req.user);
    }
}
