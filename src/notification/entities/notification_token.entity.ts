import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from 'src/customer/entities/customer.entity';
import { NotificationStatus } from 'src/utils/enums/notification_status.enum';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class NotificationToken {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  @ManyToOne(() => Customer)
  @Field()
  customer: Customer;

  @Column()
  @Field()
  notification_token: string;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: 'ACTIVE',
  })
  @Field()
  status: NotificationStatus;
}
