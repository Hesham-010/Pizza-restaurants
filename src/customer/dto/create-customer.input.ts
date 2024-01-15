import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field()
  fristName: string;

  @Field()
  lastName: string;

  @Field()
  phone: number;

  @Field()
  city: string;

  @Field()
  street: string;
}
