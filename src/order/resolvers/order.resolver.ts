import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.createOrder(createOrderInput);
  }

  @Query(() => [Order])
  findAllOrders() {
    return this.orderService.findAll();
  }

  @Query(() => Order)
  findOrder(@Args('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => String)
  removeOrder(@Args('id') id: string) {
    return this.orderService.remove(id);
  }
}
