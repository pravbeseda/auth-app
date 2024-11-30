/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;

    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:4200', // TODO change to env
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Auth app example')
        .setDescription('The auth app API description')
        .setVersion('1.0')
        .addTag('auth')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}`);

    //check routes
    const server = app.getHttpAdapter().getInstance();
    const router = server._router;
    if (router && router.stack) {
        const routes = router.stack
            .filter(layer => layer.route) // Выбираем только маршруты
            .map(layer => ({
                path: layer.route.path,
                method: Object.keys(layer.route.methods)[0].toUpperCase(),
            }));
        console.log('Registered Routes:', routes);
    }
}

bootstrap();
