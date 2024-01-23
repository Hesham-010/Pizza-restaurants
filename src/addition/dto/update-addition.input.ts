import { CreateAdditionInput } from './create-addition.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdditionInput extends PartialType(CreateAdditionInput) {
  @Field()
  id: string;
}
