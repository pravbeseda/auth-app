import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from '@auth-app/core';
import { TestController } from './controllers/test.controller';
import { AppController } from './controllers/app.controller';

@Module({
    imports: [AuthModule],
    controllers: [AppController, TestController],
    providers: [AppService],
})
export class AppModule {}
