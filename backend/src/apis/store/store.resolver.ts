import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStoreInput } from './dto/createStore.input';
import { UpdateStoreInput } from './dto/updateStore.input';
import { Store } from './entities/store.entity';

import { StoreService } from './store.service';

@Resolver()
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  // @Query(() => [Store])
  // fetchStores() {
  //   return this.storeService.findAll();
  // }

  // @Query(() => [Store])
  // fetchStoresWithDeleted() {
  //   return this.storeService.findAllWithDeleted();
  // }

  // @Query(() => Store)
  // async fetchStore(@Args('storeId') storeId: string) {
  //   await this.storeService.checkExist({ storeId });

  //   return await this.storeService.findOne({ storeId });
  // }

  // @Mutation(() => Store)
  // createStore(
  //   @Args('createStoreInput') createStoreInput: CreateStoreInput, //
  // ) {
  //   return this.storeService.create({ createStoreInput });
  // }

  // @Mutation(() => Store)
  // async updateStore(
  //   @Args('storeId') storeId: string,
  //   @Args('updateStoreInput') updateStoreInput: UpdateStoreInput,
  // ) {
  //   // 존재하는지 확인
  //   await this.storeService.checkExist({ storeId });
  //   // 수정하기
  //   return await this.storeService.update({
  //     storeId,
  //     updateStoreInput,
  //   });
  // }

  // @Mutation(() => Boolean)
  // async deleteStore(
  //   @Args('storeId') storeId: string, //
  // ) {
  //   return await this.storeService.delete({ storeId });
  // }

  // @Mutation(() => Boolean)
  // async restoreStore(
  //   @Args('storeId') storeId: string, //
  // ) {
  //   return await this.storeService.restore({ storeId });
  // }
}
