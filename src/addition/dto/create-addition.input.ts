import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAdditionInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsNumber()
  price: number;

  @Field()
  isGlobal: boolean;
}
