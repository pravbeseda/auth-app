import { Injectable } from '@nestjs/common';
import { AuthenticatedUser, User } from '@auth-app/shared';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements AuthService {
    constructor(private readonly jwtService: JwtService) {}

    generateJwt({ id, email }: User): { accessToken: string } {
        const payload = { sub: id, email };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }

    async validateUser(profile: User): Promise<AuthenticatedUser> {
        return {
            id: profile.id,
            email: profile.email,
            displayName: profile.displayName,
            photoUrl: profile.photoUrl,
            accessToken: 'jwt-token',
        };
    }
}
