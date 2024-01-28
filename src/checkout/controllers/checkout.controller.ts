import { Body, Controller, Post, Headers } from '@nestjs/common';
import { CheckoutService } from '../services/checkout.service';

@Controller('/webhook-session')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async handleWebhook(
    @Body() body: Buffer,
    @Headers('stripe-signature') sig: string,
  ) {
    return this.checkoutService.webhook(body, sig);
  }
}
