import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@auth-app/shared';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @Get('google')
    // async googleLogin(@Res() res: Response) {
    //     // Перенаправление на страницу авторизации Google
    //     const redirectUrl = this.authService.getGoogleAuthUrl();
    //     res.redirect(redirectUrl);
    // }
    //
    // @Get('google/callback')
    // async googleCallback(@Req() req: any, @Res() res: Response) {
    //     // Обработка callback-а от Google
    //     const user = await this.authService.handleGoogleCallback(req);
    //     return res.json(user);
    // }
}
