import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Addition } from '../entities/addition.entity';
import { CreateAdditionInput } from '../dto/create-addition.input';
import { UpdateAdditionInput } from '../dto/update-addition.input';
import { AdditionService } from '../services/addition.service';

@Resolver(() => Addition)
export class AdditionResolver {
  constructor(private readonly additionService: AdditionService) {}

  @Mutation(() => Addition)
  createAddition(
    @Args('createAdditionInput') createAdditionInput: CreateAdditionInput,
  ) {
    return this.additionService.create(createAdditionInput);
  }

  @Query(() => [Addition])
  findAdditions() {
    return this.additionService.findAll();
  }

  @Query(() => Addition)
  findOneAddition(@Args('id') id: string) {
    return this.additionService.findOne(id);
  }

  @Mutation(() => Addition)
  updateAddition(
    @Args('updateAdditionInput') updateAdditionInput: UpdateAdditionInput,
  ) {
    return this.additionService.update(
      updateAdditionInput.id,
      updateAdditionInput,
    );
  }

  @Mutation(() => String)
  removeAddition(@Args('id') id: string) {
    return this.additionService.remove(id);
  }
}
