import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationToken } from './entities/notification_token.entity';
import { Notification } from './entities/notification.entity';
import { NotificationResolver } from './resolvers/notification.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationToken, Notification])],
  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
