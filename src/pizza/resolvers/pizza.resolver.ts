import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../entities/pizza.entity';
import { CreatePizzaInput } from '../dto/create-pizza.input';
import { UpdatePizzaInput } from '../dto/update-pizza.input';

@Resolver(() => Pizza)
export class PizzaResolver {
  constructor(private readonly pizzaService: PizzaService) {}

  @Mutation(() => Pizza)
  createPizza(@Args('createPizzaInput') createPizzaInput: CreatePizzaInput) {
    return this.pizzaService.create(createPizzaInput);
  }

  @Query(() => [Pizza])
  findAll() {
    return this.pizzaService.findAll();
  }

  @Query(() => Pizza, { name: 'pizza' })
  findOne(@Args('id') id: string) {
    return this.pizzaService.findOne(id);
  }

  @Mutation(() => Pizza)
  updatePizza(@Args('updatePizzaInput') updatePizzaInput: UpdatePizzaInput) {
    return this.pizzaService.update(updatePizzaInput.id, updatePizzaInput);
  }

  @Mutation(() => Pizza)
  removePizza(@Args('id', { type: () => Int }) id: number) {
    return this.pizzaService.remove(id);
  }
}
