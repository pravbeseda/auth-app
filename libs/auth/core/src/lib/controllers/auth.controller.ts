import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { User } from '../models/user';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    @Post('refresh')
    refreshToken(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not found' });
        }

        try {
            const decoded = this.jwtService.verify(refreshToken);
            const user = { id: decoded.sub } as User;

            const accessToken = this.authService.generateAccessToken(user);

            res.cookie('access_token', accessToken, {
                httpOnly: true,
                secure: this.configService.get<string>('MODE') === 'production',
                sameSite: 'strict',
            });

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
        const accessToken = this.authService.generateAccessToken(user);
        const refreshToken = this.authService.generateRefreshToken(user);

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: this.configService.get<string>('MODE') === 'production', // HTTPS only
            sameSite: 'strict', // CSRF protection
        });

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: this.configService.get<string>('MODE') === 'production',
            sameSite: 'strict',
        });

        res.redirect(`http://localhost:4200`);
    }
}
