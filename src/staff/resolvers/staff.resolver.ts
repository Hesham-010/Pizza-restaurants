import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StaffService } from '../services/staff.service';
import { Staff } from '../entities/staff.entity';
import { CreateStaffInput } from '../dto/create-staff.input';
import { UpdateStaffInput } from '../dto/update-staff.input';

@Resolver(() => Staff)
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @Mutation(() => Staff)
  createStaff(@Args('createStaffInput') createStaffInput: CreateStaffInput) {
    return this.staffService.create(createStaffInput);
  }

  @Query(() => [Staff])
  findAll() {
    return this.staffService.findAll();
  }

  @Query(() => Staff)
  findByStoreId(@Args('storeId') storeId: string) {
    return this.staffService.findByStoreId(storeId);
  }

  @Mutation(() => Staff)
  updateStaff(@Args('updateStaffInput') updateStaffInput: UpdateStaffInput) {
    return this.staffService.update(updateStaffInput.id, updateStaffInput);
  }

  @Mutation(() => Staff)
  removeStaff(@Args('id') id: string) {
    return this.staffService.remove(id);
  }
}
