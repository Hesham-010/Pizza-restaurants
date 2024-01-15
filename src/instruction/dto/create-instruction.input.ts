import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateInstructionInput {
  @Field()
  @IsString()
  instruction: string;

  @Field()
  @IsUUID()
  orderId: string;
}
