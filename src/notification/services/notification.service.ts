import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { Repository } from 'typeorm';
import { NotificationToken } from '../entities/notification_token.entity';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { NotificationInput } from '../dtos/notification.input';
import { NotificationStatus } from 'src/utils/enums/notification_status.enum';

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(__dirname, '..', '..', '..', 'firebase-admin-sdk.json'),
  ),
});

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
    @InjectRepository(NotificationToken)
    private notificationTokenRepo: Repository<NotificationToken>,
  ) {}

  async acceptPushNotification(
    customerId: string,
    notification_token: string,
  ): Promise<NotificationToken> {
    const updateNotificationToken = await this.notificationTokenRepo.update(
      { customer: { id: customerId } },
      {
        status: NotificationStatus.ACTIVE,
      },
    );

    if (!updateNotificationToken.affected) {
      const notificationToken = this.notificationTokenRepo.create({
        customer: { id: customerId },
        notification_token,
        status: NotificationStatus.ACTIVE,
      });

      await this.notificationTokenRepo.save(notificationToken);

      return notificationToken;
    }

    return updateNotificationToken.raw;
  }

  async disablePushNotification(customerId: string) {
    try {
      await this.notificationTokenRepo.update(
        { customer: { id: customerId } },
        {
          status: NotificationStatus.INACTIVE,
        },
      );
      return 'InActive Notification Successfully';
    } catch (error) {
      return error;
    }
  }

  async sendPushNotification(
    customerId: any,
    notificationInput: NotificationInput,
  ) {
    const { title, body } = notificationInput;

    const notificationToken = await this.notificationTokenRepo.findOne({
      where: {
        customer: { id: customerId },
        status: NotificationStatus.ACTIVE,
      },
    });

    if (!notificationToken) {
      return `this customer don't have fcm token`;
    }

    await this.notificationRepo.save({
      notification_token: notificationToken,
      title,
      body,
      status: NotificationStatus.ACTIVE,
    });

    return await firebase.messaging().send({
      notification: { title, body },
      token: notificationToken.notification_token,
    });
  }

  async findAll() {
    return this.notificationRepo.find();
  }
}
