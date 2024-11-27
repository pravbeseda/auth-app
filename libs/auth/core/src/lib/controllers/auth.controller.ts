import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { User } from '../models/user';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getCurrentUser(@Req() req: Request) {
        return req.user;
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin(@Res() res: Response) {
        // redirect to google
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleCallback(@Req() req: Request, @Res() res: Response) {
        const user = req.user as User;
        const { accessToken } = this.authService.generateJwt(user);

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: this.configService.get<string>('MODE') === 'production', // HTTPS only
            sameSite: 'strict', // CSRF protection
        });

        console.log('Token set in cookie:', accessToken);

        res.redirect(`http://localhost:4200`);
    }
}
