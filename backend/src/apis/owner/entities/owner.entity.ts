import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum SUBSCRIBE_STATUS_ENUM {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
}

registerEnumType(SUBSCRIBE_STATUS_ENUM, {
  name: 'SUBSCRIBE_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  //@Field(() => String)
  password: string;

  @Column({ nullable: true })
  @Field(() => String)
  loginId: string;

  @Column({ nullable: true })
  @Field(() => String)
  rrn: string;

  @Column({ nullable: true })
  @Field(() => String)
  nickname: string;

  @Column({ default: 'SITE' })
  @Field(() => String)
  provider: string;

  @Column({
    type: 'enum',
    enum: SUBSCRIBE_STATUS_ENUM,
    default: SUBSCRIBE_STATUS_ENUM.UNSUBSCRIBE,
  })
  @Field(() => SUBSCRIBE_STATUS_ENUM)
  subscribeStatus: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}
