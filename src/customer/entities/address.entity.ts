import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';

@ObjectType()
@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  street: string;

  @ManyToOne(() => Customer, (customer) => customer.address)
  customer: Customer;
}
