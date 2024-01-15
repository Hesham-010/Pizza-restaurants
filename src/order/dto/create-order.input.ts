import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { OrderStatus, ReceiveMethod } from 'src/enums/order.enums';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsString()
  recieveMethod: ReceiveMethod;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  street: string;

  @Field({ nullable: true })
  couponCode: string;

  @Field({ nullable: true })
  orderStatus: OrderStatus;

  @Field()
  @IsUUID()
  customerId: string;

  @Field()
  @IsUUID()
  staffId: string;

  @Field({ nullable: true })
  @IsUUID()
  deliveryId: string;

  @Field()
  @IsUUID()
  storeId: string;

  @Field(() => [ProductInput])
  pizzas: ProductInput[];

  @Field(() => [AdditionInput], { nullable: true })
  additions: AdditionInput[];
}

@InputType()
class ProductInput {
  @Field()
  @IsUUID()
  pizzaId: string;

  @Field()
  @IsNumber()
  quantity: number;
}

@InputType()
class AdditionInput {
  @Field()
  @IsUUID()
  additionId: string;

  @Field()
  @IsNumber()
  quantity: number;
}
