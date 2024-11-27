/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}`);

    app.enableCors({
        origin: 'http://localhost:4200', // TODO change to env
        credentials: true,
    });

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
