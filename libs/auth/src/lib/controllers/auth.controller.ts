import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request, CookieOptions } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { User } from '../models/user';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    private readonly accessTokenOptions: CookieOptions = {
        httpOnly: true,
        secure: this.configService.get<string>('MODE') === 'production',
        sameSite: 'strict',
        path: '/',
    } as const;

    private readonly refreshTokenOptions: CookieOptions = {
        ...this.accessTokenOptions,
        path: '/auth/refresh',
    } as const;

    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    @Post('refresh')
    refreshToken(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
            return res.status(403).json({ message: 'Refresh token not found' });
        }

        try {
            const decoded = this.jwtService.verify(refreshToken);
            const user = { id: decoded.sub } as User;
            this.refreshTokens(user, res);

            return res.status(200).json({ message: 'Token refreshed' });
        } catch (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    }

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
        this.refreshTokens(user, res);
        res.redirect(`http://localhost:4200`);
    }

    @Get('yandex')
    @UseGuards(AuthGuard('yandex'))
    async yandexLogin(@Res() res: Response) {}

    @Get('yandex/callback')
    @UseGuards(AuthGuard('yandex'))
    async yandexCallback(@Req() req: Request, @Res() res: Response) {
        const user = req.user as User;
        this.refreshTokens(user, res);
        res.redirect(`http://localhost:4200`);
    }

    @Post('logout')
    logout(@Res() res: Response): void {
        res.clearCookie('access_token', this.accessTokenOptions);
        res.clearCookie('refresh_token', this.refreshTokenOptions);
        res.status(200).json({ message: 'Logged out' });
    }

    private refreshTokens(user: User, res: Response): void {
        const accessToken = this.authService.generateAccessToken(user);
        const refreshToken = this.authService.generateRefreshToken(user);

        res.cookie('access_token', accessToken, this.accessTokenOptions);
        res.cookie('refresh_token', refreshToken, this.refreshTokenOptions);
    }
}
