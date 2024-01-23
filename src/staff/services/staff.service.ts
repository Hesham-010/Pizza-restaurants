import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffInput } from '../dto/create-staff.input';
import { UpdateStaffInput } from '../dto/update-staff.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/models/person.entity';
import { Store } from 'src/stor/entities/stor.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
    @InjectRepository(Person) private personRepo: Repository<Person>,
    @InjectRepository(Store) private storRepo: Repository<Store>,
  ) {}

  async create(createStaffInput: CreateStaffInput) {
    const person = await this.personRepo
      .createQueryBuilder()
      .insert()
      .into(Person)
      .values({
        fristName: createStaffInput.fristName,
        lastName: createStaffInput.lastName,
        phone: createStaffInput.phone,
      })
      .returning('*')
      .execute()
      .then((result) => result.raw[0] as Person);

    const staff = await this.staffRepo
      .createQueryBuilder()
      .insert()
      .into(Staff)
      .values({
        city: createStaffInput.city,
        street: createStaffInput.street,
        staffState: createStaffInput.staffState,
        position: createStaffInput.position,
        person,
      })
      .returning('*')
      .execute()
      .then((result) => result.raw[0] as Staff);

    staff.store = { id: createStaffInput.storeId } as any;
    await this.staffRepo.save(staff);
    return staff;
  }

  async findAll() {
    const staff = await this.staffRepo.find();
    return staff;
  }

  async findByStoreId(storeId: string) {
    const staff = await this.staffRepo.findBy({ store: { id: storeId } });
    if (!staff) {
      return new NotFoundException(
        `There is no staff for this store id ${storeId}`,
      );
    }
    return staff;
  }

  async update(id: string, updateStaffInput: UpdateStaffInput) {
    const staff = await this.staffRepo.findOne({
      where: { id },
      relations: ['person'],
    });
    if (!staff) {
      return new NotFoundException(`There is no staff for this id ${id}`);
    }

    await this.personRepo.update(staff.person.id, {
      fristName: updateStaffInput.fristName,
      lastName: updateStaffInput.lastName,
      phone: updateStaffInput.phone,
    });
    staff.position = updateStaffInput.position;
    staff.staffState = updateStaffInput.staffState;
    await this.staffRepo.save(staff);
    return staff;
  }

  async remove(id: string) {
    const staff = await this.staffRepo.delete(id);
    if (!staff.affected) {
      return new NotFoundException(`There is no staff for this id ${id}`);
    }
    return 'Staff Deleted';
  }
}
