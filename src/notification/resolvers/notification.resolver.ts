import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { NotificationService } from '../services/notification.service';
import { NotificationToken } from '../entities/notification_token.entity';
import { Notification_TokenInput } from '../dtos/notificationToken.input';
import { Notification } from '../entities/notification.entity';

@Resolver()
export class NotificationResolver {
  constructor(private notificationService: NotificationService) {}

  @Query(() => [Notification])
  findAllNotification() {
    return this.notificationService.findAll();
  }

  @Mutation(() => NotificationToken)
  acceptPushNotification(
    @Args('notification_TokenInput')
    notification_TokenInput: Notification_TokenInput,
  ) {
    return this.notificationService.acceptPushNotification(
      notification_TokenInput.customerId,
      notification_TokenInput.notificationToken,
    );
  }

  @Mutation(() => NotificationToken)
  disablePushNotification(
    @Args('customerId')
    customerId: string,
  ) {
    return this.notificationService.disablePushNotification(customerId);
  }
}
