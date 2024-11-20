import { Controller, Get, Inject, Req } from '@nestjs/common';
import { AUTH_SERVICE_TOKEN, AuthService, User } from '@auth-app/shared';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService) {}

    @Get('google/callback')
    async googleCallback(@Req() req: { user: User }) {
        return this.authService.validateUser(req.user);
    }
}
