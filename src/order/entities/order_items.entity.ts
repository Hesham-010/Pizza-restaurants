import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pizza } from '../../pizza/entities/pizza.entity';
import { Order } from 'src/order/entities/order.entity';

@ObjectType()
@Entity()
export class Order_Items {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  unitPrice: number;

  @Field()
  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.order_items, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Pizza, (pizza) => pizza.order_items)
  pizza: Pizza;
}
