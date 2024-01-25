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
import { NotificationService } from 'src/notification/services/notification.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Person) private personRepo: Repository<Person>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    private notificationService: NotificationService,
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
    const customers = await this.customerRepo.find({ relations: ['person'] });
    return customers;
  }

  async findOne(id: string) {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) {
      return new NotFoundException(`no customer for this id ${id}`);
    }
    return customer;
  }

  async update(id: string, updateCustomerInput: UpdateCustomerInput) {
    const customer = await this.customerRepo.findOne({
      where: { id },
      relations: ['person'],
    });
    if (!customer) {
      return new NotFoundException(`There is no customer for this id ${id}`);
    }

    const person = await this.personRepo.findOne({
      where: { id: customer.person.id },
    });

    person.fristName = updateCustomerInput.fristName;
    person.lastName = updateCustomerInput.lastName;
    person.phone = updateCustomerInput.phone;
    await this.personRepo.save(person);

    // sent notification after update customer
    const message = {
      title: 'Update Customer',
      body: 'Update Created Successfully',
    };
    const n = await this.notificationService.sendPushNotification(
      customer.id,
      message,
    );
    return customer;
  }

  async remove(id: string) {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) {
      return new NotFoundException(`There is no customer for this id ${id}`);
    }
    await this.customerRepo.delete(customer);
    return 'Customer Deleted';
  }
}
