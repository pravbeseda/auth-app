import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ENV, EnvService } from '@auth-app/env';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly envService: EnvService) {
        super({
            clientID: envService.get(ENV.GOOGLE_CLIENT_ID),
            clientSecret: envService.get(ENV.GOOGLE_CLIENT_SECRET),
            callbackURL: envService.get(ENV.GOOGLE_CALLBACK_URL),
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
        return {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            displayName: profile.displayName,
        };
    }
}
