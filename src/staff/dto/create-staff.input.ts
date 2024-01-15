import { InputType, Field } from '@nestjs/graphql';
import { StaffPosition } from 'src/enums/staff.enums';

@InputType()
export class CreateStaffInput {
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

  @Field()
  position: StaffPosition;

  @Field()
  staffState: string;

  @Field()
  storeId: string;
}
