import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule as AuthLibraryModule } from '@auth-app/core';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../../../../../libs/auth/core/src/lib/strategies/google-strategy';

@Module({
    imports: [AuthLibraryModule, PassportModule.register({ defaultStrategy: 'google' })],
    controllers: [AuthController],
    providers: [GoogleStrategy],
})
export class AuthModule {}
