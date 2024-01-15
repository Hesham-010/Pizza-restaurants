import { CreateStorInput } from './create-stor.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStorInput extends PartialType(CreateStorInput) {
  @Field(() => Int)
  id: number;
}
