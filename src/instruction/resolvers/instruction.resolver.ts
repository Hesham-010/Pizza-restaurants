import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InstructionService } from '../services/instruction.service';
import { CreateInstructionInput } from '../dto/create-instruction.input';
import { UpdateInstructionInput } from '../dto/update-instruction.input';
import { Instruction } from '../entities/instraction.entity';

@Resolver(() => Instruction)
export class InstructionResolver {
  constructor(private readonly instructionService: InstructionService) {}

  @Mutation(() => Instruction)
  createInstruction(
    @Args('createInstructionInput')
    createInstructionInput: CreateInstructionInput,
  ) {
    return this.instructionService.create(createInstructionInput);
  }

  @Query(() => [Instruction])
  findInstructionsByOrderId(@Args('orderId') orderId: string) {
    return this.instructionService.findByOrderId(orderId);
  }

  @Mutation(() => Instruction)
  updateInstruction(
    @Args('updateInstructionInput')
    updateInstructionInput: UpdateInstructionInput,
  ) {
    return this.instructionService.update(
      updateInstructionInput.orderId,
      updateInstructionInput,
    );
  }

  @Mutation(() => Instruction)
  removeInstruction(@Args('orderId') orderId: string) {
    return this.instructionService.remove(orderId);
  }
}
