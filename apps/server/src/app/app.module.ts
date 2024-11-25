import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from '@auth-app/core';
import { AppController } from './controllers/app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
