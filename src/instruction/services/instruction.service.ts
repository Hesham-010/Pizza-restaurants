import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all instruction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instruction`;
  }

  update(id: number, updateInstructionInput: UpdateInstructionInput) {
    return `This action updates a #${id} instruction`;
  }

  remove(id: number) {
    return `This action removes a #${id} instruction`;
  }
}
