import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user';

@Injectable()
export class AuthService implements AuthService {
    constructor(private readonly jwtService: JwtService) {}

    generateAccessToken({ id, email }: User): string {
        const payload = { sub: id, email };
        return this.jwtService.sign(payload, {
            expiresIn: '15m',
        });
    }

    generateRefreshToken({ id, email }: User): string {
        const payload = { sub: id, email };
        return this.jwtService.sign(payload, {
            expiresIn: '7d',
        });
    }
}
