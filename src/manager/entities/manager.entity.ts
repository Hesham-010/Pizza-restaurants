import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../../models/person.entity';

@ObjectType()
@Entity()
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @OneToOne(() => Person, { onDelete: 'CASCADE' })
  @JoinColumn()
  person: Person;
}
