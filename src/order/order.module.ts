import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderResolver } from './resolvers/order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Order_Items } from './entities/order_items.entity';
import { Pizza } from 'src/pizza/entities/pizza.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Order_Additions } from './entities/order_additions.entity';
import { Addition } from 'src/addition/entities/addition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Order_Items,
      Pizza,
      Coupon,
      Order_Additions,
      Addition,
    ]),
  ],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
