import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Store } from './stor.entity';

@ObjectType()
@Entity()
export class Store_Goals {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  goalDescription: string;

  @Field()
  @Column()
  expectedTime: Date;

  @ManyToOne(() => Store, (stor) => stor.stor_goals)
  stor: Store;
}
