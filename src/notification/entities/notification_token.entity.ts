import { Customer } from 'src/customer/entities/customer.entity';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'notification_tokens' })
export class NotificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  @ManyToOne(() => Customer)
  customer: Customer;

  @Column()
  notification_token: string;

  @Column({
    default: 'ACTIVE',
  })
  status: string;
}
