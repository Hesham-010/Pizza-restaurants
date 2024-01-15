import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DiscountEnum } from 'src/enums/discount.enums';
import { Order } from 'src/order/entities/order.entity';

@Entity()
@ObjectType()
export class Coupon {
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
  @Column()
  expireDate: Date;

  @Field()
  @Column()
  discount: number;

  @Field()
  @Column({ enum: DiscountEnum, default: DiscountEnum.PERCENT, nullable: true })
  typeDiscount: DiscountEnum;

  @OneToMany(() => Order, (order) => order.coupon)
  order: Order[];
}
