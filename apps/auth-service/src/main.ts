import { NestFactory } from '@nestjs/core';

import { AuthServerModule } from './auth-server.module';
import { TCPTransportConfig } from './infrasctructure/configs/tcp-transport.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthServerModule, {
    ...TCPTransportConfig,
  });

  await app.listen();
}
void bootstrap();
