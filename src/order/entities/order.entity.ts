import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus, ReceiveMethod } from 'src/utils/enums/order.enums';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Instruction } from 'src/instruction/entities/instraction.entity';
import { Order_Items } from 'src/order/entities/order_items.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Store } from 'src/stor/entities/stor.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Order_Additions } from 'src/order/entities/order_additions.entity';

@ObjectType()
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column({
    unique: true,
    nullable: false,
    default: Math.floor(1000 + Math.random() * 9000).toString(),
  })
  code: string;

  @Field()
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  orderStatus: OrderStatus;

  @Field()
  @Column({
    type: 'enum',
    enum: ReceiveMethod,
    default: ReceiveMethod.PICKUP,
  })
  recieveMethod: ReceiveMethod;

  @Field()
  @Column({ nullable: true })
  totalPrice: number;

  @Field()
  @Column({ nullable: true })
  discountAmount?: number;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  street: string;

  @ManyToOne(() => Customer, (customer) => customer.order)
  customer: Customer;

  @ManyToOne(() => Coupon, (coupon) => coupon.order, { nullable: true })
  @Field()
  coupon?: Coupon;

  @ManyToOne(() => Staff, (staff) => staff.order1, { nullable: true })
  @Field()
  deliver: Staff;

  @ManyToOne(() => Staff, (staff) => staff.order2)
  @Field()
  staff: Staff;

  @ManyToOne(() => Store, (store) => store.order)
  @Field()
  store: Store;

  @OneToMany(() => Instruction, (instraction) => instraction.order, {
    cascade: true,
  })
  instruction: Instruction[];

  @OneToMany(() => Order_Items, (order_items) => order_items.order, {
    cascade: true,
  })
  order_items: Order_Items[];

  @OneToMany(
    () => Order_Additions,
    (order_Additions) => order_Additions.order,
    {
      cascade: true,
    },
  )
  order_Additions: Order_Additions[];
}
