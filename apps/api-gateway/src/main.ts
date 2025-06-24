import { HttpExceptionFilter } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import helmet from 'helmet';
import { ApiBootstrapModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiBootstrapModule);

  app.use(helmet());

  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY || 'session_secret_key',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.APIGATEWAY_PORT ?? 3100);
}
void bootstrap();
