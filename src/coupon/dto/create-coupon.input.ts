import { InputType, Field } from '@nestjs/graphql';
import { Max } from 'class-validator';

@InputType()
export class CreateCouponInput {
  @Field()
  expireDate: Date;

  @Field()
  @Max(50)
  discount: number;
}
