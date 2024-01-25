import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NotificationService } from '../services/notification.service';
import { NotificationToken } from '../entities/notification_token.entity';
import { Notification_TokenInput } from '../dtos/notificationToken.input';

@Resolver()
export class NotificationResolver {
  constructor(private notificationService: NotificationService) {}

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
