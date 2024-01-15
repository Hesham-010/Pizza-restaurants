import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order_Items } from '../../order/entities/order_items.entity';
import { Pizza_Additions } from '../../models/pizza_additions.entity';
import { Menu_items } from '../../models/menu_items.entity';
import { PizzaSize } from 'src/enums/pizza.enums';

@ObjectType()
@Entity()
export class Pizza {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  taste: string;

  @Field()
  @Column({
    type: 'enum',
    enum: PizzaSize,
  })
  size: PizzaSize;

  @OneToMany(() => Order_Items, (order_items) => order_items.pizza, {
    cascade: true,
  })
  order_items: Order_Items[];

  @OneToMany(() => Pizza_Additions, (pizza_Additions) => pizza_Additions.pizza)
  pizza_Additions: Pizza_Additions[];

  @OneToMany(() => Menu_items, (menu_items) => menu_items.pizza)
  menu_items: Menu_items[];
}
