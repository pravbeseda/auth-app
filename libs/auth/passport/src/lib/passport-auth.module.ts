import { EnvService } from '@auth-app/env';
import { Module } from '@nestjs/common';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
    providers: [GoogleStrategy, EnvService],
    exports: [GoogleStrategy],
})
export class PassportAuthModule {}
