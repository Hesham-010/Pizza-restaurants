import { InputType, Field } from '@nestjs/graphql';
import { IsMobilePhone, IsString, Length } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @Field()
  @IsString()
  @Length(3, 8)
  fristName: string;

  @Field()
  @IsString()
  @Length(6, 12)
  lastName: string;

  @Field()
  @IsMobilePhone()
  phone: number;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  street: string;
}
