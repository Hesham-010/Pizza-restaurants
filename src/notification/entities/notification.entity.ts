import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { NotificationToken } from './notification_token.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'notification_token_id', referencedColumnName: 'id' })
  @ManyToOne(() => NotificationToken)
  notification_token: NotificationToken;

  @Column()
  title: string;

  @Column()
  body: any;

  @Column({
    default: 'ACTIVE',
  })
  status: string;
}
