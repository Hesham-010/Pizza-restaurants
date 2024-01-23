import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../../models/person.entity';
import { Address } from './address.entity';
import { Order } from 'src/order/entities/order.entity';

@ObjectType()
@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @OneToOne(() => Person)
  @JoinColumn()
  @Field()
  person: Person;

  @OneToMany(() => Address, (address) => address.customer)
  address: Address[];

  @OneToMany(() => Order, (order) => order.customer)
  order: Order[];
}
