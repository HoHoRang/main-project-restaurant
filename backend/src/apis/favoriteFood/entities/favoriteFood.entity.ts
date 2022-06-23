import { FoodType } from 'src/apis/foodType/entities/foodType.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteFood {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => FoodType)
  foodType: FoodType;

  @Column()
  createDate: Date;
}
