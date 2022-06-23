import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/apis/owner/entities/owner.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: number;

  @ManyToOne(() => Owner)
  @Field(() => Owner)
  owner: Owner;

  @Column()
  @Field(() => String)
  storeName: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column({ type: 'float' })
  @Field(() => Float)
  latitude: number;

  @Column({ type: 'float' })
  @Field(() => Float)
  longitude: number;

  @Column()
  @Field(() => String)
  category: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
