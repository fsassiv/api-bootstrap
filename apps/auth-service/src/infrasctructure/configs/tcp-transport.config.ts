import { Transport } from '@nestjs/microservices';

export const TCPTransportConfig = {
  transport: Transport.TCP,
  options: {
    host: 'auth-service',
    port: 4001,
  },
};
