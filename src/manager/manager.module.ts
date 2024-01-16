import { Module } from '@nestjs/common';
import { ManagerService } from './services/manager.service';
import { ManagerResolver } from './resolvers/manager.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Person } from 'src/models/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager, Person])],
  providers: [ManagerResolver, ManagerService],
})
export class ManagerModule {}
