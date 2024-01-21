import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { NotificationToken } from './notification_token.entity';
import { NotificationStatus } from 'src/utils/enums/notification_status.enum';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'notificationToken_id', referencedColumnName: 'id' })
  @ManyToOne(() => NotificationToken)
  notification_token: NotificationToken;

  @Column()
  title: string;

  @Column()
  body: any;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.ACTIVE,
  })
  status: NotificationStatus;
}
