import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerInput } from '../dto/create-customer.input';
import { UpdateCustomerInput } from '../dto/update-customer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { Person } from 'src/models/person.entity';
import { Address } from 'src/customer/entities/address.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Person) private personRepo: Repository<Person>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {}

  async create(createCustomerInput: CreateCustomerInput) {
    const person = await this.personRepo
      .createQueryBuilder()
      .insert()
      .into(Person)
      .values({
        fristName: createCustomerInput.fristName,
        lastName: createCustomerInput.lastName,
        phone: createCustomerInput.phone,
      })
      .returning('*')
      .execute()
      .then((result) => result.raw[0] as Person);

    const customer = await this.customerRepo
      .createQueryBuilder()
      .insert()
      .into(Customer)
      .values({ person })
      .returning('*')
      .execute()
      .then((result) => result.raw[0] as Customer);

    await this.addressRepo
      .createQueryBuilder()
      .insert()
      .into(Address)
      .values({
        city: createCustomerInput.city,
        street: createCustomerInput.street,
        customer,
      })
      .execute();

    if (customer) {
      return customer;
    }
    return BadRequestException;
  }

  async findAll() {
    const customers = await this.customerRepo
      .createQueryBuilder()
      .select()
      .from(Customer, 'customer')
      .getMany();
    return customers;
  }

  async findOne(id: string) {
    const customer = await this.customerRepo
      .createQueryBuilder()
      .select()
      .from(Customer, 'customer')
      .where('customer.id = :id', { id })
      .getOne();

    if (!customer) {
      return new NotFoundException(`no customer for this id ${id}`);
    }
    return customer;
  }

  async update(id: number, updateCustomerInput: UpdateCustomerInput) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
