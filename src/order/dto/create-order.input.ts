import { InputType, Field } from '@nestjs/graphql';
import { OrderStatus, ReceiveMethod } from 'src/enums/order.enums';

@InputType()
export class CreateOrderInput {
  @Field()
  recieveMethod: ReceiveMethod;

  @Field()
  city: string;

  @Field()
  street: string;

  @Field({ nullable: true })
  couponCode: string;

  @Field({ nullable: true })
  orderStatus: OrderStatus;

  @Field()
  customerId: string;

  @Field()
  staffId: string;

  @Field({ nullable: true })
  deliveryId: string;

  @Field()
  storeId: string;

  @Field(() => [ProductInput])
  pizzas: ProductInput[];

  @Field(() => [AdditionInput], { nullable: true })
  additions: AdditionInput[];
}

@InputType()
class ProductInput {
  @Field()
  pizzaId: string;

  @Field()
  quantity: number;
}

@InputType()
class AdditionInput {
  @Field()
  additionId: string;

  @Field()
  quantity: number;
}
