import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pizza } from './pizza.entity';
import { Addition } from '../../addition/entities/addition.entity';

@ObjectType()
@Entity()
export class Pizza_Additions {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  unitPrice: number;

  @Column()
  @Field()
  quantity: number;

  @ManyToOne(() => Pizza, (pizza) => pizza.order_items)
  pizza: Pizza;

  @ManyToOne(() => Addition, (addition) => addition.pizza_Additions)
  addition: Addition;
}
