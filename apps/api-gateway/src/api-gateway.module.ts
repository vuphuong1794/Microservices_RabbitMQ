import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'ORDER_SERVICE_RABBITMQ',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'order_queue',
        queueOptions: {
          durable: true //keep messages in the queue if the consumer is not connected
        },
      },
    },
  ])],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule { }
