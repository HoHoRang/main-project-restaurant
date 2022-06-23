import { Field, ObjectType } from '@nestjs/graphql';
import { UserGrade } from 'src/apis/userGrade/entities/userGrade.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
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

  @ManyToOne(() => UserGrade)
  @Field(() => UserGrade)
  userGrade: UserGrade;

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
