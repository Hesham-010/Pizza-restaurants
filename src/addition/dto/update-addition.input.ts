import { CreateAdditionInput } from './create-addition.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdditionInput extends PartialType(CreateAdditionInput) {
  @Field(() => Int)
  id: number;
}
