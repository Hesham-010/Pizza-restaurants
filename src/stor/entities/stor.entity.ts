import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';
import { Store_Goals } from './stor_goals.entity';
import { Menu_items } from '../../models/menu_items.entity';
import { Order } from 'src/order/entities/order.entity';

@ObjectType()
@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ nullable: true })
  openTime: Date;

  @Field()
  @Column({ nullable: true })
  closeTime: Date;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  street: string;

  @OneToMany(() => Order, (order) => order.store)
  order: Order[];

  @OneToMany(() => Staff, (staff) => staff.store)
  staff: Staff[];

  @OneToMany(() => Store_Goals, (stor_goal) => stor_goal.stor)
  stor_goals: Store_Goals[];

  @OneToMany(() => Menu_items, (menu_items) => menu_items.stor)
  menu_items: Menu_items[];
}
