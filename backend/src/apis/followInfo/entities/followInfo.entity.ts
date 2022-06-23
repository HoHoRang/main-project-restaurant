import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FollowInfo {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User)
  followerUser: User;

  @ManyToOne(() => User)
  followingUser: User;

  @Column()
  createDate: Date;
}
