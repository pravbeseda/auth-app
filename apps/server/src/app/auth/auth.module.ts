import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule as AuthLibraryModule } from '@auth-app/core';

@Module({
    imports: [AuthLibraryModule],
    controllers: [AuthController],
    providers: [],
})
export class AuthModule {}
