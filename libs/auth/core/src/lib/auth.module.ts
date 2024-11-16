import { Module } from '@nestjs/common';
import { AuthImplService } from './services/auth-impl.service';
import { PassportAuthModule } from '@auth-app/passport';
import { AUTH_SERVICE_TOKEN } from '@auth-app/shared';

@Module({
    imports: [PassportAuthModule],
    providers: [{ provide: AUTH_SERVICE_TOKEN, useClass: AuthImplService }],
    exports: [AUTH_SERVICE_TOKEN],
})
export class AuthModule {}
