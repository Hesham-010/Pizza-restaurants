import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateStorInput {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  openTime: Date;

  @Field({ nullable: true })
  closeTime: Date;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  street: string;
}
