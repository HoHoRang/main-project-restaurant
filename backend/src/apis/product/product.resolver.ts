import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';

import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  fetchProducts() {
    return this.productService.findAll();
  }

  @Query(() => [Product])
  fetchProductsWithDeleted() {
    return this.productService.findAllWithDeleted();
  }

  @Query(() => Product)
  async fetchProduct(@Args('productId') productId: string) {
    await this.productService.checkExist({ productId });

    return await this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 존재하는지 확인
    await this.productService.checkExist({ productId });
    // 수정하기
    return await this.productService.update({
      productId,
      updateProductInput,
    });
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return await this.productService.delete({ productId });
  }

  @Mutation(() => Boolean)
  async restoreProduct(
    @Args('productId') productId: string, //
  ) {
    return await this.productService.restore({ productId });
  }
}
