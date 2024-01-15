import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../../models/person.entity';
import { Store } from '../../stor/entities/stor.entity';
import { Order } from 'src/order/entities/order.entity';
import { StaffPosition } from 'src/enums/staff.enums';

@ObjectType()
@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  street: string;

  @Field()
  @Column({
    type: 'enum',
    enum: StaffPosition,
  })
  position: StaffPosition;

  @Field()
  @Column()
  staffState: string;

  @OneToOne(() => Person)
  @JoinColumn()
  person: Person;

  @ManyToOne(() => Store, (store) => store.staff)
  store: Store;

  @OneToMany(() => Order, (order) => order.deliver)
  order1: Order;

  @OneToMany(() => Order, (order) => order.staff)
  order2: Order;
}
