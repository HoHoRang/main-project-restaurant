import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodType } from './entities/foodType.entity';

@Injectable()
export class FoodTypeService {
  constructor(
    @InjectRepository(FoodType)
    private readonly foodTypeRepository: Repository<FoodType>,
  ) {}

  async findAll() {
    return await this.foodTypeRepository.find();
  }

  async findAllWithDeleted() {
    return await this.foodTypeRepository.find({ withDeleted: true });
  }

  async findOne({ foodTypeId }) {
    return await this.foodTypeRepository.findOne({ where: { id: foodTypeId } });
  }

  async create({ typeName }) {
    const result = await this.foodTypeRepository.save({
      typeName,
    });

    return result;
  }

  async update({ foodTypeId, typeName }) {
    const foodType = await this.foodTypeRepository.findOne({
      where: { id: foodTypeId },
    });

    const newFoodType = {
      ...foodType,
      typeName,
    };

    return await this.foodTypeRepository.save(newFoodType);
  }

  async checkExist({ foodTypeId }) {
    const foodType = await this.foodTypeRepository.findOne({
      where: { id: foodTypeId },
    });
    if (!foodType)
      throw new UnprocessableEntityException('존재하지 않는 음식종류입니다.');
  }

  async delete({ foodTypeId }) {
    const result = await this.foodTypeRepository.softDelete({ id: foodTypeId });
    return result.affected ? true : false;
  }

  async restore({ foodTypeId }) {
    const result = await this.foodTypeRepository.restore({ id: foodTypeId });
    return result.affected ? true : false;
  }
}
