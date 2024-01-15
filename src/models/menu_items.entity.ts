import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pizza } from '../pizza/entities/pizza.entity';
import { Store } from '../stor/entities/stor.entity';

@ObjectType()
@Entity()
export class Menu_items {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(() => Pizza, (pizza) => pizza.menu_items)
  pizza: Pizza;

  @ManyToOne(() => Store, (stor) => stor.menu_items)
  stor: Store;
}
