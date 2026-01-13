import { Controller, Get, Inject } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentServiceController {
  constructor(
    private readonly paymentServiceService: PaymentServiceService,
    @Inject('NOTIFICATION_CLIENT') private readonly NOTIFICATION_client: any,
  ) { }

  @Get()
  getHello(): string {
    return this.paymentServiceService.getHello();
  }

  @MessagePattern('process-payment')
  handleProcessPayment(@Payload() order: any) {
    console.log('[Payment-Service]: Payment in process: ', order);
    this.NOTIFICATION_client.emit('payment-succeed', order)

  }
}
