import { Field } from '@nestjs/graphql';
import { Post } from 'src/apis/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PostImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: number;

  @ManyToOne(() => Post)
  @Field(() => Post)
  post: Post;

  @Column()
  @Field(() => String)
  url: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
