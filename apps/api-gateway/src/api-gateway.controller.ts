import { Body, Get, Controller, Post, Inject } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api')
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('ORDER_SERVICE_RABBITMQ') private readonly client: ClientProxy,
  ) { }

  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  @Post("order")
  createOrder(@Body() order: any) {
    this.client.emit('order_created', order);
    return { message: 'Order send to rabbitmq', order };
  }
}
