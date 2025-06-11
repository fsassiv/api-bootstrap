import { AuthServiceConstants } from '@app/common';
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: AuthServiceConstants.AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'auth-service',
          port: 4001,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class TcpModule {}
