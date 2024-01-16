import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ManagerService } from '../services/manager.service';
import { Manager } from '../entities/manager.entity';
import { CreateManagerInput } from '../dto/create-manager.input';
import { UpdateManagerInput } from '../dto/update-manager.input';

@Resolver(() => Manager)
export class ManagerResolver {
  constructor(private readonly managerService: ManagerService) {}

  @Mutation(() => Manager)
  createManager(
    @Args('createManagerInput') createManagerInput: CreateManagerInput,
  ) {
    return this.managerService.create(createManagerInput);
  }

  @Query(() => [Manager])
  findAll() {
    return this.managerService.findAll();
  }

  @Query(() => Manager)
  findOneManager(@Args('id') id: string) {
    return this.managerService.findOne(id);
  }

  @Mutation(() => String)
  updateManager(
    @Args('updateManagerInput') updateManagerInput: UpdateManagerInput,
  ) {
    return this.managerService.update(
      updateManagerInput.id,
      updateManagerInput,
    );
  }

  @Mutation(() => String)
  removeManager(@Args('id') id: string) {
    return this.managerService.remove(id);
  }
}
