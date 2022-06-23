import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findAllWithDeleted() {
    return await this.productRepository.find({ withDeleted: true });
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
    });
  }

  async create({ createProductInput }) {
    const result = await this.productRepository.save({
      ...createProductInput,
    });

    return result;
  }

  async update({ productId, updateProductInput }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const newProduct = {
      ...product,
      ...updateProductInput,
    };

    return await this.productRepository.save(newProduct);
  }

  async checkExist({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product)
      throw new UnprocessableEntityException('존재하지 않는 상품입니다.');
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async restore({ productId }) {
    const result = await this.productRepository.restore({ id: productId });
    return result.affected ? true : false;
  }
}
