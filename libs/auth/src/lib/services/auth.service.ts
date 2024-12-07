import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user';
import { UserRepository } from '@auth-app/database';
import * as bcrypt from 'bcrypt';
import { UserRegisterInput } from '@auth-app/shared';

@Injectable()
export class AuthService implements AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository
    ) {}

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

    async registerUser({ email, password, name }: UserRegisterInput): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.userRepository.createUser({
            email,
            password: hashedPassword,
            name,
        });
    }
}
