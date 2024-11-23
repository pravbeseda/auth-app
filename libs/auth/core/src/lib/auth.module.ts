import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google-strategy';
import { EnvService } from '@auth-app/env';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'google' })],
    providers: [GoogleStrategy, EnvService],
})
export class AuthModule {}
