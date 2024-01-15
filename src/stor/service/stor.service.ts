import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStorInput } from '../dto/create-stor.input';
import { UpdateStorInput } from '../dto/update-stor.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '../entities/stor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StorService {
  constructor(@InjectRepository(Store) private storeRepo: Repository<Store>) {}

  async create(createStorInput: CreateStorInput) {
    const store = await this.storeRepo
      .createQueryBuilder()
      .insert()
      .into(Store)
      .values({ ...createStorInput })
      .returning('*')
      .execute()
      .then((result) => result.raw[0] as Store);

    if (store) {
      return Store;
    }
    return BadRequestException;
  }

  async findAll() {
    const stors = await this.storeRepo
      .createQueryBuilder()
      .select()
      .from(Store, 'store')
      .getMany();
    return stors;
  }

  async findOne(id: string) {
    const store = await this.storeRepo
      .createQueryBuilder()
      .select()
      .from(Store, 'store')
      .where('store.id = :id', { id })
      .getOne();

    if (!store) {
      return new NotFoundException(`no store for this id ${id}`);
    }
    return store;
  }

  async update(id: number, updateStorInput: UpdateStorInput) {
    return `This action updates a #${id} stor`;
  }

  async remove(id: string) {
    return `This action removes a #${id} stor`;
  }
}
