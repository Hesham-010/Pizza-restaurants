import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/entities/customer.entity';
import { Person } from './models/person.entity';
import { Manager } from './manager/entities/manager.entity';
import { Staff } from './staff/entities/staff.entity';
import { Store } from './stor/entities/stor.entity';
import { Address } from './customer/entities/address.entity';
import { Pizza } from './pizza/entities/pizza.entity';
import { Order_Items } from './order/entities/order_items.entity';
import { Coupon } from './coupon/entities/coupon.entity';
import { Pizza_Additions } from './pizza/entities/pizza_additions.entity';
import { Addition } from './addition/entities/addition.entity';
import { Store_Goals } from './stor/entities/stor_goals.entity';
import { Menu_items } from './models/menu_items.entity';
import { Instruction } from './instruction/entities/instraction.entity';
import { Order } from './order/entities/order.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StorModule } from './stor/stor.module';
import { CustomerModule } from './customer/customer.module';
import { StaffModule } from './staff/staff.module';
import { PizzaModule } from './pizza/pizza.module';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';
import { Order_Additions } from './order/entities/order_additions.entity';
import { AdditionModule } from './addition/addition.module';
import { InstructionModule } from './instruction/instruction.module';
import { ConfigModule } from '@nestjs/config';
import { ManagerModule } from './manager/manager.module';
import { NotificationModule } from './notification/notification.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: 'https://pizza-restaurants-chd5.onrender.com',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Customer,
        Person,
        Manager,
        Store,
        Staff,
        Address,
        Pizza,
        Order_Items,
        Order,
        Coupon,
        Pizza_Additions,
        Addition,
        Store_Goals,
        Menu_items,
        Instruction,
        Order_Additions,
      ],
      synchronize: true,
    }),
    OrderModule,
    StorModule,
    CustomerModule,
    StaffModule,
    PizzaModule,
    CouponModule,
    AdditionModule,
    InstructionModule,
    ManagerModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
