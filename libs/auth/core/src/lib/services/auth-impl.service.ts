import { Injectable } from '@nestjs/common';
import { AuthenticatedUser, AuthService, User } from '@auth-app/shared';

@Injectable()
export class AuthImplService implements AuthService {
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
