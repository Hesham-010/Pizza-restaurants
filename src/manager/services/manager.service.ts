import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerInput } from '../dto/create-manager.input';
import { UpdateManagerInput } from '../dto/update-manager.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from '../entities/manager.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/models/person.entity';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager) private managerRepo: Repository<Manager>,
    @InjectRepository(Person) private personRepo: Repository<Person>,
  ) {}

  async create(createManagerInput: CreateManagerInput) {
    const person = this.personRepo.create({ ...createManagerInput });
    await this.personRepo.save(person);

    const manager = this.managerRepo.create({
      ...createManagerInput,
      person: person,
    });
    await this.managerRepo.save(manager);

    return manager;
  }

  async findAll() {
    const managers = await this.managerRepo.find({ relations: ['person'] });
    return managers;
  }

  async findOne(id: string) {
    const manager = await this.managerRepo.findOne({
      where: { id },
      relations: ['person'],
    });

    if (!manager) {
      return new NotFoundException(`There is no manager for this id ${id}`);
    }

    return manager;
  }

  async update(id: string, updateManagerInput: UpdateManagerInput) {
    const manager = await this.managerRepo.findOne({
      where: { id },
      relations: ['person'],
    });
    if (!manager) {
      return new NotFoundException(`There is no manager for this id ${id}`);
    }

    await this.personRepo.update(manager.person.id, {
      fristName: updateManagerInput.fristName,
      lastName: updateManagerInput.lastName,
      phone: updateManagerInput.phone,
    });
    await this.managerRepo.update(id, { email: updateManagerInput.email });
    return manager;
  }

  async remove(id: string) {
    await this.managerRepo.delete(id);
    return `Manager Deleted`;
  }
}
