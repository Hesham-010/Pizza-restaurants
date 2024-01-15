import { Module } from '@nestjs/common';
import { StaffService } from './services/staff.service';
import { StaffResolver } from './resolvers/staff.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/stor/entities/stor.entity';
import { Staff } from './entities/staff.entity';
import { Person } from 'src/models/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Staff, Person])],
  providers: [StaffResolver, StaffService],
})
export class StaffModule {}
