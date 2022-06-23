import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async findAll() {
    return await this.storeRepository.find({ relations: ['owner'] });
  }

  async findAllWithDeleted() {
    return await this.storeRepository.find({
      withDeleted: true,
      relations: ['owner'],
    });
  }

  async findOne({ storeId }) {
    return await this.storeRepository.findOne({
      where: { id: storeId },
      relations: ['owner'],
    });
  }

  async create({ createStoreInput }) {
    const { ownerId, ...store } = createStoreInput;

    const result = await this.storeRepository.save({
      ...store,
      owner: { id: ownerId },
    });

    return result;
  }

  async update({ storeId, updateStoreInput }) {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });

    const newStore = {
      ...store,
      ...updateStoreInput,
    };

    return await this.storeRepository.save(newStore);
  }

  async checkExist({ storeId }) {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });
    if (!store) throw new UnprocessableEntityException('없는 가게입니다.');
  }

  async delete({ storeId }) {
    const result = await this.storeRepository.softDelete({ id: storeId });
    return result.affected ? true : false;
  }

  async restore({ storeId }) {
    const result = await this.storeRepository.restore({ id: storeId });
    return result.affected ? true : false;
  }
}
