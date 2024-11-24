import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from '@auth-app/core';
import { AppController } from './controllers/app.controller';

@Module({
    imports: [AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
