import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ENV } from '@auth-app/shared';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>(ENV.GOOGLE_CLIENT_ID),
            clientSecret: configService.get<string>(ENV.GOOGLE_CLIENT_SECRET),
            callbackURL: configService.get<string>(ENV.GOOGLE_CALLBACK_URL),
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
