import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationToken } from './entities/notification_token.entity';
import { Notifications } from './entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationToken, Notifications])],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
