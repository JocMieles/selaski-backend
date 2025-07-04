import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestFilter } from './common/filters/bad-request.filter';
import { jsonBodyErrorHandler } from './common/middleware/json-body-error.middleware';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(json({ limit: '1mb' }))
  app.use(jsonBodyErrorHandler);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.useGlobalFilters(new BadRequestFilter());

  await app.listen(3000);
}
bootstrap();