import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'PAYMENT_CLIENT',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'payment_queue',
        queueOptions: {
          durable: true //keep messages in the queue if the consumer is not connected
        },
      },
    },
    {
      name: 'NOTIFICATION_CLIENT',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'notification_queue',
        queueOptions: {
          durable: true //keep messages in the queue if the consumer is not connected
        },
      },
    },
  ])],
  controllers: [OrderServiceController],
  providers: [OrderServiceService],
})
export class OrderServiceModule { }
