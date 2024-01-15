import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StorService } from '../service/stor.service';
import { Store } from '../entities/stor.entity';
import { CreateStorInput } from '../dto/create-stor.input';
import { UpdateStorInput } from '../dto/update-stor.input';

@Resolver(() => Store)
export class StorResolver {
  constructor(private readonly storService: StorService) {}

  @Mutation(() => Store)
  createStor(@Args('createStorInput') createStorInput: CreateStorInput) {
    return this.storService.create(createStorInput);
  }

  @Query(() => [Store])
  findStors() {
    return this.storService.findAll();
  }

  @Query(() => Store)
  findOneStor(@Args('id') id: string) {
    return this.storService.findOne(id);
  }

  @Mutation(() => Store)
  updateStor(@Args('updateStorInput') updateStorInput: UpdateStorInput) {
    return this.storService.update(updateStorInput.id, updateStorInput);
  }

  @Mutation(() => Store)
  removeStor(@Args('id') id: string) {
    return this.storService.remove(id);
  }
}
