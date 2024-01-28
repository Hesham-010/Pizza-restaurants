import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async webhook(body, sig) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET);

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      return `Webhook Error: ${err.message}`;
    }
    if (event.type === 'checkout.session.completed') {
      console.log('Create Order');
    }
  }
}
