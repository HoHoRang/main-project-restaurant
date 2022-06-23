import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FoodType } from './entities/foodType.entity';
import { FoodTypeService } from './foodType.service';

@Resolver()
export class FoodTypeResolver {
  constructor(private readonly foodTypeService: FoodTypeService) {}

  // @Query(() => [FoodType])
  // fetchFoodTypes() {
  //   return this.foodTypeService.findAll();
  // }

  // @Query(() => [FoodType])
  // fetchFoodTypesWithDeleted() {
  //   return this.foodTypeService.findAllWithDeleted();
  // }

  // @Query(() => FoodType)
  // async fetchFoodType(@Args('foodTypeId') foodTypeId: string) {
  //   await this.foodTypeService.checkExist({ foodTypeId });

  //   return await this.foodTypeService.findOne({ foodTypeId });
  // }

  // @Mutation(() => FoodType)
  // createFoodType(
  //   @Args('typeName') typeName: string, //
  // ) {
  //   return this.foodTypeService.create({ typeName });
  // }

  // @Mutation(() => FoodType)
  // async updateFoodType(
  //   @Args('foodTypeId') foodTypeId: string,
  //   @Args('typeName') typeName: string,
  // ) {
  //   // 존재하는지 확인
  //   await this.foodTypeService.checkExist({ foodTypeId });
  //   // 수정하기
  //   return await this.foodTypeService.update({
  //     foodTypeId,
  //     typeName,
  //   });
  // }

  // @Mutation(() => Boolean)
  // async deleteFoodType(
  //   @Args('foodTypeId') foodTypeId: string, //
  // ) {
  //   return await this.foodTypeService.delete({ foodTypeId });
  // }

  // @Mutation(() => Boolean)
  // async restoreFoodType(
  //   @Args('foodTypeId') foodTypeId: string, //
  // ) {
  //   return await this.foodTypeService.restore({ foodTypeId });
  // }
}
