import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from '@auth-app/auth';
import { AppController } from './controllers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { GraphqlModule } from '@auth-app/graphql';

@Module({
    imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), GraphqlModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
