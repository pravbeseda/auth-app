import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('test')
export class TestController {
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        // Этот метод просто редиректит на Google
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleCallback(@Req() req: any) {
        // Этот метод получает данные профиля пользователя
        return req.user;
    }
}
