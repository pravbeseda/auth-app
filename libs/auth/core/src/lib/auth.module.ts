import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google-strategy';
import { EnvService } from '@auth-app/env';
import { AuthController } from './controllers/auth.controller';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'google' })],
    providers: [GoogleStrategy, EnvService],
    controllers: [AuthController],
})
export class AuthModule {}
