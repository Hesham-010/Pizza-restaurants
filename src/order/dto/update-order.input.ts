import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput extends PartialType(
  OmitType(CreateOrderInput, ['couponCode'] as const),
) {
  @Field()
  id: string;
}
