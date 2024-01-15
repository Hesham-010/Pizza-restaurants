import { Module } from '@nestjs/common';
import { AdditionService } from './services/addition.service';
import { AdditionResolver } from './resolvers/addition.resolver';
import { Addition } from './entities/addition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Addition])],
  providers: [AdditionResolver, AdditionService],
})
export class AdditionModule {}
