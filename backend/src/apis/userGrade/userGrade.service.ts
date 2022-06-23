import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGrade } from './entities/userGrade.entity';

@Injectable()
export class UserGradeService {
  constructor(
    @InjectRepository(UserGrade)
    private readonly userGradeRepository: Repository<UserGrade>,
  ) {}

  async findAll() {
    return await this.userGradeRepository.find();
  }

  async findAllWithDeleted() {
    return await this.userGradeRepository.find({ withDeleted: true });
  }

  async findOne({ userGradeId }) {
    return await this.userGradeRepository.findOne({
      where: { id: userGradeId },
    });
  }

  async create({ gradeName }) {
    const result = await this.userGradeRepository.save({
      gradeName,
    });

    return result;
  }

  async update({ userGradeId, gradeName }) {
    const grade = await this.userGradeRepository.findOne({
      where: { id: userGradeId },
    });

    const newGrade = {
      ...grade,
      gradeName,
    };

    return await this.userGradeRepository.save(newGrade);
  }

  async checkExist({ userGradeId }) {
    const grade = await this.userGradeRepository.findOne({
      where: { id: userGradeId },
    });
    if (!grade)
      throw new UnprocessableEntityException('존재하지 않는 등급입니다.');
  }

  async delete({ userGradeId }) {
    const result = await this.userGradeRepository.softDelete({
      id: userGradeId,
    });
    return result.affected ? true : false;
  }

  async restore({ userGradeId }) {
    const result = await this.userGradeRepository.restore({ id: userGradeId });
    return result.affected ? true : false;
  }
}
