import { Post } from 'src/apis/post/entities/post.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => User)
  user: User;

  @Column()
  createDate: Date;
}
