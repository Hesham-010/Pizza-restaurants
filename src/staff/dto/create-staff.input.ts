import { InputType, Field } from '@nestjs/graphql';
import { IsMobilePhone, IsString, IsUUID, Length } from 'class-validator';
import { StaffPosition } from 'src/enums/staff.enums';

@InputType()
export class CreateStaffInput {
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

  @Field()
  @IsString()
  position: StaffPosition;

  @Field()
  @IsString()
  staffState: string;

  @Field()
  @IsUUID()
  storeId: string;
}
