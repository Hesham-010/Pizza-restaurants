import { Customer } from 'src/customer/entities/customer.entity';
import { NotificationStatus } from 'src/utils/enums/notification_status.enum';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class NotificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  @ManyToOne(() => Customer)
  customer: Customer;

  @Column()
  notification_token: string;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: 'ACTIVE',
  })
  status: NotificationStatus;
}
