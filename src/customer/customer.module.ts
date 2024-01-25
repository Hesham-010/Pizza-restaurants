import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { CustomerResolver } from './resolvers/customer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/models/person.entity';
import { Customer } from './entities/customer.entity';
import { Address } from './entities/address.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Person, Address]),
    NotificationModule,
  ],
  providers: [CustomerResolver, CustomerService],
})
export class CustomerModule {}
