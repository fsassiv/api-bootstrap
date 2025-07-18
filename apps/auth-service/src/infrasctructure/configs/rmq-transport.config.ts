import { QUEUES } from '@app/common';
import { Transport } from '@nestjs/microservices';

export const RMQTransportConfig = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
    queue: QUEUES.AUTH_QUEUE,
    queueOptions: {
      durable: true,
    },
    port: process.env.AUTH_SERVICE_PORT || 3101,
  },
};
