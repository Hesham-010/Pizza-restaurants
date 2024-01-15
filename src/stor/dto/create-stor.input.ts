import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStorInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  openTime: Date;

  @Field({ nullable: true })
  closeTime: Date;

  @Field()
  city: string;

  @Field()
  street: string;
}
