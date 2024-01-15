import { InputType, Field } from '@nestjs/graphql';
import { PizzaSize } from 'src/enums/pizza.enums';

@InputType()
export class CreatePizzaInput {
  @Field()
  title: string;

  @Field()
  price: number;

  @Field()
  taste: string;

  @Field()
  size: PizzaSize;
}
