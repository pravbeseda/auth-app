import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';
import { ENV } from '@auth-app/shared';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
    constructor(configService: ConfigService) {
        super({
            clientID: configService.get<string>(ENV.YANDEX_CLIENT_ID),
            clientSecret: configService.get<string>(ENV.YANDEX_CLIENT_SECRET),
            callbackURL: configService.get<string>(ENV.YANDEX_CALLBACK_URL),
            scope: ['login:email', 'login:info'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
        return {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            displayName: profile.displayName,
        };
    }
}
