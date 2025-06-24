import { NestFactory } from '@nestjs/core';
import { AuthMSModule } from './auth-service.module';
import { TCPTransportConfig } from './configs/transports-config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthMSModule, {
    ...TCPTransportConfig,
  });

  await app.listen();
}
void bootstrap();
