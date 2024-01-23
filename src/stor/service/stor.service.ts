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

  async update(id: string, updateStorInput: UpdateStorInput) {
    const store = await this.storeRepo.findOne({ where: { id } });
    if (!store) {
      return new NotFoundException(`There is no store for this id ${id}`);
    }
    store.city = updateStorInput.city;
    store.street = updateStorInput.street;
    store.closeTime = updateStorInput.closeTime;
    store.openTime = updateStorInput.openTime;
    store.title = updateStorInput.title;

    await this.storeRepo.save(store);
    return store;
  }

  async remove(id: string) {
    const store = await this.storeRepo.delete(id);
    if (!store.affected) {
      return new NotFoundException(`Ther is no store for this id ${id}`);
    }
    return 'Store Deleted';
  }
}
