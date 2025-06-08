import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ApiBootstrapModule } from './api-gateway.module';
import { HttpExceptionFilter } from './filters/exception-filters/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(ApiBootstrapModule);

  app.use(helmet());

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
