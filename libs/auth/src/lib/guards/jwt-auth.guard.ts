import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies?.access_token;

        if (!token) {
            console.error('JWT Guard: No token found');
            throw new UnauthorizedException('Access token is missing');
        }

        try {
            request.user = this.jwtService.verify(token);
            return true;
        } catch (err: any) {
            console.error('JWT Guard: Token verification failed', err.message);
            throw new UnauthorizedException('Access token is invalid or expired');
        }
    }
}
