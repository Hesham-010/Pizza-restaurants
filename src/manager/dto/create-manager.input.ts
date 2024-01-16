import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateManagerInput {
  @Field()
  fristName: string;

  @Field()
  lastName: string;

  @Field()
  phone: number;

  @Field()
  email: string;

  @Field()
  password: string;
}
