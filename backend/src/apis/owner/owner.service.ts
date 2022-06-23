import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async findAll() {
    return await this.ownerRepository.find();
  }

  async findAllWithDeleted() {
    return await this.ownerRepository.find({ withDeleted: true });
  }

  async findOne({ ownerId }) {
    return await this.ownerRepository.findOne({ where: { id: ownerId } });
  }

  async findOneByEmail({ email, provider }) {
    return await this.ownerRepository.findOne({
      where: {
        email: email,
        provider: provider,
      },
    });
  }

  async create({ createOwnerInput }) {
    const ownerInfo = await this.ownerRepository.findOne({
      where: {
        email: createOwnerInput.email,
        provider: createOwnerInput.provider,
      },
    });

    if (ownerInfo) throw new ConflictException('이미 등록된 이메일입니다.');

    const hashedPassword = await bcrypt.hash(createOwnerInput.password, 10);

    const result = await this.ownerRepository.save({
      ...createOwnerInput,
      password: hashedPassword,
    });

    return result;
  }

  async update({ ownerId, updateOwnerInput }) {
    const owner = await this.ownerRepository.findOne({
      where: { id: ownerId },
    });

    const newOwner = {
      ...owner,
      ...updateOwnerInput,
    };

    if (updateOwnerInput.password) {
      const hashedPassword = await bcrypt.hash(updateOwnerInput.password, 10);
      newOwner.password = hashedPassword;
    }

    return await this.ownerRepository.save(newOwner);
  }

  async checkExist({ ownerId }) {
    const owner = await this.ownerRepository.findOne({
      where: { id: ownerId },
    });
    if (!owner) throw new UnprocessableEntityException('없는 회원입니다.');
  }

  async delete({ ownerId }) {
    const result = await this.ownerRepository.softDelete({ id: ownerId });
    return result.affected ? true : false;
  }

  async restore({ ownerId }) {
    const result = await this.ownerRepository.restore({ id: ownerId });
    return result.affected ? true : false;
  }

  async updatePassword({ ownerId, updatePassword }) {
    const owner = await this.ownerRepository.findOne({
      where: { id: ownerId },
    });

    const hashedPassword = await bcrypt.hash(updatePassword, 10);

    const newOwner = {
      ...owner,
      password: hashedPassword,
    };

    return await this.ownerRepository.save(newOwner);
  }
}
