import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all staff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: string, updateStaffInput: UpdateStaffInput) {
    return `This action updates a #${id} staff`;
  }

  remove(id: string) {
    return `This action removes a #${id} staff`;
  }
}
