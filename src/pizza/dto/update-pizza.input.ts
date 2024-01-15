import { CreatePizzaInput } from './create-pizza.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePizzaInput extends PartialType(CreatePizzaInput) {
  @Field(() => Int)
  id: number;
}
