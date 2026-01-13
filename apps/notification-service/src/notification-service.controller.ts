import { Controller, Get } from '@nestjs/common';
import { NotificationServiceService } from './notification-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationServiceController {
  constructor(
    private readonly notificationServiceService: NotificationServiceService
  ) { }

  @Get()
  getHello(): string {
    return this.notificationServiceService.getHello();
  }

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order: any) {
    console.log('[Notification-Service]: Sending Order Created Email ', order);
  }

  @MessagePattern('payment-succeed')
  handlePaymentSucceed(@Payload() order: any) {
    console.log('[Notification-Service]: Sending Payment Succeed Email ', order);
  }
}
