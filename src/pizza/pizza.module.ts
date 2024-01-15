import { Module } from '@nestjs/common';
import { PizzaService } from './services/pizza.service';
import { PizzaResolver } from './resolvers/pizza.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pizza } from './entities/pizza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza])],
  providers: [PizzaResolver, PizzaService],
})
export class PizzaModule {}
