import { Post } from 'src/apis/post/entities/post.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => User)
  user: User;

  @Column()
  contents: string;

  @Column()
  likeCount: number;

  @Column()
  createDate: Date;

  @Column()
  updateDate: Date;
}
