import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pizza_Additions } from '../../pizza/entities/pizza_additions.entity';
import { Order_Additions } from '../../order/entities/order_additions.entity';

@ObjectType()
@Entity()
export class Addition {
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
  @Column({
    default: true,
  })
  isGlobal: boolean;

  @OneToMany(() => Pizza_Additions, (pizza_Addition) => pizza_Addition.addition)
  pizza_Additions: Pizza_Additions[];

  @OneToMany(() => Order_Additions, (order_Addition) => order_Addition.addition)
  order_Additions: Order_Additions[];
}
