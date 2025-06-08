import { Transport } from '@nestjs/microservices';

export const RMQTransportConfig = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
    queue: 'auth_queue',
    queueOptions: {
      durable: true,
    },
    port: process.env.AUTH_SERVICE_PORT || 3101,
  },
};

export const TCPTransportConfig = {
  transport: Transport.TCP,
  options: {
    host: '0.0.0.0',
    port: 4001,
  },
};
