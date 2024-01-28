import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from '../services/order.service';

@Controller('webhook-session')
export class WebhookController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async handleWebhook(
    @Body() body: Buffer,
    @Headers('stripe-signature') sig: string,
  ) {
    return this.orderService.webhook(body, sig);
  }
}
