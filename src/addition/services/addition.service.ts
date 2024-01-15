import { Injectable } from '@nestjs/common';
import { CreateAdditionInput } from '../dto/create-addition.input';
import { UpdateAdditionInput } from '../dto/update-addition.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Addition } from '../entities/addition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdditionService {
  constructor(
    @InjectRepository(Addition) private additionRepo: Repository<Addition>,
  ) {}

  async create(createAdditionInput: CreateAdditionInput) {
    const addition = await this.additionRepo
      .createQueryBuilder()
      .insert()
      .into(Addition)
      .values(createAdditionInput)
      .returning('*')
      .execute()
      .then((addition) => addition.raw[0] as Addition);
    return addition;
  }

  findAll() {
    return `This action returns all addition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addition`;
  }

  update(id: number, updateAdditionInput: UpdateAdditionInput) {
    return `This action updates a #${id} addition`;
  }

  remove(id: number) {
    return `This action removes a #${id} addition`;
  }
}
