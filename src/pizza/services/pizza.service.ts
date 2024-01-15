import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePizzaInput } from '../dto/create-pizza.input';
import { UpdatePizzaInput } from '../dto/update-pizza.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from '../entities/pizza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PizzaService {
  constructor(@InjectRepository(Pizza) private pizzaRepo: Repository<Pizza>) {}

  async create(createPizzaInput: CreatePizzaInput) {
    const pizza = await this.pizzaRepo
      .createQueryBuilder()
      .insert()
      .into(Pizza)
      .values({ ...createPizzaInput })
      .returning('*')
      .execute()
      .then((pizza) => pizza.raw[0]);

    return pizza;
  }

  async findAll() {
    const pizzas = await this.pizzaRepo
      .createQueryBuilder()
      .select()
      .from(Pizza, 'pizza')
      .getMany();
    return pizzas;
  }

  async findOne(id: string) {
    const pizza = await this.pizzaRepo
      .createQueryBuilder()
      .select('pizza')
      .from(Pizza, 'pizza')
      .where('pizza.id = :id', { id })
      .getOne();

    if (!pizza) {
      return new NotFoundException(`No pizza for this id ${id}`);
    }
    return pizza;
  }

  update(id: number, updatePizzaInput: UpdatePizzaInput) {
    return `This action updates a #${id} pizza`;
  }

  remove(id: number) {
    return `This action removes a #${id} pizza`;
  }
}
