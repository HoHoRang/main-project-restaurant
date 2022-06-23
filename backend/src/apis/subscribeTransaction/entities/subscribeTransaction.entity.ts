import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Owner } from 'src/apis/owner/entities/owner.entity';
import { Product } from 'src/apis/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum SUBSCRIBE_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(SUBSCRIBE_TRANSACTION_STATUS_ENUM, {
  name: 'SUBSCRIBE_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class SubscribeTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: number;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: SUBSCRIBE_TRANSACTION_STATUS_ENUM })
  @Field(() => SUBSCRIBE_TRANSACTION_STATUS_ENUM)
  status: string;

  @Column({ nullable: true })
  @Field(() => Date)
  subscriptionStartDate: Date;

  @Column({ nullable: true })
  @Field(() => Date)
  subscriptionEndDate: Date;

  @ManyToOne(() => Owner)
  @Field(() => Owner)
  owner: Owner;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
