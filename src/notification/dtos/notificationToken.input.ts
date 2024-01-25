import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Notification_TokenInput {
  @Field()
  customerId: string;

  @Field()
  notificationToken: string;
}
