import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateInstructionInput {
  @Field()
  instruction: string;

  @Field()
  orderId: string;
}
