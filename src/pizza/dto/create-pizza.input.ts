import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { PizzaSize } from 'src/utils/enums/pizza.enums';

@InputType()
export class CreatePizzaInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsNumber()
  price: number;

  @Field()
  @IsString()
  taste: string;

  @Field()
  @IsString()
  size: PizzaSize;
}
