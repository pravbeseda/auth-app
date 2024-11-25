import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google-strategy';
import { EnvService } from '@auth-app/env';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'google', session: false }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET_KEY'),
                signOptions: { expiresIn: '1h' },
            }),
        }),
    ],
    providers: [GoogleStrategy, EnvService, ConfigModule, AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
