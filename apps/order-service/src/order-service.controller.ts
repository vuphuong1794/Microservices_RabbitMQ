import { Controller, Get, Inject } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrderServiceController {
  constructor(
    private readonly orderServiceService: OrderServiceService,
    @Inject('PAYMENT_CLIENT') private readonly PAYMENT_client: any,
    @Inject('NOTIFICATION_CLIENT') private readonly NOTIFICATION_client: any,
  ) { }

  @Get()
  getHello(): string {
    return this.orderServiceService.getHello();
  }

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order: any) {
    console.log('[Order-Service]: Received new order: ', order);

    this.PAYMENT_client.emit('process-payment', order)
    this.NOTIFICATION_client.emit('order-created', order)
  }
}
