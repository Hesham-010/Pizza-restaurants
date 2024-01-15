import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdditionInput {
  @Field()
  title: string;

  @Field()
  price: number;

  @Field()
  isGlobal: boolean;
}
