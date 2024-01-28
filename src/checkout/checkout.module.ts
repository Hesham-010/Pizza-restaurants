import { Module } from '@nestjs/common';
import { CheckoutService } from './services/checkout.service';
import { CheckoutController } from './controllers/checkout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer])],
  providers: [CheckoutService],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
