import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { EnvService, ENV } from '@auth-app/env';
import { AUTH_SERVICE_TOKEN, AuthService } from '@auth-app/shared';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
        private readonly envService: EnvService
    ) {
        super({
            clientID: envService.get(ENV.GOOGLE_CLIENT_ID),
            clientSecret: envService.get(ENV.GOOGLE_CLIENT_SECRET),
            callbackURL: envService.get(ENV.GOOGLE_CALLBACK_URL),
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const userProfile = {
            id: profile.id,
            displayName: profile.displayName,
            email: profile.emails ? profile.emails[0].value : '',
            photoUrl: profile.photos ? profile.photos[0].value : '',
        };
        return this.authService.validateUser(userProfile);
    }
}
