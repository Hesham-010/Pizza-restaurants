import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Addition } from '../../addition/entities/addition.entity';
import { Order } from 'src/order/entities/order.entity';

@ObjectType()
@Entity()
export class Order_Additions {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  unitPrice: number;

  @Column()
  @Field()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.order_items, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Addition, (addition) => addition.pizza_Additions)
  addition: Addition;
}
