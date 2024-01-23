import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstructionInput } from '../dto/create-instruction.input';
import { UpdateInstructionInput } from '../dto/update-instruction.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Instruction } from '../entities/instraction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstructionService {
  constructor(
    @InjectRepository(Instruction)
    private instructionRepo: Repository<Instruction>,
  ) {}

  async create(createInstructionInput: CreateInstructionInput) {
    const instruction = await this.instructionRepo
      .createQueryBuilder()
      .insert()
      .into(Instruction)
      .values({
        ...createInstructionInput,
        order: { id: createInstructionInput.orderId },
      })
      .returning('*')
      .execute()
      .then((instruction) => instruction.raw[0] as Instruction);
    return instruction;
  }

  async findByOrderId(orderId: string) {
    const instractions = await this.instructionRepo.findBy({
      order: { id: orderId },
    });
    if (!instractions) {
      return new NotFoundException(
        `No instractions for this order id ${orderId}`,
      );
    }
    return instractions;
  }

  async update(
    orderId: string,
    updateInstructionInput: UpdateInstructionInput,
  ) {
    const instraction = await this.instructionRepo.findOne({
      where: { order: { id: orderId } },
    });
    if (!instraction) {
      return new NotFoundException(
        `There is no instraction for this id ${orderId}`,
      );
    }

    instraction.instruction = updateInstructionInput.instruction;
    await this.instructionRepo.save(instraction);

    return instraction;
  }

  async remove(orderId: string) {
    const instraction = await this.instructionRepo.delete({
      order: { id: orderId },
    });
    if (!instraction.affected) {
      return new NotFoundException(
        `There is no instraction for this id ${orderId}`,
      );
    }
    return 'Instractions Deleted';
  }
}
