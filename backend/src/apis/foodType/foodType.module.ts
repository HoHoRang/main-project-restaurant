import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodType } from './entities/foodType.entity';
import { FoodTypeResolver } from './foodType.resolver';
import { FoodTypeService } from './foodType.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodType])],
  providers: [
    FoodTypeResolver,
    FoodTypeService, //
  ],
})
export class FoodTypeModule {}
