import { InputType, Field } from '@nestjs/graphql';
import { DiscountEnum } from 'src/enums/discount.enums';

@InputType()
export class CreateCouponInput {
  @Field()
  expireDate: Date;

  @Field()
  discount: number;
}
