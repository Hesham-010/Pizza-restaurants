import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { Repository } from 'typeorm';
import { NotificationToken } from '../entities/notification_token.entity';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { NotificationInput } from '../dtos/notification.input';
import { NotificationStatus } from 'src/utils/enums/notification_status.enum';

const serviceAccountPath = path.join(
  __dirname,
  '..',
  'notification',
  'firebase-admin-sdk.json',
);

try {
  const serviceAccount = require(serviceAccountPath);

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });

  console.log('Firebase initialized successfully');
} catch (error) {
  console.error(`Error initializing Firebase: ${error.message}`);
}

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
    @InjectRepository(NotificationToken)
    private notificationTokenRepo: Repository<NotificationToken>,
  ) {}

  async acceptPushNotification(
    customer: any,
    notification_token: string,
  ): Promise<NotificationToken> {
    const updateNotificationToken = await this.notificationTokenRepo.update(
      { customer: { id: customer.id } },
      {
        status: NotificationStatus.ACTIVE,
      },
    );

    if (!updateNotificationToken.affected) {
      const notificationToken = this.notificationTokenRepo.create({
        customer,
        notification_token,
        status: 'ACTIVE',
      });

      await this.notificationTokenRepo.save(notificationToken);

      return notificationToken;
    }

    return updateNotificationToken.raw;
  }

  async disablePushNotification(customer: any) {
    try {
      await this.notificationTokenRepo.update(
        { customer: { id: customer.id } },
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
    customer: any,
    notificationInput: NotificationInput,
  ) {
    const { title, body } = notificationInput;

    const notification = await this.notificationTokenRepo.findOne({
      where: {
        customer: { id: customer.id },
        status: NotificationStatus.ACTIVE,
      },
    });
    if (notification) {
      await this.notificationRepo.save({
        notification_token: notification,
        title,
        body,
        status: NotificationStatus.ACTIVE,
      });
      await firebase.messaging().send({
        notification: { title, body },
        token: notification.notification_token,
      });
    }
  }
}
