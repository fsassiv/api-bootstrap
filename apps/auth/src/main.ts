import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthMSModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthMSModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
      queue: 'auth_queue',
      queueOptions: {
        durable: true,
      },
      port: process.env.PORT || 3101,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: true,
      transform: true,
    }),
  );

  await app.listen();
}
bootstrap();
