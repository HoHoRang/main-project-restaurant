import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/apis/post/entities/post.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  tagName: string;

  @ManyToMany(() => Post, (post) => post.tags)
  @Field(() => [Post])
  posts: Post[];
}
