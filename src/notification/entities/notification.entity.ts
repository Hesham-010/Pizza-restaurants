import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { NotificationToken } from './notification_token.entity';
import { NotificationStatus } from 'src/utils/enums/notification_status.enum';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: number;

  @JoinColumn({ name: 'notificationToken_id', referencedColumnName: 'id' })
  @ManyToOne(() => NotificationToken)
  @Field()
  notification_token: NotificationToken;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  body: string;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.ACTIVE,
  })
  @Field()
  status: NotificationStatus;

  @Column({ default: false })
  @Field()
  seen: boolean;
}
