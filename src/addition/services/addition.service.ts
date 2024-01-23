import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    const additions = await this.additionRepo.find();
    return additions;
  }

  async findOne(id: string) {
    const addition = await this.additionRepo.findOne({ where: { id } });
    if (!addition) {
      return new NotFoundException(`There is no addition for this id ${id}`);
    }
    return addition;
  }

  async findOneByAdditionTittle(title: string) {
    const addition = await this.additionRepo.findOne({ where: { title } });
    if (!addition) {
      return new NotFoundException(
        `There is no addition for this title ${title}`,
      );
    }
    return addition;
  }

  async update(id: string, updateAdditionInput: UpdateAdditionInput) {
    const addition = await this.additionRepo.findOne({ where: { id } });
    if (!addition) {
      return new NotFoundException(`There is no addition for this id ${id}`);
    }
    addition.title = updateAdditionInput.title;
    addition.price = updateAdditionInput.price;
    addition.isGlobal = updateAdditionInput.isGlobal;
    await this.additionRepo.save(addition);

    return addition;
  }

  async remove(id: string) {
    const addition = await this.additionRepo.findOne({ where: { id } });
    if (!addition) {
      return new NotFoundException(`There is no addition for this id ${id}`);
    }
    await this.additionRepo.delete(addition);
    return 'Addition Deleted';
  }
}
