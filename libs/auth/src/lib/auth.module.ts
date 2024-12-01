import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google-strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { ENV } from '@auth-app/shared';

@Module({
    imports: [
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'google', session: false }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>(ENV.JWT_SECRET),
                signOptions: { expiresIn: '1h' },
            }),
        }),
    ],
    providers: [GoogleStrategy, ConfigService, AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
